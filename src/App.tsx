import { RiCheckLine, RiCloseLine, RiInfoI } from "@remixicon/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import routes from "./routes";
import { Toaster } from "./shared/components/ui/sonner";
import { queryClient } from "./shared/lib/query-client";
import Spinner from "./shared/components/ui/spinner";

const router = createBrowserRouter(routes);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          closeButton
          icons={{
            success: (
              <span className="bg-success flex size-5 items-center justify-center rounded-full p-0.5 text-white">
                <RiCheckLine />
              </span>
            ),
            error: (
              <span className="bg-destructive flex size-5 items-center justify-end rounded-full p-0.5 text-white">
                <RiCloseLine />
              </span>
            ),
            info: (
              <span className="flex size-5 items-center justify-center rounded-full bg-sky-500 p-0.5 text-white">
                <RiInfoI />
              </span>
            ),
            warning: (
              <span className="bg-warning flex size-5 items-center justify-center rounded-full p-0.5 text-white">
                !
              </span>
            ),
            loading: <Spinner className="text-primary size-5" />,
          }}
        />
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
    </QueryClientProvider>
  );
}

export default App;
