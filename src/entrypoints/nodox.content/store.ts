import { createState } from 'feature-state';
import { storage } from 'wxt/storage';
import { type TPattern } from '@/types';

import { contentBridge } from './content-bridge';

export const $patterns = createState<TPattern[]>([]);

loadPatternsFormStorage().catch(() => {
	// do nothing
});

contentBridge.listen('updated-patterns', loadPatternsFormStorage);

async function loadPatternsFormStorage(): Promise<void> {
	const patterns = (await storage.getItem<TPattern[]>(`local:patterns`)) ?? [];
	$patterns.set(patterns);
}
