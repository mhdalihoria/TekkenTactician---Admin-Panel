// import React from "react";
// import { create } from "zustand";
// import { CInputField } from "../custom-components/form/CInputField";
// import MultiInputField from "../custom-components/form/MultiInputField";
// import TextEditor from "../custom-components/form/editor/TextEditor";
// // import { CSelect } from "../custom-components/form/CSelect";
// // import { CCheckbox } from "../custom-components/form/CCheckbox";
// import guideSchema from "../guideSchema";

// // Zustand Store
// export const useSchemaStore = create((set) => ({
//   schema: { ...guideSchema },

//   addToArray: (path, template) =>
//     set((state) => {
//       const keys = path.split(".");
//       const lastKey = keys.pop();
//       const target = keys.reduce((obj, key) => obj[key], state.schema);

//       if (Array.isArray(target[lastKey])) {
//         const sanitizedItem = JSON.parse(JSON.stringify(template));

//         const assignIds = (obj, parentIndex) => {
//           if (Array.isArray(obj)) {
//             return obj.map((item, index) => assignIds(item, index + 1));
//           } else if (typeof obj === "object" && obj !== null) {
//             return { ...obj, id: parentIndex };
//           }
//           return obj;
//         };

//         const newItemWithIds = assignIds(
//           sanitizedItem,
//           target[lastKey].length + 1
//         );
//         target[lastKey].push(newItemWithIds);
//       }

//       return { schema: { ...state.schema } };
//     }),

//   updateField: (path, value) =>
//     set((state) => {
//       const keys = path.split(".");
//       const lastKey = keys.pop();
//       const target = keys.reduce((obj, key) => obj[key], state.schema);

//       target[lastKey] = value;
//       return { schema: { ...state.schema } };
//     }),
// }));

// // Dynamic Form Renderer
// export const renderSchema = (schema, path = "") => {
//   return Object.entries(schema).map(([key, value]) => {
//     const currentPath = path ? `${path}.${key}` : key;

//     if (value.controlType) {
//       switch (value.controlType) {
//         case "input":
//         case "input-field":
//           return (
//             <CInputField
//               key={currentPath}
//               label={value.label || key}
//               placeholder={value.placeholder}
//               value={value.value}
//               onChange={(newValue) =>
//                 useSchemaStore.getState().updateField(currentPath, newValue)
//               }
//             />
//           );

//         case "text-editor":
//           return (
//             <TextEditor
//               key={currentPath}
//               value={value.value}
//               onChange={(newValue) =>
//                 useSchemaStore.getState().updateField(currentPath, newValue)
//               }
//             />
//           );

//         case "multiple-input-fields":
//           return (
//             <CMultipleInputFields
//               key={currentPath}
//               fields={value.fields}
//               values={value.value}
//               onChange={(newValue) =>
//                 useSchemaStore.getState().updateField(currentPath, newValue)
//               }
//             />
//           );

//         case "array":
//           return (
//             <div key={currentPath} style={{ marginLeft: "20px" }}>
//               <h4>{value.label || key}</h4>
//               {value.items.map((item, index) => (
//                 <div
//                   key={`${currentPath}[${index}]`}
//                   style={{
//                     border: "1px solid #ccc",
//                     padding: "10px",
//                     margin: "10px 0",
//                   }}
//                 >
//                   <h5>{`${value.label || key} ${index + 1}`}</h5>
//                   {renderSchema(item, `${currentPath}[${index}]`)}
//                 </div>
//               ))}
//               <button
//                 onClick={() => {
//                   const template = JSON.parse(
//                     JSON.stringify(value.template || {})
//                   );
//                   useSchemaStore
//                     .getState()
//                     .addToArray(currentPath, template);
//                 }}
//               >
//                 Add {value.label || key}
//               </button>
//             </div>
//           );

//         default:
//           console.warn(`Unsupported controlType: ${value.controlType}`);
//           return null;
//       }
//     }

//     if (Array.isArray(value)) {
//       // Handle non-controlType arrays
//       return (
//         <div key={currentPath} style={{ marginLeft: "20px" }}>
//           <h4>{key}</h4>
//           {value.map((item, index) => (
//             <div key={`${currentPath}[${index}]`}>
//               <h5>{`${key} ${index + 1}`}</h5>
//               {renderSchema(item, `${currentPath}[${index}]`)}
//             </div>
//           ))}
//           <button
//             onClick={() => {
//               const firstItem = value[0] || {};
//               const template = JSON.parse(JSON.stringify(firstItem));
//               useSchemaStore.getState().addToArray(currentPath, template);
//             }}
//           >
//             Add {key}
//           </button>
//         </div>
//       );
//     }

//     if (typeof value === "object" && value !== null) {
//       return (
//         <div key={currentPath} style={{ marginLeft: "20px" }}>
//           <h4>{key}</h4>
//           {renderSchema(value, currentPath)}
//         </div>
//       );
//     }

//     return null;
//   });
// };

