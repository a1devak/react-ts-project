import { Box } from "@cloudscape-design/components";
import KPIDataLoader from "./Components/CloudscapeTable/KPIDataLoader";

export default function App() {
  const props = {
    kpiEntityId: 'kpiId',
    kpiEntityName: 'kpiEntityName',
    pcfContext: '',
  };

  return (
    <Box>
      <KPIDataLoader kpiEntityId={props.kpiEntityId} kpiEntityName={props.kpiEntityName} pcfContext={props.pcfContext} itemsPerPage={10}></KPIDataLoader>
    </Box>
  );
}
