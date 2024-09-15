import { createState, withPersist } from 'feature-state';
import { type TPattern } from '@/types';

import { popupBridge } from './popup-bridge';

export const $patterns = withPersist(
	createState<TPattern[]>([{ source: 'Benno', flags: 'g', isActive: true }]),
	{
		async load(key) {
			return (await storage.getItem<TPattern[]>(`local:${key}`)) ?? [];
		},
		async save(key, value) {
			await storage.setItem(`local:${key}`, value);
			try {
				await popupBridge.sendMessageToContentOnAllTabs('updated-patterns', undefined);
			} catch (e) {
				// do nothing
			}
			return true;
		},
		async delete(key) {
			await storage.removeItem(`local:${key}`);
			return true;
		}
	},
	'patterns'
);

$patterns.persist().catch(() => {
	// do nothing
});
