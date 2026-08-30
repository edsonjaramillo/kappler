import { cn } from "./lib/cn";

type FormProps = React.ComponentProps<"form">;

export function Form({ className, children, ...props }: FormProps): React.JSX.Element {
  return (
    <form className={cn("mx-auto w-full max-w-form space-y-4", className)} {...props} noValidate>
      {children}
    </form>
  );
}
