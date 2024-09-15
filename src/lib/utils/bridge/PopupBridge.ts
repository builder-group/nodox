import type { Runtime, Tabs } from 'wxt/browser';

import { queryActiveTab, queryTabs } from '../tabs';
import {
	type TBridgeMessage,
	type TBridgeMessagePayload,
	type TBridgeMessageResponse,
	type TBridgeMessageType,
	type TTarget
} from './types';

export class PopupBridge<GSend extends TBridgeMessage, GReceive extends TBridgeMessage> {
	private messageHandlers = new Map<
		string,
		(payload: any, sender: Runtime.MessageSender) => Promise<any> | any
	>();

	constructor() {
		browser.runtime.onMessage.addListener(
			async (message: TBridgeMessage, sender: Runtime.MessageSender) => {
				if (message.target !== 'popup') {
					return false;
				}

				const handler = this.messageHandlers.get(message.type);
				if (handler != null) {
					const response = await handler(message.payload, sender);
					console.log(`[Received | p] ${message.type}`, { payload: message.payload, response });
					return response;
				}

				console.warn(`No handler found for message type: ${message.type}`);
				return false;
			}
		);
	}

	// Send message from popup to content
	// https://developer.chrome.com/docs/extensions/develop/concepts/messaging#simple
	public async sendMessageToContent<GType extends TBridgeMessageType<GSend, 'content'>>(
		tabId: number,
		type: GType,
		payload: TBridgeMessagePayload<GSend, 'content', GType>,
		options?: Tabs.SendMessageOptionsType
	): Promise<TBridgeMessageResponse<GSend, 'content', GType>> {
		console.log(`[Send | p->c | ${tabId.toString()}] ${type}`, { payload });
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

	public async sendMessageToContentOnAllTabs<GType extends TBridgeMessageType<GSend, 'content'>>(
		type: GType,
		payload: TBridgeMessagePayload<GSend, 'content', GType>,
		options?: Tabs.SendMessageOptionsType
	): Promise<void> {
		const tabs = await queryTabs();
		await Promise.all(
			tabs
				.filter((tab) => tab.id != null)
				.map((tab) =>
					this.sendMessageToContent(tab.id as unknown as number, type, payload, options)
				)
		);
	}

	// Send message from popup to background
	// https://developer.chrome.com/docs/extensions/develop/concepts/messaging#simple
	public async sendMessageToBackground<GType extends TBridgeMessageType<GSend, 'background'>>(
		type: GType,
		payload: TBridgeMessagePayload<GSend, 'background', GType>,
		options?: Runtime.SendMessageOptionsType
	): Promise<TBridgeMessageResponse<GSend, 'background', GType>> {
		console.log(`[Send | p->b] ${type}`, { payload });
		return browser.runtime.sendMessage({ type, payload, target: 'background' }, options);
	}

	// Listen to message in popup
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
