import { type LoaderFunctionArgs } from "react-router-dom"

export async function policiesLoader(_args: LoaderFunctionArgs) {
  return { title: "Policies" }
}

export function PoliciesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Policies</h1>
      <p className="text-muted-foreground">
        Manage insurance policies here.
      </p>
    </div>
  )
}
