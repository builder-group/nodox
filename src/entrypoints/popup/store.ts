import { createState, LOAD_FROM_STORAGE_SOURCE_KEY, withStorage } from 'feature-state';
import { LocalStorageInterface } from '@/lib';
import { type TPattern } from '@/types';

import { popupBridge } from './popup-bridge';

export const $patterns = withStorage(
	createState<TPattern[]>([{ source: 'Benno', flags: 'g', isActive: true }]),
	new LocalStorageInterface<TPattern[]>(),
	'patterns'
);
$patterns.persist().catch(() => {
	// do nothing
});
$patterns.listen(({ source }) => {
	if (source !== LOAD_FROM_STORAGE_SOURCE_KEY) {
		popupBridge.sendMessageToContentOnAllTabs('updated-patterns', undefined).catch(() => {
			// do nothing
		});
	}
});

export const $isActive = withStorage(
	createState(true),
	new LocalStorageInterface<boolean>(),
	'isActive'
);
$isActive.persist().catch(() => {
	// do nothing
});
$isActive.listen(({ source }) => {
	if (source !== LOAD_FROM_STORAGE_SOURCE_KEY) {
		popupBridge.sendMessageToContentOnAllTabs('updated-is-active', undefined).catch(() => {
			// do nothing
		});
	}
});
