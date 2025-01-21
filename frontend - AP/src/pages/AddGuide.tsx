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
            const nextFieldName = (block.fields.length + 1).toString(); // Increment number for field name
            return {
              ...block,
              fields: [
                ...block.fields,
                {
                  id: nanoid(),
                  name: `${block.fields[0].name}-${nextFieldName}`, // Append the incremented number
                  value: "",
                },
              ],
            };
          }
          return block;
        });
      } else {
        // Add a new standalone field to the blocks array
        const nextFieldName = (prevBlocks.length).toString(); // Increment number for standalone field name
        return [
          ...prevBlocks,
          {
            id: nanoid(),
            type: "field", // New standalone field
            value: "",
            name: `agent-${nextFieldName}`,
            component: CInputField,
          },
        ];
      }
    });
  };

  const handleFieldChange = (blockId, fieldId, newValue) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.type === "block" && block.id === blockId) {
          // Update the specific field inside the block
          return {
            ...block,
            fields: block.fields.map((field) =>
              field.id === fieldId ? { ...field, value: newValue } : field
            ),
          };
        } else if (block.type === "field" && block.id === blockId) {
          // Update the standalone field directly
          return { ...block, value: newValue };
        }
        return block;
      })
    );
  };

  return (
    <div>
      <Form method="post">
        {blocks.map((block) => {
          if (block.type === "block") {
            return (
              <div key={block.id} style={{ marginBottom: "2rem" }}>
                <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
                  {block.fields.map((field) => (
                    <div key={field.id} style={{ marginBottom: "1rem" }}>
                      <field.component
                        name={field.name}
                        label={field.name} // Label stays the same
                        value={field.value}
                        onChange={(e) =>
                          handleFieldChange(block.id, field.id, e.target.value)
                        }
                      />
                    </div>
                  ))}
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
                  label={block.name} // Label stays the same
                  value={block.value}
                  onChange={(e) =>
                    handleFieldChange(block.id, block.id, e.target.value)
                  }
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
