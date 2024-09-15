import { createState, withPersist } from 'feature-state';
import { type TPattern } from '@/types';

import { popupBridge } from './popup-bridge';

export const $patterns = withPersist(
	createState<TPattern[]>([{ source: 'Benno', flags: 'g', isActive: true }]),
	{
		async load() {
			const response = await popupBridge.sendMessageToContentOnActiveTab('get-patterns', undefined);
			return response?.patterns ?? [];
		},
		async save(_, value) {
			await popupBridge.sendMessageToContentOnAllTabs('updated-patterns', {
				patterns: value
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
