import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import LoginLayout from "./layouts/LoginLayout";
import Login from "./pages/auth/Login";
import { action as LoginAction } from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { action as SignupAction } from "./pages/auth/Signup";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<LoginLayout />}>
        <Route path="login" element={<Login />} action={LoginAction} />
        <Route path="signup" element={<Signup />} action={SignupAction} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
