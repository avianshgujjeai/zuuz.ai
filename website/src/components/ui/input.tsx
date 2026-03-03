import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "flex h-11 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm",
            "placeholder:text-muted-foreground/60",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/15",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-shadow duration-150",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/15",
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="text-xs text-red-600" role="alert">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export { Input, type InputProps };
