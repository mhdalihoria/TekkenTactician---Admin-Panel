import { useLoaderData } from "react-router-dom";

export default function CharGuide() {
  const loaderData = useLoaderData();
  console.log(loaderData)
  return <div>CharGuide</div>;
}
