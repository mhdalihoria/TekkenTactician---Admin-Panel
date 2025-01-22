import { useState } from "react";
import { nanoid } from "nanoid";
import { CInputField } from "../custom-components/form/CInputField";
import { ActionFunctionArgs, Form } from "react-router-dom";

export default function AddGuide() {
  const [intro, setIntro] = useState([
    {
      id: nanoid(),
      type: "block",
      fields: [
        { id: nanoid(), name: "name", value: "", component: CInputField },
        { id: nanoid(), name: "image", value: "", component: CInputField },
      ],
    },
  ]);
  const [heatENGR, setHeatENGR] = useState([
    {
      id: nanoid(),
      type: "block",
      fields: [
        { id: nanoid(), name: "move", value: "", component: CInputField },
        {
          id: nanoid(),
          name: "description",
          value: "",
          component: CInputField,
        },
      ],
    },
  ]);

  const [punishers, setPunishers] = useState([
    {
      id: nanoid(),
      type: "block",
      fields: [
        { id: nanoid(), name: "move", value: "", component: CInputField },
        { id: nanoid(), name: "frames", value: "", component: CInputField },
      ],
    },
  ]);

  const [guaranteedflwups, setGuaranteedflwups] = useState([
    {
      id: nanoid(),
      type: "block",
      fields: [
        { id: nanoid(), name: "move", value: "", component: CInputField },
        { id: nanoid(), name: "frames", value: "", component: CInputField },
      ],
    },
  ]);

  const [importantCombos, setImportantCombos] = useState([
    {
      id: nanoid(),
      launchers: [{ id: nanoid(), value: "" }],
      followUps: [{ id: nanoid(), value: "" }],
      followUpSimple: [{ id: nanoid(), value: "" }],
      url: [{ id: nanoid(), value: "" }],
    },
  ]);

  const [comboEnders, setComboenders] = useState([
    {
      id: nanoid(),
      wallbrk: [{ id: nanoid(), value: "", category: "wall break" }],
      wallcarry: [{ id: nanoid(), value: "", category: "wall carry" }],
      dmg: [{ id: nanoid(), value: "", category: "for dmg" }],
      flrbrk: [{ id: nanoid(), value: "", category: "floor break" }],
    },
  ]);

  const addFieldToNestedBlock = (comboId, blockName, stateSetter) => {
    stateSetter((prevCombos) =>
      prevCombos.map((combo) =>
        combo.id === comboId
          ? {
              ...combo,
              [blockName]: [...combo[blockName], { id: nanoid(), value: "" }],
            }
          : combo
      )
    );
  };

  const updateNestedField = (
    comboId,
    blockName,
    fieldId,
    newValue,
    stateSetter
  ) => {
    stateSetter((prevCombos) =>
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

  const addParentCombo = (stateSetter) => {
    stateSetter((prevCombos) => [
      ...prevCombos,
      {
        id: nanoid(),
        launchers: [{ id: nanoid(), value: "" }],
        followUps: [{ id: nanoid(), value: "" }],
        followUpSimple: [{ id: nanoid(), value: "" }],
      },
    ]);
  };

  const addBlockAfter = (blockId, stateSetter) => {
    stateSetter((prevBlocks) => {
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

  const addFieldAfter = (id, isBlock, stateSetter) => {
    stateSetter((prevBlocks) => {
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

  const handleFieldChange = (blockId, fieldId, newValue, stateSetter) => {
    stateSetter((prevBlocks) =>
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
        {/* char intro */}
        {intro.map((block) => {
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
                          handleFieldChange(
                            block.id,
                            field.id,
                            e.target.value,
                            setIntro
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
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
        {/* heat engagers */}
        <h1>Heat Engagers</h1>
        {heatENGR.map((block) => {
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
                          handleFieldChange(
                            block.id,
                            field.id,
                            e.target.value,
                            setHeatENGR
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addBlockAfter(block.id, setHeatENGR)}
                  style={{ marginTop: "1rem" }}
                >
                  Add Heat Engager
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
        {/* punishers */}
        <h1>Punishers</h1>
        {punishers.map((block) => {
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
                          handleFieldChange(
                            block.id,
                            field.id,
                            e.target.value,
                            setPunishers
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addBlockAfter(block.id, setPunishers)}
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
                    handleFieldChange(
                      block.id,
                      block.id,
                      e.target.value,
                      setPunishers
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => addFieldAfter(block.id, false)}
                  style={{ marginTop: "1rem" }}
                >
                  Add Punishers
                </button>
              </div>
            );
          }
          return null;
        })}
        {/* followups */}
        <h1>Guaranteed Follow-ups</h1>
        {guaranteedflwups.map((block) => {
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
                          handleFieldChange(
                            block.id,
                            field.id,
                            e.target.value,
                            setGuaranteedflwups
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addBlockAfter(block.id, setGuaranteedflwups)}
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
                    handleFieldChange(
                      block.id,
                      block.id,
                      e.target.value,
                      setGuaranteedflwups
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => addFieldAfter(block.id, false)}
                  style={{ marginTop: "1rem" }}
                >
                  Add Punishers
                </button>
              </div>
            );
          }
          return null;
        })}
        {/* combos */}
        <h1>Combos:</h1>
        {importantCombos.map((combo, index) => (
          <div
            key={combo.id}
            style={{
              marginBottom: "2rem",
              border: "1px solid #ccc",
              padding: "1rem",
            }}
          >
            <h3>Combo - {index + 1}</h3>
            {["launchers", "followUps", "followUpSimple", "url"].map(
              (blockName) => (
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
                            setImportantCombos,
                            combo.id,
                            blockName,
                            field.id,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                  {blockName !== "url" && (
                    <button
                      type="button"
                      onClick={() =>
                        addFieldToNestedBlock(
                          combo.id,
                          blockName,
                          setImportantCombos
                        )
                      }
                    >
                      Add to {blockName}
                    </button>
                  )}
                </div>
              )
            )}
            <button
              type="button"
              onClick={() => addParentCombo(setImportantCombos)}
            >
              Add Parent Combo
            </button>
          </div>
        ))}
        {/* combo enders */}

        <h1>Combos Enders:</h1>
        {comboEnders.map((combo, index) => (
          <div
            key={combo.id}
            style={{
              marginBottom: "2rem",
              border: "1px solid #ccc",
              padding: "1rem",
            }}
          >
            {["wallbrk", "wallcarry", "dmg", "flrbrk"].map((blockName) => (
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
                          setComboenders,
                          combo.id,
                          blockName,
                          field.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
                {blockName !== "url" && (
                  <button
                    type="button"
                    onClick={() =>
                      addFieldToNestedBlock(combo.id, blockName, setComboenders)
                    }
                  >
                    Add to {blockName}
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addParentCombo(setComboenders)}
            >
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
