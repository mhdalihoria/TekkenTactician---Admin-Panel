import React from "react";
import { create } from "zustand";
import { CInputField } from "../custom-components/form/CInputField";
import guideSchema from "../guideSchema";
import MultiInputField from "../custom-components/form/MultiInputField";

// Zustand Store
export const renderSchema = (schema, path = "") => {
  return Object.entries(schema).map(([key, value]) => {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof value === "string" || typeof value === "number") {
      // Render single string or number as input field
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
                ? renderSchema(item, `${currentPath}[${index}]`) // Render nested objects
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
              const firstItem = value[0] || "";
              const template = deepClone(firstItem); // Ensure deep clone
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
          <button
            onClick={() => {
              const template = deepClone(value); // Deep clone to duplicate structure
              useSchemaStore.getState().addToArray(currentPath, template);
            }}
          >
            Add {key}
          </button>
        </div>
      );
    }

    return null; // For unexpected types
  });
};

// Utility function to deep clone objects
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// Zustand Store
export const useSchemaStore = create((set) => ({
  schema: { ...guideSchema },
  
  addToArray: (path, template) => 
    set((state) => {
      const keys = path.split(".");
      const lastKey = keys.pop();
      const target = keys.reduce((obj, key) => obj[key], state.schema);

      if (Array.isArray(target[lastKey])) {
        const clone = deepClone(template);
        target[lastKey].push(clone);
      } else if (typeof target[lastKey] === "string" || typeof target[lastKey] === "number") {
        target[lastKey] = [target[lastKey], template]; // Convert to array and append
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
