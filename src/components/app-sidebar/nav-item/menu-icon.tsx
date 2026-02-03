import { cn } from "@/lib/utils"

interface MenuIconProps {
  icon?: string
  className?: string
}

export function MenuIcon({ icon, className }: MenuIconProps) {
  if (!icon) return null
  return (
    <i
      className={cn("shrink-0 text-base leading-none", icon, className)}
      aria-hidden
    />
  )
}
