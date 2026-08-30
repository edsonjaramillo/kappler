import { useFormContext } from "react-hook-form";

import { cn } from "./lib/cn";
import { Text } from "./text";

interface InputFieldNameProps {
  name: string;
}

interface InputRequiredProps {
  id: string;
  type: React.ComponentProps<"input">["type"];
  autoComplete: React.ComponentProps<"input">["autoComplete"];
}

type InputProps = Omit<React.ComponentProps<"input">, "name"> &
  InputRequiredProps &
  InputFieldNameProps;

export function Input({
  autoComplete,
  className,
  id,
  name,
  required,
  type,
  ...props
}: InputProps): React.JSX.Element {
  const { register } = useFormContext();

  const style = cn(
    "h-9 w-full rounded-base border border-muted bg-transparent px-3 py-2 text-sm text-black shadow-base placeholder:text-gray focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:outline-0 disabled:cursor-not-allowed disabled:text-muted disabled:placeholder:text-muted",
    className,
  );

  const registration = register(name, { required });

  return (
    <input
      autoComplete={autoComplete}
      className={style}
      id={id}
      type={type}
      {...registration}
      {...props}
    />
  );
}

type InputGroupProps = React.ComponentProps<"div">;

export function InputGroup({ children, className, ...props }: InputGroupProps): React.JSX.Element {
  const style = cn("flex w-full max-w-form flex-col gap-2", className);
  return (
    <div className={style} {...props}>
      {children}
    </div>
  );
}

type InputColumnsProps = React.ComponentProps<"div">;

export function InputColumns({
  children,
  className,
  ...props
}: InputColumnsProps): React.JSX.Element {
  const style = cn("grid grid-cols-2 gap-4", className);
  return (
    <div className={style} {...props}>
      {children}
    </div>
  );
}

type InputDescriptionProps = React.ComponentProps<"span">;

export function InputDescription({
  className,
  children,
  ...props
}: InputDescriptionProps): React.JSX.Element {
  return (
    <Text as="span" className={cn(className, "line-clamp-1")} size="sm" tone="gray" {...props}>
      {children}
    </Text>
  );
}

type LabelProps = React.ComponentProps<"label">;

export function Label({ className, children, ...props }: LabelProps): React.JSX.Element {
  return (
    <Text as="label" className={cn(className, "line-clamp-1 font-medium")} size="sm" {...props}>
      {children}
    </Text>
  );
}

type InputErrorProps = React.ComponentProps<"span"> & InputFieldNameProps;

export function InputError({
  className,
  name,
  ...props
}: InputErrorProps): React.JSX.Element | null {
  const { formState } = useFormContext();
  const { errors } = formState;

  const error = errors?.[name];
  const errorMessage = error?.message;
  const message = typeof errorMessage === "string" ? errorMessage : "";

  if (message.length === 0) {
    return null;
  }

  return (
    <Text
      as="span"
      className={cn("line-clamp-1 font-semibold", className)}
      size="sm"
      tone="danger"
      {...props}>
      {message}
    </Text>
  );
}
