import { type Runtime } from 'wxt/browser';

import {
	type TBridgeMessage,
	type TBridgeMessagePayload,
	type TBridgeMessageResponse,
	type TBridgeMessageType,
	type TTarget
} from './types';

export class OffscreenBridge<GSend extends TBridgeMessage, GReceive extends TBridgeMessage> {
	private messageHandlers = new Map<
		string,
		(payload: any, sender: Runtime.MessageSender) => Promise<any> | any
	>();

	constructor() {
		browser.runtime.onMessage.addListener(
			async (message: TBridgeMessage, sender: Runtime.MessageSender) => {
				if (message.target !== 'offscreen') {
					return false;
				}

				const handler = this.messageHandlers.get(message.type);
				if (handler != null) {
					const response = await handler(message.payload, sender);
					console.log(`[Received | o] ${message.type}`, { payload: message.payload, response });
					return response;
				}

				console.warn(`No handler found for message type: ${message.type}`);
				return false;
			}
		);
	}

	// Send message from offscreen to background
	// https://developer.chrome.com/docs/extensions/reference/api/offscreen
	public async sendMessageToBackground<GType extends TBridgeMessageType<GSend, 'background'>>(
		type: GType,
		payload: TBridgeMessagePayload<GSend, 'background', GType>,
		options?: Runtime.SendMessageOptionsType
	): Promise<TBridgeMessageResponse<GSend, 'background', GType>> {
		console.log(`[Send | o->b] ${type}`, { payload });
		return browser.runtime.sendMessage({ type, payload, target: 'background' }, options);
	}

	// Listen to message in offscreen
	// https://developer.chrome.com/docs/extensions/reference/api/offscreen
	public listen<GType extends TBridgeMessageType<GReceive, TTarget>>(
		type: GType,
		callback: (
			payload: TBridgeMessagePayload<GReceive, TTarget, GType>,
			sender: Runtime.MessageSender
			// sendResponse: (response: TBridgeMessageResponse<GReceive, GType>) => void
		) =>
			| Promise<TBridgeMessageResponse<GReceive, TTarget, GType>>
			| TBridgeMessageResponse<GReceive, TTarget, GType>
	): void {
		if (!this.messageHandlers.has(type)) {
			this.messageHandlers.set(type, callback);
		} else {
			console.error(
				`Handler for message type '${type}' already exists. Only one handler is allowed per message type.`
			);
		}
	}
}
