import { TextField } from "@mui/material";
import { CButton } from "../../custom-components/CButton";

export default function Signup() {
  return (
    <div>
      <TextField name="username" label="Username" variant="outlined" />
      <TextField name="email" label="Email" type="email" variant="outlined" />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
      />

      <CButton
        color="secondary"
        btnSize="md"
        onClick={() => console.log("it works")}
      >
        Signup
      </CButton>
    </div>
  );
}
