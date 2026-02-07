import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "../../lib/utils";

export function ThemeToggle({ className, isScrolled }) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        "p-2.5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 group cursor-pointer",
        theme === 'dark'
          ? "border-slate-700 hover:bg-slate-800 hover:border-sitm-gold"
          : "border-gray-200 hover:bg-gray-100 hover:border-sitm-navy",
        className
      )}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-sitm-gold" />
      ) : (
        <Moon 
          size={20} 
          className={cn(
            "transition-colors duration-300",
            isScrolled ? "text-sitm-navy" : "text-white group-hover:text-sitm-navy"
          )} 
        />
      )}
    </button>
  );
}
