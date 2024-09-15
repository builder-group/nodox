import { createState, withPersist, type StorageInterface } from 'feature-state';
import { storage } from 'wxt/storage';
import {
	serializePatterns,
	unserializePatterns,
	type TPattern,
	type TSerializedPattern
} from '@/lib';

import { contentBridge } from './content-bridge';

const localStorage: StorageInterface<TPattern[]> = {
	async load(key) {
		const serializedPatterns = (await storage.getItem<TSerializedPattern[]>(`local:${key}`)) ?? [];
		return unserializePatterns(serializedPatterns);
	},
	async save(key, value) {
		await storage.setItem(`local:${key}`, serializePatterns(value));
		return true;
	},
	async delete(key) {
		await storage.removeItem(`local:${key}`);
		return true;
	}
};

export const $patterns = withPersist(
	createState<TPattern[]>([{ regex: /Benno/g, isActive: true }]),
	localStorage,
	'patterns'
);

$patterns.persist();

contentBridge.listen('updated-patterns', (payload) => {
	$patterns.set(unserializePatterns(payload.patterns));
});

contentBridge.listen('get-patterns', () => {
	return { patterns: serializePatterns($patterns.get() as TPattern[]) };
});
