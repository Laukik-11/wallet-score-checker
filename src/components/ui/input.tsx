import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex min-h-11 w-full min-w-0 rounded-xl border border-border bg-black/45 px-4 py-2.5 font-mono text-sm text-foreground shadow-inner shadow-black/20 transition-[border-color,box-shadow] duration-200 placeholder:text-muted/80 focus-visible:border-accent/55 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50 md:text-[0.925rem]',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
