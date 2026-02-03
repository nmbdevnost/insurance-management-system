import { type LoaderFunctionArgs } from "react-router-dom"

export async function usersLoader(_args: LoaderFunctionArgs) {
  return { title: "Users" }
}

export function UsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
      <p className="text-muted-foreground">
        Manage user accounts.
      </p>
    </div>
  )
}
