import { createState, withPersist, type StorageInterface } from 'feature-state';
import { storage } from 'wxt/storage';
import { type TPattern } from '@/types';

import { contentBridge } from './content-bridge';

const localStorage: StorageInterface<TPattern[]> = {
	async load(key) {
		return (await storage.getItem<TPattern[]>(`local:${key}`)) ?? [];
	},
	async save(key, value) {
		await storage.setItem(`local:${key}`, value);
		return true;
	},
	async delete(key) {
		await storage.removeItem(`local:${key}`);
		return true;
	}
};

export const $patterns = withPersist(createState<TPattern[]>([]), localStorage, 'patterns');

$patterns.persist();

contentBridge.listen('updated-patterns', (payload) => {
	$patterns.set(payload.patterns);
});

contentBridge.listen('get-patterns', () => {
	return { patterns: $patterns.get() as TPattern[] };
});
