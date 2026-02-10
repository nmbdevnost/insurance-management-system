import type { Variable } from "@/shared/lib/types/email-templates";
import VariableListItem from "./variable-list-item";

const VariablesList = ({ variables }: { variables: Variable[] }) => {
  return (
    <>
      {variables.map((variable, index) => (
        <VariableListItem
          key={`${variable.key}-${index}`}
          variable={variable}
        />
      ))}
    </>
  );
};

export default VariablesList;
