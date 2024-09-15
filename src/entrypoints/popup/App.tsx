import { useGlobalState } from 'feature-react/state';
import React from 'react';
import { extractErrorData } from '@blgc/utils';
import {
	Button,
	EyeClosedIcon,
	EyeOpenIcon,
	Label,
	MinusCircledIcon,
	PlusCircledIcon,
	RegexInput,
	RegexText,
	ScrollArea,
	ScrollBar,
	Switch,
	Toggle
} from '@/components';

import { $patterns } from './store';

export const App: React.FC = () => {
	const patterns = useGlobalState($patterns);
	const [currentPattern, setCurrentPattern] = useState<{
		regex: RegExp | null;
		raw: string;
		error: string | null;
	}>({ regex: null, raw: '', error: null });
	const [isActive, setIsActive] = React.useState(true);

	const handlePatternChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const patternString = e.target.value;
		let regexPattern: RegExp | null = null;
		let error: string | null = null;
		try {
			regexPattern = new RegExp(patternString, 'g');
		} catch (err) {
			error = extractErrorData(err).message;
		}
		setCurrentPattern({ regex: regexPattern, raw: patternString, error });
	}, []);

	const addPattern = React.useCallback(() => {
		const regex = currentPattern.regex;
		if (regex != null) {
			$patterns.set((v) => [...v, { source: regex.source, flags: regex.flags, isActive: true }]);
			setCurrentPattern({ regex: null, raw: '', error: null });
		}
	}, [currentPattern]);

	const removePattern = React.useCallback((index: number) => {
		$patterns.set((v) => v.filter((_, i) => i !== index));
	}, []);

	return (
		<div className="h-[500px] w-[350px] overflow-y-auto bg-background p-4 text-foreground">
			<h2 className="mb-2 text-xl font-semibold">NoDox - Regex Patterns</h2>
			<p className="mb-4 text-sm text-muted-foreground">
				Enter regex patterns to blur matching text immediately. Reload the page to unblur text
				matching removed or made visible patterns.
			</p>

			<div className="rounded-md border">
				<div className="flex flex-col gap-2 border-b-[1px] px-2 py-2">
					<div className="flex w-full">
						<RegexInput
							value={currentPattern.raw}
							onChange={handlePatternChange}
							placeholder="Enter regex pattern"
							containerClassName="mr-2 flex-grow"
							variant={currentPattern.error == null ? 'default' : 'destructive'}
						/>
						<Button
							size="icon"
							onClick={addPattern}
							disabled={currentPattern.regex == null || currentPattern.raw.trim().length === 0}
						>
							<PlusCircledIcon className="h-4 w-4" />
						</Button>
					</div>
					{currentPattern.error != null && (
						<p className="text-sm text-destructive">{currentPattern.error}</p>
					)}
				</div>

				{patterns.length > 0 ? (
					<ScrollArea className="h-64">
						<ul className="divide-y divide-border">
							{patterns.map((pattern, index) => (
								<li
									key={`${index.toString()}-${pattern.source}`}
									className="flex items-center justify-between px-1 py-1"
								>
									<div className="flex items-center">
										<Button
											variant="ghost"
											size="icon"
											onClick={() => {
												removePattern(index);
											}}
										>
											<MinusCircledIcon className="h-4 w-4" />
										</Button>
										<ScrollArea className="w-56 overflow-visible">
											<RegexText value={`/${pattern.source}/${pattern.flags}`} className="pl-1" />
											<ScrollBar orientation="horizontal" className="top-5" />
										</ScrollArea>
									</div>
									<Toggle
										pressed={pattern.isActive}
										onPressedChange={(pressed) => {
											$patterns.set((v) =>
												v.map((p, i) => {
													if (i === index) {
														return { ...p, isActive: pressed };
													}
													return p;
												})
											);
										}}
										className="text-blue-500 hover:bg-transparent hover:text-blue-400 data-[state=on]:bg-transparent data-[state=on]:text-gray-500 data-[state=on]:hover:text-gray-400"
									>
										{pattern.isActive ? (
											<EyeClosedIcon className="h-4 w-4" />
										) : (
											<EyeOpenIcon className="h-4 w-4" />
										)}
									</Toggle>
								</li>
							))}
						</ul>
					</ScrollArea>
				) : (
					<div className="flex h-64 items-center justify-center">
						<p>No Regex patterns defined</p>
					</div>
				)}
			</div>

			<div className="mt-2 flex items-center space-x-2">
				<Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
				<Label htmlFor="active">Active</Label>
			</div>
		</div>
	);
};
