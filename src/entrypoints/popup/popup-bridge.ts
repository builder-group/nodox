import { PopupBridge } from '@/lib';
import { type TP2CUpdatedIsActive, type TP2CUpdatedPatterns } from '@/types';

export const popupBridge = new PopupBridge<TP2CUpdatedPatterns | TP2CUpdatedIsActive, any>();
