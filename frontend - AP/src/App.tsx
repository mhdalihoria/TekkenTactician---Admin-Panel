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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<LoginLayout />}>
        <Route path="login" element={<Login />} action={LoginAction} />
        <Route path="signup" element={<Signup />} action={SignupAction} />
      </Route>
      <Route element={<>main app layout</>}>
        <Route path="/" element={<h1>main page</h1>} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
