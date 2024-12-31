import { CInputField } from "../custom-components/form/CInputField";
import MultiInputField from "../custom-components/form/MultiInputField";
import TextEditor from "../custom-components/form/editor/TextEditor";

const array = [
  {
    startup: "i13",
    move: "b1+2",
  },
  {
    startup: "i12",
    move: "1+2",
  },
];

export default function AddGuide() {
  return (
    <div>
      <h1 style={{ color: "white" }}>single field</h1>
      <CInputField
        name="title"
        label="Title"
        placeholder="Character Title"
        fieldColor="secondary.main"
      />

      <h1 style={{ color: "white" }}>multiple field</h1>
      <MultiInputField fields={array} />

      <h1 style={{ color: "white" }}>Text Editor</h1>
      <TextEditor
        value="<initial_value>"
        onChange={(newContent) => console.log("Content:", newContent)}
      />

    </div>
  );
}
