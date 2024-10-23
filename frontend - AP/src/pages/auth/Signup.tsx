import { CButton } from "../../custom-components/CButton";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { RegisterUser } from "../../api/auth/postRequests";
import { CInputField } from "../../custom-components/CInputField";

export default function Signup() {
  return (
    <Form method="post" action="/signup">
      <CInputField name="username" label="Username" />
      <CInputField name="email" label="Email" type="email" />
      <CInputField
        name="password"
        label="Password"
        type="password"
      />

      <CButton color="primary" btnSize="md" type="submit">
        Signup
      </CButton>
    </Form>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await RegisterUser({ username, email, password });

  if (result.success) {
    console.log(result);
    return redirect(`/`);
  } else {
    console.log(result);
    return null;
  }
};
