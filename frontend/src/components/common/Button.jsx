import { cn } from "../../lib/utils";

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}) => {
  const variants = {
    primary:
      "bg-sitm-gold text-sitm-navy hover:bg-sitm-gold-light shadow-md hover:shadow-lg font-semibold",
    secondary:
      "border-2 border-sitm-navy text-sitm-navy hover:bg-sitm-navy hover:text-white dark:border-sitm-gold dark:text-sitm-gold dark:hover:bg-sitm-gold dark:hover:text-sitm-navy shadow-sm hover:shadow-md",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-base min-h-[44px]",
    lg: "px-8 py-4 text-lg min-h-[52px]",
  };

  return (
    <button
      className={cn(
        "rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
