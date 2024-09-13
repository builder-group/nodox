import React from 'react';
import { Button, Label, PlusCircledIcon, RegexInput } from '@/components';

import { popupBridge } from './popup-bridge';

export const App: React.FC = () => {
	const onClick = React.useCallback(() => {
		console.log('On Click');
		(async () => {
			const res = await popupBridge.sendMessageToBackground('say-hello', {
				message: 'Hello from Popup'
			});

			const installDate = await storage.getItem('local:installDate');

			console.log({ res, installDate });
		})().catch(() => {
			// do nothing
		});
	}, []);

	const [regex, setRegex] = useState<string>('');
	const [isValid, setIsValid] = useState<boolean>(true);

	const handleRegexChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const newRegex = e.target.value;
		setRegex(newRegex);
		try {
			const parsedRegex = new RegExp(newRegex);
			setIsValid(true);
		} catch (error) {
			setIsValid(false);
		}
	}, []);

	return (
		<div className="flex h-[450px] w-[350px] flex-col overflow-hidden bg-background p-4 text-foreground">
			<Button onClick={onClick}>Hello World 2</Button>
			<div className="space-y-2">
				<Label htmlFor="regex-input">Enter Regex Pattern</Label>
				<div className="flex">
					<RegexInput
						id="regex-input"
						value={regex}
						onChange={handleRegexChange}
						placeholder="Enter regex pattern"
					/>
					<Button size="icon" className="ml-2">
						<PlusCircledIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
			{!isValid && <p className="mt-2 text-sm text-red-500">Invalid regex pattern</p>}
		</div>
	);
};
