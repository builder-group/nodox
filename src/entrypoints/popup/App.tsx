import React from 'react';
import {
	Button,
	EyeOpenIcon,
	MinusCircledIcon,
	PlusCircledIcon,
	RegexInput,
	RegexText
} from '@/components';

export const App: React.FC = () => {
	const [patterns, setPatterns] = useState(['Benno', 'Jeff']);
	const [isValidPattern, setValidPattern] = useState(true);
	const [currentPattern, setCurrentPattern] = useState('');

	const handlePatternChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const currPattern = e.target.value;
		setCurrentPattern(currPattern);
		try {
			const parsedRegex = new RegExp(currPattern);
			// TODO: Set parsed Regex as pattern?
			setValidPattern(true);
		} catch (error) {
			setValidPattern(false);
		}
	}, []);

	const addPattern = React.useCallback(() => {
		if (currentPattern.length > 0) {
			setPatterns([...patterns, currentPattern]);
			setCurrentPattern('');
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
								value={currentPattern}
								onChange={handlePatternChange}
								placeholder="Enter regex pattern"
								containerClassName="mr-2 flex-grow"
								variant={isValidPattern ? 'default' : 'destructive'}
							/>
							<Button size="icon" onClick={addPattern} disabled={!isValidPattern}>
								<PlusCircledIcon className="h-4 w-4" />
							</Button>
						</div>
						{!isValidPattern && <p className="text-sm text-destructive">Invalid regex pattern</p>}
					</li>
					{patterns.map((pattern, index) => (
						<li key={index} className="flex items-center justify-between px-3 py-2">
							<div className="flex items-center">
								<EyeOpenIcon className="mr-2 h-4 w-4 text-blue-500" />
								<RegexText value={pattern} />
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
