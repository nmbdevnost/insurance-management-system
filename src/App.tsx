import { ThemeProvider } from "next-themes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import routes from "./routes";
import { Toaster } from "./shared/components/ui/sonner";

const router = createBrowserRouter(routes);

export function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster richColors closeButton />
    </ThemeProvider>
  );
}

export default App;
