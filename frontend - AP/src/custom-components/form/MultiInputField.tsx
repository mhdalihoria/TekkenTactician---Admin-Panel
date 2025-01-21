import { useSchemaStore } from "../../components/FormGenerator";
import { CInputField } from "./CInputField";

// export default function MultiInputField({
//   fields,
// }: {
//   fields: Record<string, string>[];
// }) {
//   return (
//     <div>
//       {fields.map((field, index) => (
//         <div key={index}>
//           {Object.entries(field).map(([key, value]) => (
//             <CInputField
//               key={key}
//               name={key}
//               label={key}
//               value={value}
//               fieldColor="accent.light"
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }
export default function MultiInputField({
  schema,
  path,
}: {
  schema: Record<string, string>;
  path: string;
}) {
  return (
    <div
      style={{ marginBottom: "16px", border: "1px solid #ccc", padding: "8px" }}
    >
      {Object.entries(schema).map(([key, value]) => (
        <CInputField
          key={`${path}.${key}`}
          name={key}
          label={key}
          value={value || ""} // Default to empty string
          fieldColor="accent.light"
          onChange={(newValue) =>
            useSchemaStore.getState().updateField(`${path}.${key}`, newValue)
          }
        />
      ))}
    </div>
  );
}
