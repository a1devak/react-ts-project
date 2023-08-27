import { Box } from "@cloudscape-design/components";
import CloudscapeTable from "./Components/CloudscapeTable/CloudscapeTable";
import { DynamicColumns } from "./MockData/AllColumns";
import { RowData } from "./MockData/AllItems";

export default function App() {
  return (
    <Box>
      <CloudscapeTable allColumns={DynamicColumns} allItems={RowData}></CloudscapeTable>
    </Box>
  );
}
