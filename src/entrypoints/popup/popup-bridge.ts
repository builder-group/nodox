import { PopupBridge } from '@/lib';
import { type TP2BSayHelloMessage } from '@/types';

export const popupBridge = new PopupBridge<TP2BSayHelloMessage, any>();
