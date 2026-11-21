import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-navy text-on-navy hover:bg-navy-deep",
  secondary: "border border-line bg-card text-navy hover:border-navy",
  ghost: "text-navy hover:bg-card",
  danger: "border border-danger bg-danger-soft text-danger",
  brass: "bg-brass text-paper hover:opacity-90",
} as const;

export function buttonClasses(variant: keyof typeof variants = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className,
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return <button {...props} className={buttonClasses(variant, className)} />;
}
