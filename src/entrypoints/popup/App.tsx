import React from 'react';
import { Button } from '@/components';

import { popupBridge } from './popup-bridge';

export const App: React.FC = () => {
	const onClick = React.useCallback(() => {
		console.log('On Click');
		(async () => {
			const res = await popupBridge.sendMessageToBackground('say-hello', {
				message: 'Hello from Popup'
			});

			console.log(res);
		})().catch(() => {
			// do nothing
		});
	}, []);

	return (
		<div>
			<Button onClick={onClick}>Hello World</Button>
		</div>
	);
};
