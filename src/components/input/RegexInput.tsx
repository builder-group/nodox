import React from 'react';
import { cn } from '@/lib';

import { RegexText } from '../display';
import { AdvancedInput, type TAdvancedInputProps } from './AdvancedInput';

// https://akashhamirwasia.com/blog/building-highlighted-input-field-in-react/
export const RegexInput = React.forwardRef<HTMLInputElement, TProps>((props, ref) => {
	const { value, onChange, containerClassName, className, ...other } = props;
	const regexTextRef = React.useRef<HTMLDivElement>(null);

	const syncScroll = useCallback((e: React.UIEvent<HTMLInputElement>) => {
		if (regexTextRef.current) {
			regexTextRef.current.scrollTop = e.currentTarget.scrollTop;
			regexTextRef.current.scrollLeft = e.currentTarget.scrollLeft;
		}
	}, []);

	return (
		<div className={cn('relative', containerClassName)}>
			<RegexText
				value={value}
				ref={regexTextRef}
				className="pointer-events-none absolute px-3 py-2"
			/>
			<AdvancedInput
				{...other}
				ref={ref}
				value={value}
				onChange={onChange}
				onScroll={syncScroll}
				className={cn('font-mono', className)}
				style={{ color: 'transparent', caretColor: 'black' }}
			/>
		</div>
	);
});

RegexInput.displayName = 'RegexInput';

interface TProps extends TAdvancedInputProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	containerClassName?: string;
}
