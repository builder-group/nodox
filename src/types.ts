import { type TBridgeMessage } from '@/lib';

export type TP2CUpdatedPatterns = TBridgeMessage<'content', 'updated-patterns'>;

export type TP2CUpdatedIsActive = TBridgeMessage<'content', 'updated-is-active'>;

export interface TPattern {
	source: string;
	flags: string;
	isActive: boolean;
}
