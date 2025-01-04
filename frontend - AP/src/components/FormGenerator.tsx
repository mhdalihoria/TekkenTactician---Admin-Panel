import React from "react";
import { create } from "zustand";
import { CInputField } from "../custom-components/form/CInputField";
import guideSchema from "../guideSchema";
import MultiInputField from "../custom-components/form/MultiInputField";

// Zustand Store
// Zustand Store
export const useSchemaStore = create((set) => ({
  schema: { ...guideSchema },
  
  addToArray: (path, template) => 
    set((state) => {
      const keys = path.split(".");
      const lastKey = keys.pop();
      const target = keys.reduce((obj, key) => obj[key], state.schema);

      if (Array.isArray(target[lastKey])) {
        const clone = (item) => JSON.parse(JSON.stringify(item)); // Deep clone
        const sanitizedTemplate = clone(template);

        target[lastKey].push(sanitizedTemplate);
      }

      return { schema: { ...state.schema } };
    }),

  updateField: (path, value) => 
    set((state) => {
      const keys = path.split(".");
      const lastKey = keys.pop();
      const target = keys.reduce((obj, key) => obj[key], state.schema);

      target[lastKey] = value;
      return { schema: { ...state.schema } };
    }),
}));

// Dynamic Form Renderer
export const renderSchema = (schema, path = "") => {
  return Object.entries(schema).map(([key, value]) => {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof value === "string" || typeof value === "number") {
      // Render primitive fields
      return (
        <CInputField
          key={currentPath}
          label={key}
          value={value}
          onChange={(newValue) =>
            useSchemaStore.getState().updateField(currentPath, newValue)
          }
        />
      );
    }

    if (Array.isArray(value)) {
      // Handle arrays of objects or primitives
      return (
        <div key={currentPath}>
          <h4>{key}</h4>
          {value.map((item, index) => (
            <div key={`${currentPath}[${index}]`} style={{ marginLeft: "20px" }}>
              <h5>{`${key} ${index + 1}`}</h5>
              {typeof item === "object"
                ? renderSchema(item, `${currentPath}[${index}]`) // Nested objects
                : (
                  <CInputField
                    key={`${currentPath}[${index}]`}
                    label={`${key} ${index + 1}`}
                    value={item}
                    onChange={(newValue) =>
                      useSchemaStore.getState().updateField(`${currentPath}[${index}]`, newValue)
                    }
                  />
                )}
            </div>
          ))}
          <button
            onClick={() => {
              const firstItem = value[0] || {};
              const template = JSON.parse(JSON.stringify(firstItem));
              useSchemaStore.getState().addToArray(currentPath, template);
            }}
          >
            Add {key}
          </button>
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      // Handle nested objects
      return (
        <div key={currentPath} style={{ marginLeft: "20px" }}>
          <h4>{key}</h4>
          {renderSchema(value, currentPath)}
        </div>
      );
    }

    return null; // For unexpected types
  });
};
