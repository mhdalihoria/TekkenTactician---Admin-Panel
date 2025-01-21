import { useState } from "react";
import { nanoid } from "nanoid";
import { ActionFunctionArgs, Form } from "react-router-dom";
import { CInputField } from "../custom-components/form/CInputField";
import TextEditor from "../custom-components/form/editor/TextEditor";


export default function AddGuide() {
  const [fields, setFields] = useState([
    { id: nanoid(), value: "", name: "combo", component: CInputField },
    { id: nanoid(), value: "", name: "agent",  component: CInputField },
  ]);
  
  const addFieldAfter = (id, component = CInputField) => {
    setFields((prevFields) => {
      const index = prevFields.findIndex((field) => field.id === id);
      if (index === -1) return prevFields;
  
      const newId = nanoid();
      const newFields = [...prevFields];
      const previousFieldName = prevFields[index].name; // Get the name of the previous field
      newFields.splice(index + 1, 0, {
        id: newId,
        value: "",
        name: previousFieldName, // Set the name to match the previous field
        component,
      });
      return newFields;
    });
  };
  

  const handleFieldChange = (id, newValue) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

  return (
    <div>
      <Form method="post">
        {fields.map((field, index) => (
          <div key={field.id} style={{ marginBottom: "1rem" }}>
            {/* Dynamically render the component with a unique name */}
            <field.component
              name={field.name} // Use index or field.id as the name
              label={field.name}
              value={field.value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            <button
              type="button"
              onClick={() => addFieldAfter(field.id, field.component)}
              style={{ marginLeft: "1rem" }}
            >
              Add After
            </button>
          </div>
        ))}
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const entries = Array.from(formData.entries());

  const fields = entries.map(([key, value]) => ({ key, value }));

  console.log("Submitted Fields:", fields);
  return fields;
}
