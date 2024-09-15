import { createState, withPersist } from 'feature-state';
import { serializePatterns, unserializePatterns, type TPattern } from '@/lib';

import { popupBridge } from './popup-bridge';

export const $patterns = withPersist(
	createState<TPattern[]>([{ regex: /Benno/g, isActive: true }]),
	{
		async load() {
			const response = await popupBridge.sendMessageToContentOnActiveTab('get-patterns', undefined);
			return unserializePatterns(response?.patterns ?? []);
		},
		async save(_, value) {
			await popupBridge.sendMessageToContentOnAllTabs('updated-patterns', {
				patterns: serializePatterns(value)
			});
			return true;
		},
		delete() {
			// TODO
			return true;
		}
	},
	'patterns'
);

$patterns.persist();
