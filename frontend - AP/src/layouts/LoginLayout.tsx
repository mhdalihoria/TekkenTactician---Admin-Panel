import { Outlet } from "react-router-dom";

const styles = {
  background: "lightblue",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function LoginLayout() {
  return (
    <div style={styles}>
      <Outlet />
    </div>
  );
}
