import { type TBridgeMessage, type TSerializedPattern } from '@/lib';

export type TP2BUpdatedPatterns = TBridgeMessage<
	'content',
	'updated-patterns',
	{ patterns: TSerializedPattern[] }
>;

export type TP2BGetPatterns = TBridgeMessage<
	'content',
	'get-patterns',
	undefined,
	{ patterns: TSerializedPattern[] }
>;
