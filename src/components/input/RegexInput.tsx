import React from 'react';

import { Input } from './Input';

// https://akashhamirwasia.com/blog/building-highlighted-input-field-in-react/
export const RegexInput = React.forwardRef<HTMLInputElement, TProps>((props, ref) => {
	const { value, onChange, ...other } = props;
	const highlightedValue = React.useMemo(
		() =>
			value.replace(/(?<temp1>\\.|[[\](){}^$*+?.|])/g, (match) => {
				if (match.startsWith('\\')) {
					return `<span style="color: #10B981;">${match}</span>`;
				}
				return `<span style="color: #3B82F6;">${match}</span>`;
			}),
		[value]
	);
	const containerRef = useRef<HTMLDivElement>(null);

	const syncScroll = React.useCallback((e: React.UIEvent<HTMLInputElement>) => {
		if (containerRef.current != null) {
			containerRef.current.scrollTop = e.currentTarget.scrollTop;
			containerRef.current.scrollLeft = e.currentTarget.scrollLeft;
		}
	}, []);

	return (
		<div className="relative">
			<div
				ref={containerRef}
				className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre px-3 py-2 font-mono text-sm"
				dangerouslySetInnerHTML={{ __html: highlightedValue }}
			/>
			<Input
				{...other}
				ref={ref}
				value={value}
				onChange={onChange}
				onScroll={syncScroll}
				className="relative bg-transparent font-mono"
				style={{ color: 'transparent', caretColor: 'black' }}
			/>
		</div>
	);
});

RegexInput.displayName = 'RegexInput';

interface TProps extends React.InputHTMLAttributes<HTMLInputElement> {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
