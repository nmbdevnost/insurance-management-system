// src/shared/components/theme-switcher.tsx

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { RiComputerLine, RiMoonLine, RiSunLine } from "@remixicon/react";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeOption {
  value: Theme;
  label: string;
  icon: React.ReactNode;
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: "light", label: "Light", icon: <RiSunLine /> },
  { value: "dark", label: "Dark", icon: <RiMoonLine /> },
  { value: "system", label: "System", icon: <RiComputerLine /> },
];

/** Returns the icon matching the currently resolved theme. */
function useThemeIcon(resolvedTheme: string | undefined): React.ReactNode {
  return useMemo(() => {
    if (resolvedTheme === "dark") return <RiMoonLine />;
    if (resolvedTheme === "light") return <RiSunLine />;
    return <RiComputerLine />;
  }, [resolvedTheme]);
}

/** Dropdown menu for switching between light, dark, and system themes. */
export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const triggerIcon = useThemeIcon(resolvedTheme);

  const handleSelect = useCallback(
    (value: Theme) => () => setTheme(value),
    [setTheme]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Toggle theme" />
        }
      >
        {triggerIcon}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEME_OPTIONS.map(({ value, label, icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={handleSelect(value)}
            data-active={theme === value}
            className="data-[active=true]:bg-accent/80 data-[active=true]:text-accent-foreground gap-2"
          >
            {icon}
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
