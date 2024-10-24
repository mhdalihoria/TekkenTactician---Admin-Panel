import {
  ActionFunctionArgs,
  Form,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { LoginUser } from "../../api/auth/postRequests";
import FlexBox from "../../custom-components/flex-box/FlexBox";
import { Alert, Box, styled } from "@mui/material";
import { CInputField } from "../../custom-components/CInputField";
import { CButton } from "../../custom-components/CButton";
import { useEffect, useState } from "react";

export type ActionData = {
  success: string;
  message: string;
  token?: string;
};

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

export default function Login() {
  const actionData = useActionData() as ActionData | undefined;
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData) {
      setShowAlert(true);

      if (actionData.token && actionData.success) {
        localStorage.setItem("token", actionData.token);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } else {
      setShowAlert(false);
    }
  }, [actionData, navigate]);
  return (
    <>
      <Box style={{ maxWidth: "650px", margin: "4rem", marginTop: "0" }}>
        <Form method="post" action="/login">
          <FlexBox justifyContent={"center"} flexDirection={"column"}>
            <InputFieldsContainer>
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
              Login
            </CButton>
          </FlexBox>
        </Form>
        <RedirectBox>
          No Account?
          <span onClick={() => navigate("/signup")}>Signup</span>
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
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const result = await LoginUser({ email, password });

  return result;
};
