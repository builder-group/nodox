/**
 * -----------------------------------------------------------------------------
 * This file includes code derived from the project shadcn-ui/ui by \@shadcn.
 * Project Repository: https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/new-york/ui/input.tsx
 *
 * Date of Import: 13 September 2024
 * -----------------------------------------------------------------------------
 * The code included in this file is licensed under the MIT License,
 * as per the original project by \@shadcn.
 * For the license text, see: https://github.com/shadcn-ui/ui/blob/main/LICENSE.md
 * -----------------------------------------------------------------------------
 */

import * as React from 'react';
import { cn } from '@/lib';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				className={cn(
					'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				type={type}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input };
