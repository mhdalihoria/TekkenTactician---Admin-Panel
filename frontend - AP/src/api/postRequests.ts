export const SubmitPost = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  try {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
