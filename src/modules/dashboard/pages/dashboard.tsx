import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/shared/components/ui/item";
import {
  RiAlertLine,
  RiFlashlightLine,
  RiShieldLine,
  RiTimeLine,
} from "@remixicon/react";
import { useState } from "react";
import MetricCard from "../components/metric-card";
import QuickAction from "../components/quick-action";

export function DashboardPage() {
  const [activeView, setActiveView] = useState<"overview" | "client" | "bank">(
    "overview"
  );

  return (
    <>
      {/* Header Bar */}
      <div className="-mx-4 -mt-4 border-b">
        <div className="mx-auto max-w-400 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Insurance Portal
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">
                Real-time policy management & analytics
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={activeView === "overview" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("overview")}
                className="text-xs"
              >
                Overview
              </Button>
              <Button
                variant={activeView === "client" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("client")}
                className="text-xs"
              >
                Client Policies
              </Button>
              <Button
                variant={activeView === "bank" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("bank")}
                className="text-xs"
              >
                Bank Policies
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Metrics Section */}
      <div className="mb-6 grid grid-cols-12 gap-4">
        {/* Large Feature Card */}
        <div className="col-span-12 h-full lg:col-span-5">
          <MetricCard
            label="Total Active Policies"
            value="950"
            subValue="Out of 1,000 total"
            variant="accent"
            trend={5.2}
            className="h-full"
          />
        </div>

        {/* Right Column Metrics */}
        <div className="col-span-12 grid grid-cols-2 gap-4 lg:col-span-7">
          <MetricCard
            label="Expiring Soon"
            value="200"
            subValue="Next 30 days"
            variant="warning"
          />
          <MetricCard
            label="Payment Issues"
            value="4"
            subValue="Requires attention"
            variant="danger"
          />
          <MetricCard
            label="Client Induced"
            value="400"
            subValue="40% of portfolio"
            trend={12.3}
          />
          <MetricCard
            label="Bank Induced"
            value="600"
            subValue="60% of portfolio"
            trend={8.7}
          />
        </div>
      </div>

      {/* Stats Strip */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <Item variant="outline" className="transition-shadow hover:shadow-md">
          <ItemMedia className="bg-primary/10 self-auto! rounded-full p-3">
            <RiShieldLine className="text-primary size-5" />
          </ItemMedia>

          <ItemContent>
            <ItemTitle className="text-2xl font-bold">56</ItemTitle>
            <ItemDescription>Expired Policies</ItemDescription>
          </ItemContent>
        </Item>

        <Item variant="outline" className="transition-shadow hover:shadow-md">
          <ItemMedia className="bg-primary/10 self-auto! rounded-full p-3">
            <RiFlashlightLine className="text-primary size-5" />
          </ItemMedia>

          <ItemContent>
            <ItemTitle className="text-2xl font-bold">95%</ItemTitle>
            <ItemDescription>Retention Rate</ItemDescription>
          </ItemContent>
        </Item>

        <Item variant="outline" className="transition-shadow hover:shadow-md">
          <ItemMedia className="bg-primary/10 self-auto! rounded-full p-3">
            <RiTimeLine className="text-primary size-5" />
          </ItemMedia>

          <ItemContent>
            <ItemTitle className="text-2xl font-bold">2.3d</ItemTitle>
            <ItemDescription>Avg Processing Time</ItemDescription>
          </ItemContent>
        </Item>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Chart Placeholder - Takes 8 columns */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="h-full border-slate-200 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-slate-900">
                  Insurance Distribution
                </CardTitle>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-slate-900" />
                    <span>Building</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-slate-600" />
                    <span>Vehicle</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-slate-400" />
                    <span>Other</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative flex h-100 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-linear-to-br from-slate-50 to-white">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 h-64 w-64 -translate-x-32 -translate-y-32 rounded-full bg-slate-900" />
                  <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-48 translate-y-48 rounded-full bg-slate-900" />
                </div>

                <div className="relative z-10 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100">
                    <svg
                      className="h-10 w-10 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <p className="mb-1 text-sm font-semibold text-slate-600">
                    Chart Visualization
                  </p>
                  <p className="text-xs text-slate-400">
                    Policy distribution by type
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Sidebar - Takes 4 columns */}
        <div className="col-span-12 space-y-4 lg:col-span-4">
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wide text-slate-900 uppercase">
              Client Operations
            </h3>
            <div className="space-y-2">
              <QuickAction
                icon={<RiShieldLine className="h-4 w-4" />}
                title="Record Client Policy"
                subtitle="Submit new client insurance"
                onClick={() => console.log("Record policy")}
              />
              <QuickAction
                icon={<RiShieldLine className="h-4 w-4" />}
                title="Review Submissions"
                subtitle="Manage pending policies"
                onClick={() => console.log("Review")}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wide text-slate-900 uppercase">
              Bank Operations
            </h3>
            <div className="space-y-2">
              <QuickAction
                icon={<RiShieldLine className="h-4 w-4" />}
                title="Initiate Bank Policy"
                subtitle="Create new bank-induced policy"
                onClick={() => console.log("Initiate")}
              />
              <QuickAction
                icon={<RiShieldLine className="h-4 w-4" />}
                title="Manage Portfolio"
                subtitle="Track bank policies"
                onClick={() => console.log("Manage")}
              />
            </div>
          </div>

          {/* Alert Card */}
          <Card className="border-rose-200 bg-rose-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <RiAlertLine className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
                <div>
                  <p className="mb-1 text-sm font-semibold text-rose-900">
                    Payment Failures
                  </p>
                  <p className="mb-3 text-xs text-rose-700">
                    4 policies require immediate attention
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-rose-300 text-rose-900 hover:bg-rose-100"
                  >
                    Review Issues
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
