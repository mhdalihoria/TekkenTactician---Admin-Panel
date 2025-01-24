import { useState } from "react";
import { nanoid } from "nanoid";
import { CInputField } from "../custom-components/form/CInputField";
import { ActionFunctionArgs, Form } from "react-router-dom";
import TextEditor from "../custom-components/form/editor/TextEditor";

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
      sections: [
        { name: "launchers", fields: [{ id: nanoid(), value: "" }] },
        { name: "followUps", fields: [{ id: nanoid(), value: "" }] },
        { name: "followUpSimple", fields: [{ id: nanoid(), value: "" }] },
        { name: "url", fields: [{ id: nanoid(), value: "" }] },
      ],
    },
  ]);

  const [comboEnders, setComboEnders] = useState([
    {
      id: nanoid(),
      sections: [
        {
          name: "wallbrk",
          fields: [{ id: nanoid(), value: "", category: "wall break" }],
        },
        {
          name: "wallcarry",
          fields: [{ id: nanoid(), value: "", category: "wall carry" }],
        },
        {
          name: "dmg",
          fields: [{ id: nanoid(), value: "", category: "for dmg" }],
        },
        {
          name: "flrbrk",
          fields: [{ id: nanoid(), value: "", category: "floor break" }],
        },
      ],
    },
  ]);

  const [chainThrows, setChainThrows] = useState([
    {
      id: nanoid(),
      type: "block",
      fields: [
        {
          id: nanoid(),
          name: "name",
          type: "input-field",
          value: "",
          component: CInputField,
        },
        {
          id: nanoid(),
          name: "throw",
          type: "text-editor",
          value: "",
          component: TextEditor,
        },
      ],
    },
  ]);

  
  const addFieldToSection = (comboId, sectionName, stateSetter) => {
    stateSetter((prevCombos) =>
      prevCombos.map((combo) =>
        combo.id === comboId
          ? {
              ...combo,
              sections: combo.sections.map((section) =>
                section.name === sectionName
                  ? {
                      ...section,
                      fields: [...section.fields, { id: nanoid(), value: "" }],
                    }
                  : section
              ),
            }
          : combo
      )
    );
  };

  const updateField = (
    comboId,
    sectionName,
    fieldId,
    newValue,
    stateSetter
  ) => {
    stateSetter((prevCombos) =>
      prevCombos.map((combo) =>
        combo.id === comboId
          ? {
              ...combo,
              sections: combo.sections.map((section) =>
                section.name === sectionName
                  ? {
                      ...section,
                      fields: section.fields.map((field) =>
                        field.id === fieldId
                          ? { ...field, value: newValue }
                          : field
                      ),
                    }
                  : section
              ),
            }
          : combo
      )
    );
  };
  const addParentCombo = (stateSetter, initialSections) => {
    stateSetter((prevCombos) => [
      ...prevCombos,
      {
        id: nanoid(),
        sections: initialSections.map((sectionName) => ({
          name: sectionName,
          fields: [{ id: nanoid(), value: "" }],
        })),
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
      prevBlocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              fields: block.fields.map((field) => {
                return field.id === fieldId
                  ? { ...field, value: newValue } // Update only the target field's value
                  : field;
              }),
            }
          : block
      )
    );
  };

  return (
    <div>
      <Form method="post" encType="application/json">
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
        {importantCombos.map((combo) => (
          <div
            key={combo.id}
            style={{
              marginBottom: "2rem",
              border: "1px solid #ccc",
              padding: "1rem",
            }}
          >
            {combo.sections.map((section) => (
              <div key={section.name} style={{ marginBottom: "1rem" }}>
                <h4>{section.name}</h4>
                {section.fields.map((field) => (
                  <div key={field.id} style={{ marginBottom: "0.5rem" }}>
                    <CInputField
                      name={`${section.name}-${field.id}`}
                      value={field.value}
                      label={`${section.name} Field`}
                      onChange={(e) =>
                        updateField(
                          combo.id,
                          section.name,
                          field.id,
                          e.target.value,
                          setImportantCombos
                        )
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addFieldToSection(
                      combo.id,
                      section.name,
                      setImportantCombos
                    )
                  }
                >
                  Add to {section.name}
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addParentCombo(setImportantCombos, [
                  "wallbrk",
                  "wallcarry",
                  "dmg",
                  "flrbrk",
                ])
              }
            >
              Add Parent Combo
            </button>
          </div>
        ))}
        {/* combo enders */}
        <h1>Combos Enders:</h1>
        {comboEnders.map((combo) => (
          <div
            key={combo.id}
            style={{
              marginBottom: "2rem",
              border: "1px solid #ccc",
              padding: "1rem",
            }}
          >
            {combo.sections.map((section) => (
              <div key={section.name} style={{ marginBottom: "1rem" }}>
                <h4>{section.name}</h4>
                {section.fields.map((field) => (
                  <div key={field.id} style={{ marginBottom: "0.5rem" }}>
                    <CInputField
                      name={`${section.name}-${field.id}`}
                      value={field.value}
                      label={`${section.name} Field`}
                      onChange={(e) =>
                        updateField(
                          combo.id,
                          section.name,
                          field.id,
                          e.target.value,
                          setComboEnders
                        )
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addFieldToSection(combo.id, section.name, setComboEnders)
                  }
                >
                  Add to {section.name}
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addParentCombo(setComboEnders, [
                  "wallbrk",
                  "wallcarry",
                  "dmg",
                  "flrbrk",
                ])
              }
            >
              Add Parent Combo
            </button>
          </div>
        ))}
        <h1>Chain Throws</h1>
        {chainThrows.map((block) => (
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
                        field.type === "input-field" ? e.target.value : e,
                        setChainThrows
                      )
                    }
                  />
                </div>
              ))}
              <textarea
                name="throw"
                value={chainThrows[0].fields[1].value}
                style={{ display: "none" }}
                readOnly
              />
            </div>
            <button
              type="button"
              onClick={() => addBlockAfter(block.id, setChainThrows)}
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
