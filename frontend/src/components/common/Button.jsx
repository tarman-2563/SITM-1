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
      "bg-sitm-maroon text-white hover:bg-sitm-maroon-light shadow-lg hover:shadow-xl",
    secondary:
      "bg-sitm-gold text-sitm-navy hover:bg-sitm-gold-light shadow-md hover:shadow-lg",
    outline:
      "border-2 border-sitm-maroon text-sitm-maroon hover:bg-sitm-maroon hover:text-white dark:border-sitm-gold dark:text-sitm-gold dark:hover:bg-sitm-gold dark:hover:text-sitm-navy",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base font-medium",
    lg: "px-8 py-4 text-lg font-semibold",
    icon: "p-2",
  };

  return (
    <button
      className={cn(
        "rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
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
