import { ContentBridge } from '@/lib';
import { type TP2CUpdatedIsActive, type TP2CUpdatedPatterns } from '@/types';

export const contentBridge = new ContentBridge<any, TP2CUpdatedPatterns | TP2CUpdatedIsActive>();
