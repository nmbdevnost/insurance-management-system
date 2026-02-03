import { router } from "@/routes";
import { RouterProvider } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
