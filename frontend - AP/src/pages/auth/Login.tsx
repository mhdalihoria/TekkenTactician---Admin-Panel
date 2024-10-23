import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import { SubmitPost } from "../../api/postRequests";

export default function Login() {
  const navigation = useNavigation();

  return (
    <Form method="post" action="/login">
      <input type="text" name="name" placeholder="name" />
      <input type="text" name="email" placeholder="email" />
      <button type="submit">submit</button>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const result  = await SubmitPost({name, email});
  console.log(result)

  return null
}
