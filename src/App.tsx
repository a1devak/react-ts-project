import { Box } from "@cloudscape-design/components";
import CloudscapeTable from "./Components/CloudscapeTable/CloudscapeTable";

export default function App() {
  const props = {
    kpiEntityId: 'kpiId',
    kpiEntityName: 'kpiEntityName',
    pcfContext: '',
  };

  return (
    <Box>
      <CloudscapeTable kpiEntityId={props.kpiEntityId} kpiEntityName={props.kpiEntityName} pcfContext={props.pcfContext} itemsPerPage={10}></CloudscapeTable>
    </Box>
  );
}
