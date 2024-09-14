import React from 'react';
import { extractErrorData } from '@blgc/utils';
import {
	Button,
	EyeOpenIcon,
	MinusCircledIcon,
	PlusCircledIcon,
	RegexInput,
	RegexText
} from '@/components';

export const App: React.FC = () => {
	const [patterns, setPatterns] = useState<RegExp[]>([/Benno/, /Jeff/]);
	const [currentPattern, setCurrentPattern] = useState<{
		regex: RegExp | null;
		raw: string;
		error: string | null;
	}>({ regex: null, raw: '', error: null });

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
			setPatterns([...patterns, currentPattern.regex]);
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
			<h2 className="mb-2 text-xl font-semibold">Target patterns</h2>
			<p className="mb-4 text-sm text-muted-foreground">
				NoDox will blur any text matching these regex patterns. Add patterns to protect sensitive
				information.
			</p>
			<div className="rounded-md border">
				<div className="flex items-center justify-between border-b p-3">
					<h3 className="text-sm font-medium">Target patterns</h3>
				</div>
				<ul className="divide-y divide-border">
					<li className="flex flex-col gap-2 px-3 py-2">
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
					</li>
					{patterns.map((pattern, index) => (
						<li
							key={`${index.toString()}-${pattern.source}`}
							className="flex items-center justify-between px-3 py-2"
						>
							<div className="flex items-center">
								<EyeOpenIcon className="mr-2 h-4 w-4 text-blue-500" />
								<RegexText value={pattern.source} />
							</div>
							<Button
								variant="ghost"
								size="sm"
								className="h-8 w-8 p-0"
								onClick={() => {
									removePattern(index);
								}}
							>
								<MinusCircledIcon className="h-4 w-4" />
							</Button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
