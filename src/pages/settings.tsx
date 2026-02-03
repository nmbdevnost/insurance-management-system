import { type LoaderFunctionArgs } from "react-router-dom"

export async function settingsLoader(_args: LoaderFunctionArgs) {
  return { title: "Settings" }
}

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="text-muted-foreground">
        Application and account settings.
      </p>
    </div>
  )
}
