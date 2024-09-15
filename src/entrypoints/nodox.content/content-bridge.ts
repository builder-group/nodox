import { ContentBridge } from '@/lib';
import { type TP2BGetPatterns, type TP2BUpdatedPatterns } from '@/types';

export const contentBridge = new ContentBridge<any, TP2BUpdatedPatterns | TP2BGetPatterns>();
