import { type Runtime, type Tabs } from 'wxt/browser';

import { hasOffscreenDocument } from '../offscreen';
import { queryActiveTab } from '../query-active-tab';
import {
	type TBridgeMessage,
	type TBridgeMessagePayload,
	type TBridgeMessageResponse,
	type TBridgeMessageType,
	type TTarget
} from './types';

export class BackgroundBridge<GSend extends TBridgeMessage, GReceive extends TBridgeMessage> {
	private messageHandlers = new Map<
		string,
		(payload: any, sender: Runtime.MessageSender) => Promise<any> | any
	>();

	constructor() {
		browser.runtime.onMessage.addListener(
			async (message: TBridgeMessage, sender: Runtime.MessageSender) => {
				if (message.target !== 'background') {
					return false;
				}

				const handler = this.messageHandlers.get(message.type);
				if (handler != null) {
					const response = await handler(message.payload, sender);
					console.log(`[Received | b] ${message.type}`, { payload: message.payload, response });
					return response;
				}

				console.warn(`No handler found for message type: ${message.type}`);
				return false;
			}
		);
	}

	// Send message from background to content
	// https://developer.chrome.com/docs/extensions/develop/concepts/messaging#simple
	public async sendMessageToContent<GType extends TBridgeMessageType<GSend, 'content'>>(
		tabId: number,
		type: GType,
		payload: TBridgeMessagePayload<GSend, 'content', GType>,
		options?: Tabs.SendMessageOptionsType
	): Promise<TBridgeMessageResponse<GSend, 'content', GType>> {
		console.log(`[Send | b->c | ${tabId.toString()}] ${type}`, { payload });
		return browser.tabs.sendMessage(tabId, { type, payload, target: 'content' }, options);
	}

	public async sendMessageToContentOnActiveTab<GType extends TBridgeMessageType<GSend, 'content'>>(
		type: GType,
		payload: TBridgeMessagePayload<GSend, 'content', GType>,
		options?: Tabs.SendMessageOptionsType
	): Promise<TBridgeMessageResponse<GSend, 'content', GType> | null> {
		const tab = await queryActiveTab();
		if (tab?.id != null) {
			return this.sendMessageToContent(tab.id, type, payload, options);
		}
		return null;
	}

	// Send message from background to popup
	// https://developer.chrome.com/docs/extensions/develop/concepts/messaging#simple
	public async sendMessageToPopup<GType extends TBridgeMessageType<GSend, 'popup'>>(
		tabId: number,
		type: GType,
		payload: TBridgeMessagePayload<GSend, 'popup', GType>,
		options?: Tabs.SendMessageOptionsType
	): Promise<TBridgeMessageResponse<GSend, 'popup', GType>> {
		console.log(`[Send | b->p | ${tabId.toString()}] ${type}`, { payload });
		return browser.tabs.sendMessage(tabId, { type, payload, target: 'popup' }, options);
	}

	// Send message from background to offscreen
	// https://developer.chrome.com/docs/extensions/reference/api/offscreen
	public async sendMessageToOffscreen<GType extends TBridgeMessageType<GSend, 'offscreen'>>(
		type: GType,
		payload: TBridgeMessagePayload<GSend, 'offscreen', GType>,
		options?: Runtime.SendMessageOptionsType
	): Promise<TBridgeMessageResponse<GSend, 'offscreen', GType>> {
		console.log(`[Send | b->o] ${type}`, { payload });
		if (!(await hasOffscreenDocument())) {
			console.warn('No offscreen document found!');
		}
		return browser.runtime.sendMessage({ type, payload, target: 'offscreen' }, options);
	}

	// Listen to message in background
	// https://developer.chrome.com/docs/extensions/develop/concepts/messaging#simple
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
