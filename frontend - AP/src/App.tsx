import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import LoginLayout from "./layouts/LoginLayout";
import Signup from "./pages/Signup";
import { action as LoginAction } from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LoginLayout />}>
      <Route path="login" element={<Login />} action={LoginAction} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
