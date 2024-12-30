import { CInputField } from "./CInputField";


export default function MultiInputField({
    fields,
  }: {
    fields: Record<string, string>[];
  }) {
    return (
      <div>
        {fields.map((field, index) => (
          <div key={index}>
            {Object.entries(field).map(([key, value]) => (
              <CInputField
                key={key} 
                name={key}
                label={key}
                value={value}
                fieldColor="accent.light"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
