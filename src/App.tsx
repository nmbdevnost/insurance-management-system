import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import routes from "./routes";

const router = createBrowserRouter(routes);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
