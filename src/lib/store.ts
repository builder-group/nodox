import { createState, withPersist } from 'feature-state';
import { storage } from 'wxt/storage';

// TODO: Pattern is ofc not shared between Popup and Content so we need to somehow sync it
export const $patterns = withPersist(
	createState<TPattern[]>([{ regex: /Benno/g, isActive: true }]),
	{
		async load(key) {
			const serializedPatterns =
				(await storage.getItem<TSerializedPattern[]>(`local:${key}`)) ?? [];
			return serializedPatterns.map(({ flags, source, isActive }) => ({
				regex: new RegExp(source, flags),
				isActive
			}));
		},
		async save(key, value) {
			const serializedPatterns: TSerializedPattern[] = value.map(({ regex, isActive }) => ({
				source: regex.source,
				flags: regex.flags,
				isActive
			}));
			await storage.setItem(`local:${key}`, serializedPatterns);
			return true;
		},
		async delete(key) {
			await storage.removeItem(`local:${key}`);
			return true;
		}
	},
	'patterns'
);

$patterns.persist();

interface TSerializedPattern extends Omit<TPattern, 'regex'> {
	source: string;
	flags: string;
}

interface TPattern {
	regex: RegExp;
	isActive: boolean;
}
