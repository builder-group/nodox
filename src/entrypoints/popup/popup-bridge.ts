import { PopupBridge } from '@/lib';
import { type TP2BGetPatterns, type TP2BUpdatedPatterns } from '@/types';

export const popupBridge = new PopupBridge<TP2BUpdatedPatterns | TP2BGetPatterns, any>();
