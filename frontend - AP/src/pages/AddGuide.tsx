import { useState } from "react";
import { nanoid } from "nanoid";
import { CInputField } from "../custom-components/form/CInputField";
import { ActionFunctionArgs, Form } from "react-router-dom";

export default function AddGuide() {
  const [blocks, setBlocks] = useState([
    {
      id: nanoid(),
      type: "block",
      fields: [
        { id: nanoid(), name: "combo", value: "", component: CInputField },
        { id: nanoid(), name: "agent", value: "", component: CInputField },
      ],
    },
    {
      id: nanoid(),
      type: "field",
      value: "",
      name: "agent",
      component: CInputField,
    },
  ]);

  const [importantCombos, setImportantCombos] = useState([
    {
      id: nanoid(),
      launchers: [{ id: nanoid(), value: "" }],
      followUps: [{ id: nanoid(), value: "" }],
      followUpSimple: [{ id: nanoid(), value: "" }],
    },
  ]);

  const addFieldToNestedBlock = (comboId, blockName) => {
    setImportantCombos((prevCombos) =>
      prevCombos.map((combo) =>
        combo.id === comboId
          ? {
              ...combo,
              [blockName]: [
                ...combo[blockName],
                { id: nanoid(), value: "" },
              ],
            }
          : combo
      )
    );
  };

  const updateNestedField = (comboId, blockName, fieldId, newValue) => {
    setImportantCombos((prevCombos) =>
      prevCombos.map((combo) =>
        combo.id === comboId
          ? {
              ...combo,
              [blockName]: combo[blockName].map((field) =>
                field.id === fieldId ? { ...field, value: newValue } : field
              ),
            }
          : combo
      )
    );
  };

  const addParentCombo = () => {
    setImportantCombos((prevCombos) => [
      ...prevCombos,
      {
        id: nanoid(),
        launchers: [{ id: nanoid(), value: "" }],
        followUps: [{ id: nanoid(), value: "" }],
        followUpSimple: [{ id: nanoid(), value: "" }],
      },
    ]);
  };

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

  const addFieldAfter = (id, isBlock) => {
    setBlocks((prevBlocks) => {
      if (isBlock) {
        return prevBlocks.map((block) => {
          if (block.id === id && block.type === "block") {
            return {
              ...block,
              fields: [
                ...block.fields,
                {
                  id: nanoid(),
                  name: `${block.fields[0].name}-${block.fields.length + 1}`,
                  value: "",
                },
              ],
            };
          }
          return block;
        });
      } else {
        return [
          ...prevBlocks,
          {
            id: nanoid(),
            type: "field",
            value: "",
            name: `agent-${prevBlocks.length}`,
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
          return {
            ...block,
            fields: block.fields.map((field) =>
              field.id === fieldId ? { ...field, value: newValue } : field
            ),
          };
        } else if (block.type === "field" && block.id === blockId) {
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
                        label={field.name}
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
                  label={block.name}
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

        {importantCombos.map((combo) => (
          <div
            key={combo.id}
            style={{
              marginBottom: "2rem",
              border: "1px solid #ccc",
              padding: "1rem",
            }}
          >
            <h3>Parent Block:</h3>
            {["launchers", "followUps", "followUpSimple"].map((blockName) => (
              <div key={blockName} style={{ marginBottom: "1rem" }}>
                <h4>{blockName}</h4>
                {combo[blockName].map((field) => (
                  <div key={field.id} style={{ marginBottom: "0.5rem" }}>
                    <CInputField
                      name={`${blockName}-${field.id}`}
                      value={field.value}
                      label={`${blockName} Field`}
                      onChange={(e) =>
                        updateNestedField(
                          combo.id,
                          blockName,
                          field.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addFieldToNestedBlock(combo.id, blockName)}
                >
                  Add to {blockName}
                </button>
              </div>
            ))}
            <button type="button" onClick={addParentCombo}>
              Add Parent Combo
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
