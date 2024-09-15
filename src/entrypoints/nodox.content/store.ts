import { createState, withStorage } from 'feature-state';
import { LocalStorageInterface } from '@/lib';
import { type TPattern } from '@/types';

import { contentBridge } from './content-bridge';

export const $patterns = withStorage(
	createState<TPattern[]>([]),
	new LocalStorageInterface<TPattern[]>(),
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

export const $isActive = withStorage(
	createState(true),
	new LocalStorageInterface<boolean>(),
	'isActive'
);
$isActive.persist().catch(() => {
	// do nothing
});
contentBridge.listen('updated-is-active', () => {
	$isActive.loadFormStorage().catch(() => {
		// do nothing
	});
});
