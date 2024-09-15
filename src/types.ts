import { type TBridgeMessage } from '@/lib';

export type TP2BUpdatedPatterns = TBridgeMessage<'content', 'updated-patterns'>;

export interface TPattern {
	source: string;
	flags: string;
	isActive: boolean;
}
