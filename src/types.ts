import { type TBridgeMessage } from '@/lib';

export type TP2BUpdatedPatterns = TBridgeMessage<
	'content',
	'updated-patterns',
	{ patterns: TPattern[] }
>;

export type TP2BGetPatterns = TBridgeMessage<
	'content',
	'get-patterns',
	undefined,
	{ patterns: TPattern[] }
>;

export interface TPattern {
	source: string;
	flags: string;
	isActive: boolean;
}
