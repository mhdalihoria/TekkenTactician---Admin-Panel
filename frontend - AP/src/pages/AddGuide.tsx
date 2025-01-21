import { useState } from "react";
import { nanoid } from "nanoid";
import { ActionFunctionArgs, Form } from "react-router-dom";
import { CInputField } from "../custom-components/form/CInputField";

export default function AddGuide() {
  const [blocks, setBlocks] = useState([
    {
      id: nanoid(),
      fields: [
        { id: nanoid(), name: "combo", value: "", component: CInputField },
        { id: nanoid(), name: "agent", value: "", component: CInputField },
      ],
    },
  ]);

  const addBlockAfter = (blockId) => {
    setBlocks((prevBlocks) => {
      const index = prevBlocks.findIndex((block) => block.id === blockId);
      if (index === -1) return prevBlocks;

      const newBlock = {
        id: nanoid(),
        fields: prevBlocks[index].fields.map((field) => ({
          ...field,
          id: nanoid(), // New IDs for fields
          value: "", // Reset field values
        })),
      };

      const newBlocks = [...prevBlocks];
      newBlocks.splice(index + 1, 0, newBlock);
      return newBlocks;
    });
  };

  const addFieldToBlock = (blockId) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              fields: [
                ...block.fields,
                {
                  id: nanoid(),
                  name: `new_field_${block.fields.length + 1}`,
                  value: "",
                  component: CInputField,
                },
              ],
            }
          : block
      )
    );
  };

  const handleFieldChange = (blockId, fieldId, newValue) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              fields: block.fields.map((field) =>
                field.id === fieldId ? { ...field, value: newValue } : field
              ),
            }
          : block
      )
    );
  };

  return (
    <div>
      <Form method="post">
        {blocks.map((block) => (
          <div key={block.id} style={{ marginBottom: "2rem" }}>
            <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
              {block.fields.map((field) => (
                <div key={field.id} style={{ marginBottom: "1rem" }}>
                  <field.component
                    name={field.name}
                    label={field.name}
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(block.id, field.id, e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addFieldToBlock(block.id)}
                style={{ marginTop: "1rem" }}
              >
                Add Field
              </button>
            </div>
            <button
              type="button"
              onClick={() => addBlockAfter(block.id)}
              style={{ marginTop: "1rem" }}
            >
              Add Block After
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
