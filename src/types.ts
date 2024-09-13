import { type TBridgeMessage } from './lib';

export type TP2BSayHelloMessage = TBridgeMessage<
	'background',
	'say-hello',
	{ message: string },
	{ id: string }
>;
