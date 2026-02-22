import { Logo, MountainBg } from "@/assets";
import { Typography } from "@/shared/components/ui/typography";
import LoginRightPanel from "./right-panel";

export default function LoginPage() {
  return (
    <div className="bg-background grid min-h-screen grid-cols-1 sm:grid-cols-2">
      {/* Left — branding panel */}
      <div className="bg-primary relative hidden flex-col justify-between border-r px-14 py-12 sm:flex">
        <Typography
          variant="label"
          className="text-primary-foreground tracking-widest uppercase"
        >
          Insurance Portal
        </Typography>
        <div className="space-y-4">
          <div className="bg-primary-foreground/50 h-px w-10" />
          <Typography
            variant="h2"
            className="text-primary-foreground max-w-xs leading-snug"
          >
            Manage your platform from one place.
          </Typography>
          <Typography
            variant="body"
            muted
            className="text-primary-foreground/80 max-w-sm"
          >
            Secure, audited access for authorised personnel only.
          </Typography>
        </div>
        <Typography variant="caption" className="text-primary-foreground/80">
          © {new Date().getFullYear()} Admin Portal. Internal use only.
        </Typography>

        <img src={MountainBg} className="absolute right-0 bottom-0" />
      </div>

      {/* Right — form */}
      <div className="relative flex flex-col justify-center p-4 sm:p-8">
        <img
          src={Logo}
          className="absolute top-5 left-1/2 size-10 -translate-x-1/2 transform"
        />

        <LoginRightPanel />
      </div>
    </div>
  );
}
