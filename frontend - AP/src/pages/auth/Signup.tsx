import { CButton } from "../../custom-components/CButton";
import {
  ActionFunctionArgs,
  Form,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { RegisterUser } from "../../api/auth/postRequests";
import { CInputField } from "../../custom-components/CInputField";
import { Alert, Box } from "@mui/material";
import FlexBox from "../../custom-components/flex-box/FlexBox";
import { styled } from "@mui/system";
import { ActionData } from "../../types";
import { useEffect, useState } from "react";

const InputFieldsContainer = styled(Box)(({ theme }) => ({
  marginBottom: "55px",

  ".input-field": {
    width: "100%",
    marginBottom: "2rem",
  },
}));

const RedirectBox = styled(Box)(({ theme }) => ({
  color: "#fff",
  marginTop: "1.5em",
  fontSize: ".8rem",

  span: {
    color: theme.palette.accent.main,
    "text-decoration": " underline",
    marginLeft: ".3em",
    fontWeight: 700,
  },
}));

const AlertStyled = styled(Alert)(({ theme }) => ({
  position: "fixed",
  bottom: "1.5rem",
  right: "1.5rem",
}));

export default function Signup() {
  const actionData = useActionData() as ActionData | undefined;
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof actionData !== "undefined") {
      setShowAlert(true);
      if (actionData.success) {
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } else {
      setShowAlert(false);
    }
  }, [actionData]);

  return (
    <>
      <Box style={{ maxWidth: "650px", margin: "4rem", marginTop: "0" }}>
        <Form method="post" action="/signup">
          <FlexBox justifyContent={"center"} flexDirection={"column"}>
            <InputFieldsContainer>
              <CInputField
                name="username"
                label="Username"
                fieldColor="accent.light"
                className="input-field"
                required
              />
              <CInputField
                name="email"
                label="Email"
                type="email"
                fieldColor="accent.light"
                className="input-field"
                required
              />
              <CInputField
                name="password"
                label="Password"
                type="password"
                fieldColor="accent.light"
                className="input-field"
                required
              />
            </InputFieldsContainer>

            <CButton color="primary" btnSize="md" type="submit">
              Signup
            </CButton>
          </FlexBox>
        </Form>
        <RedirectBox>
          Already have an account?
          <span onClick={() => navigate("/login")}>Login</span>
        </RedirectBox>
      </Box>
      {showAlert && (
        <AlertStyled
          severity={actionData?.success ? "success" : "error"}
          onClose={() => {
            setShowAlert(false);
          }}
        >
          {actionData?.message}
        </AlertStyled>
      )}
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await RegisterUser({ username, email, password });
  return result;
};
