import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "flex min-h-[100px] w-full rounded-xl border border-border bg-background px-4 py-3 text-sm",
            "placeholder:text-muted-foreground/60 resize-y",
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

Textarea.displayName = "Textarea";
export { Textarea, type TextareaProps };
