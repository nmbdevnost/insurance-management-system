import { type LoaderFunctionArgs } from "react-router-dom"

export async function claimsLoader(_args: LoaderFunctionArgs) {
  return { title: "Claims" }
}

export function ClaimsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Claims</h1>
      <p className="text-muted-foreground">
        View and manage insurance claims.
      </p>
    </div>
  )
}
