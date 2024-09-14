import React from 'react';
import { cn } from '@/lib';

import { RegexText } from '../display';
import { Input } from './Input';

// https://akashhamirwasia.com/blog/building-highlighted-input-field-in-react/
export const RegexInput = React.forwardRef<HTMLInputElement, TProps>((props, ref) => {
	const { value, onChange, className, ...other } = props;
	const regexTextRef = useRef<HTMLDivElement>(null);

	const syncScroll = useCallback((e: React.UIEvent<HTMLInputElement>) => {
		if (regexTextRef.current) {
			regexTextRef.current.scrollTop = e.currentTarget.scrollTop;
			regexTextRef.current.scrollLeft = e.currentTarget.scrollLeft;
		}
	}, []);

	return (
		<div className={cn('relative', className)}>
			<RegexText value={value} ref={regexTextRef} className="pointer-events-none absolute" />
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
