import React from 'react';

import { cn } from '../../lib';

export const RegexText = React.forwardRef<HTMLDivElement, TProps>((props, ref) => {
	const { value, className, ...other } = props;
	const highlightedElements = useMemo(() => {
		const regex = /(?<temp1>\\.|[[\](){}^$*+?.|]|\w+|\s+)/g;
		const parts = value.split(regex).filter(Boolean);

		return parts.map((part, index) => {
			if (part.startsWith('\\')) {
				return (
					<span key={index} className="text-emerald-500">
						{part}
					</span>
				); // Escaped characters
			} else if (/[[\](){}^$*+?.|]/.test(part)) {
				return (
					<span key={index} className="text-blue-500">
						{part}
					</span>
				); // Special regex characters
			} else if (/\w+/.test(part)) {
				return (
					<span key={index} className="text-purple-500">
						{part}
					</span>
				); // Words
			} else if (/\s+/.test(part)) {
				return (
					<span key={index} className="text-gray-300">
						{part}
					</span>
				); // Whitespace
			}
			return <span key={index}>{part}</span>; // Other characters
		});
	}, [value]);

	return (
		<div
			ref={ref}
			className={cn('inset-0 overflow-hidden whitespace-pre font-mono text-sm', className)}
			{...other}
		>
			{highlightedElements}
		</div>
	);
});

RegexText.displayName = 'RegexText';

interface TProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
	value: string;
}
