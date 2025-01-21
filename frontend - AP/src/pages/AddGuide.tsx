import { useState } from "react";
import { nanoid } from "nanoid";
import { CInputField } from "../custom-components/form/CInputField";
import { ActionFunctionArgs, Form } from "react-router-dom";

export default function AddGuide() {
  const [blocks, setBlocks] = useState([
    {
      id: nanoid(),
      type: "block", // Identifies this as a block
      fields: [
        { id: nanoid(), name: "combo", value: "", component: CInputField },
        { id: nanoid(), name: "agent", value: "", component: CInputField },
      ],
    },
    {
      id: nanoid(),
      type: "field", // Identifies this as a field
      value: "",
      name: "agent",
      component: CInputField,
    },
  ]);

  // Add a new block after the current block
  const addBlockAfter = (blockId) => {
    setBlocks((prevBlocks) => {
      const index = prevBlocks.findIndex((block) => block.id === blockId);
      if (index === -1) return prevBlocks;

      const newBlock = {
        id: nanoid(),
        type: "block",
        fields: prevBlocks[index].fields.map((field) => ({
          ...field,
          id: nanoid(),
          value: "",
        })),
      };

      const newBlocks = [...prevBlocks];
      newBlocks.splice(index + 1, 0, newBlock);
      return newBlocks;
    });
  };

  // Add a new field to a block (or as standalone if it's a standalone field)
  const addFieldAfter = (id, isBlock) => {
    setBlocks((prevBlocks) => {
      if (isBlock) {
        // Add a new field to the block
        return prevBlocks.map((block) => {
          if (block.id === id && block.type === "block") {
            return {
              ...block,
              fields: [
                ...block.fields,
                { id: nanoid(), name: `new_field_${block.fields.length + 1}`, value: "", component: CInputField },
              ],
            };
          }
          return block;
        });
      } else {
        // Add a new standalone field to the blocks array
        return [
          ...prevBlocks,
          {
            id: nanoid(),
            type: "field", // New standalone field
            value: "",
            name: `new_field_${prevBlocks.length + 1}`,
            component: CInputField,
          },
        ];
      }
    });
  };

  const handleFieldChange = (id, newValue) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id
          ? { ...block, value: newValue }
          : block
      )
    );
  };

  return (
    <div>
      <Form method="post">
        {blocks.map((block, index) => {
          if (block.type === "block") {
            return (
              <div key={block.id} style={{ marginBottom: "2rem" }}>
                <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
                  {block.fields.map((field) => (
                    <div key={field.id} style={{ marginBottom: "1rem" }}>
                      <field.component
                        name={field.name}
                        label={field.name}
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFieldAfter(block.id, true)}
                    style={{ marginTop: "1rem" }}
                  >
                    Add Field to Block
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
            );
          } else if (block.type === "field") {
            return (
              <div key={block.id} style={{ marginBottom: "1rem" }}>
                <block.component
                  name={block.name}
                  label={block.name}
                  value={block.value}
                  onChange={(e) => handleFieldChange(block.id, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => addFieldAfter(block.id, false)}
                  style={{ marginTop: "1rem" }}
                >
                  Add Standalone Field
                </button>
              </div>
            );
          }
          return null;
        })}
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
