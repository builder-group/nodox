export interface TBridgeMessage<
	GTarget extends TTarget = TTarget,
	GType extends string = string,
	GPayload = unknown,
	GResponse = unknown // Inferred
> {
	type: GType;
	payload: GPayload;
	target: GTarget;
}

export type TBridgeMessageTarget<GBridgeMessage extends TBridgeMessage> =
	GBridgeMessage extends TBridgeMessage<infer GTarget, any, any, any> ? GTarget : never;

export type TBridgeMessageType<GBridgeMessage extends TBridgeMessage, GTarget extends TTarget> =
	GBridgeMessage extends TBridgeMessage<GTarget, infer GType, any, any> ? GType : never;

export type TBridgeMessagePayload<
	GBridgeMessage extends TBridgeMessage,
	GTarget extends TTarget,
	GType extends TBridgeMessageType<GBridgeMessage, GTarget>
> =
	GBridgeMessage extends TBridgeMessage<GTarget, GType, infer GPayload, any>
		? // eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- Type
			GPayload extends void
			? undefined
			: GPayload
		: never;

export type TBridgeMessageResponse<
	GBridgeMessage extends TBridgeMessage,
	GTarget extends TTarget,
	GType extends TBridgeMessageType<GBridgeMessage, GTarget>
> = GBridgeMessage extends TBridgeMessage<GTarget, GType, any, infer GResponse> ? GResponse : never;

export type TTarget = 'offscreen' | 'content' | 'background' | 'popup';
