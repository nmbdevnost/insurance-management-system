import { Logo, MountainBg } from "@/assets";
import { Typography } from "@/shared/components/ui/typography";
import { Button } from "./ui/button";
import { RiArrowLeftLine, RiDashboardLine } from "@remixicon/react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Main */}
      <div className="flex grow p-14">
        <div className="flex flex-1 flex-col justify-center gap-6">
          <Link to="/" className="size-10">
            <img src={Logo} className="h-full w-full" alt="logo" />
          </Link>

          <Typography
            variant="label"
            className="font-mono tracking-widest uppercase"
          >
            Insurance Portal
          </Typography>

          {/* Large 404 */}
          <span
            className="text-foreground text-[8rem] leading-none font-black tracking-tighter select-none"
            aria-hidden
          >
            404
          </span>

          <span className="bg-primary h-px w-12" />

          <div className="space-y-2">
            <Typography variant="h3">This page doesn't exist.</Typography>
            <Typography variant="body" muted>
              You may have followed a broken link or typed the address
              incorrectly.
            </Typography>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button size="lg" render={<Link to="/" />}>
              <RiDashboardLine />
              Go to Dashboard
            </Button>

            <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
              <RiArrowLeftLine />
              Go Back
            </Button>
          </div>

          <Typography variant="caption" muted className="font-mono">
            HTTP/404 — If this persists, contact your system administrator.
          </Typography>
        </div>

        <div className="bg-primary relative -m-14 ml-0 max-w-xl flex-1">
          <img
            src={MountainBg}
            className="absolute right-0 bottom-0 max-w-[80%]"
          />
        </div>
      </div>
    </div>
  );
}
