import { FAILED_TO_LOAD_FROM_STORAGE_IDENTIFIER, type TStorageInterface } from 'feature-state';

export class LocalStorageInterface<GStorageValue> implements TStorageInterface<GStorageValue> {
	async load(key: string): Promise<GStorageValue | typeof FAILED_TO_LOAD_FROM_STORAGE_IDENTIFIER> {
		const item = await storage.getItem<GStorageValue>(`local:${key}`);
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- If item not found its explicit null
		return item !== null ? item : FAILED_TO_LOAD_FROM_STORAGE_IDENTIFIER;
	}
	async save(key: string, value: GStorageValue): Promise<boolean> {
		await storage.setItem(`local:${key}`, value);
		return true;
	}
	async delete(key: string): Promise<boolean> {
		await storage.removeItem(`local:${key}`);
		return true;
	}
}
