import { createState, withStorage } from 'feature-state';
import { storage } from 'wxt/storage';
import { type TPattern } from '@/types';

import { contentBridge } from './content-bridge';

export const $patterns = withStorage(
	createState<TPattern[]>([]),
	{
		async load(key) {
			return (await storage.getItem<TPattern[]>(`local:${key}`)) ?? [];
		},
		save() {
			return true;
		},
		delete() {
			return true;
		}
	},
	'patterns'
);

$patterns.persist().catch(() => {
	// do nothing
});

contentBridge.listen('updated-patterns', () => {
	$patterns.loadFormStorage().catch(() => {
		// do nothing
	});
});
