import { BackgroundBridge } from '@/lib';
import { type TP2BSayHelloMessage } from '@/types';

const backgroundBridge = new BackgroundBridge<any, TP2BSayHelloMessage>();

export default defineBackground(() => {
	backgroundBridge.listen('say-hello', (payload) => {
		console.log('Hello background', { payload });
		return { id: browser.runtime.id };
	});
});
