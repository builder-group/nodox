import React from 'react';
import { extractErrorData } from '@blgc/utils';
import {
	Button,
	EyeClosedIcon,
	EyeOpenIcon,
	MinusCircledIcon,
	PlusCircledIcon,
	RegexInput,
	RegexText,
	ScrollArea,
	ScrollBar,
	Toggle
} from '@/components';

export const App: React.FC = () => {
	const [patterns, setPatterns] = useState<{ regex: RegExp; isActive: boolean }[]>([
		{ regex: /Benno/, isActive: true }
	]);
	const [currentPattern, setCurrentPattern] = useState<{
		regex: RegExp | null;
		raw: string;
		error: string | null;
	}>({ regex: null, raw: '', error: null });
	const [, forceRender] = React.useReducer((s: number) => s + 1, 0);

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
		if (currentPattern.regex != null) {
			setPatterns([...patterns, { regex: currentPattern.regex, isActive: true }]);
			setCurrentPattern({ regex: null, raw: '', error: null });
		}
	}, [currentPattern, patterns]);

	const removePattern = React.useCallback(
		(index: number) => {
			setPatterns(patterns.filter((_, i) => i !== index));
		},
		[patterns]
	);

	return (
		<div className="h-[450px] w-[350px] overflow-y-auto bg-background p-4 text-foreground">
			<h2 className="mb-2 text-xl font-semibold">NoDox - Regex Patterns</h2>
			<p className="mb-4 text-sm text-muted-foreground">
				Enter regex patterns to automatically blur matching sensitive text.
			</p>

			<div className="rounded-md border">
				<div className="flex flex-col gap-2 border-b-[1px] px-3 py-2">
					<div className="flex w-full">
						<RegexInput
							value={currentPattern.raw}
							onChange={handlePatternChange}
							placeholder="Enter regex pattern"
							containerClassName="mr-2 flex-grow"
							variant={currentPattern.error == null ? 'default' : 'destructive'}
						/>
						<Button size="icon" onClick={addPattern} disabled={currentPattern.regex == null}>
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
									key={`${index.toString()}-${pattern.regex.source}`}
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
											<RegexText value={pattern.regex.source} className="pl-1" />
											<ScrollBar orientation="horizontal" className="top-5" />
										</ScrollArea>
									</div>
									<Toggle
										pressed={pattern.isActive}
										onPressedChange={(pressed) => {
											pattern.isActive = pressed;
											forceRender();
										}}
										className="hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-blue-500 data-[state=on]:hover:text-blue-400"
									>
										{pattern.isActive ? (
											<EyeOpenIcon className="h-4 w-4" />
										) : (
											<EyeClosedIcon className="h-4 w-4" />
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
		</div>
	);
};
