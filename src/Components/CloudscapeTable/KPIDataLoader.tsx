import { TableProps } from "@cloudscape-design/components";
import moment from "moment-timezone";
import * as React from "react";
import { useEffect } from "react";
import { RowData } from "../../MockData/AllItems";
import ErrorContainer from "../GenericComponents/ErrorContainer";
import LoadingSpinner from "../GenericComponents/LoadingSpinner";
import { CloudscapeGenericTable } from "./CloudscapeGenericTable";
import { DynamicColumnDetails } from "./CloudscapeInterface";
import { generateColumnDefinitions } from "./CloudscapeTableConfig";
import { DynamicColumns1 } from "../../MockData/AllColumns";

interface KPIDataLoaderProps {
  kpiEntityId: string;
  kpiEntityName: string;
  pcfContext: any;
  itemsPerPage: number;
}
const KPIDataLoader: React.FC<KPIDataLoaderProps> = ({ kpiEntityId, kpiEntityName, pcfContext, itemsPerPage }) => {
  const [dataLoadingStatus, setDataLoadingStatus] = React.useState<"loading" | "error" | "success">("loading");

  const [primaryEntity, setPrimaryEntityName] = React.useState("");
  const [allColumns, setAllColumns] = React.useState<DynamicColumnDetails | undefined>();
  const [allItems, setAllItems] = React.useState<any | undefined>();

  const [tableColumnDefinitions, setTableColumnDefinitions] = React.useState<TableProps.ColumnDefinition<any>[]>([]);

  // generating Table column definitions from allColumns
  useEffect(() => {
    if (allColumns) {
      const columnDefinitions = generateColumnDefinitions(allColumns, pcfContext, primaryEntity);
      console.log("columnDefinitions ", columnDefinitions);
      setTableColumnDefinitions(columnDefinitions);
    }
  }, [allColumns, pcfContext, primaryEntity]);

  useEffect(() => {
    dynamicsHandler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pcfContext]);

  function mockAsyncOperation() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Operation completed");
      }, 1000); // 1000 milliseconds (1 second)
    });
  }

  const dynamicsHandler = async () => {
    setDataLoadingStatus("loading");
    try {
      if (kpiEntityId) {
        mockAsyncOperation().then(
          (results: any) => {
            if (results) {
              setPrimaryEntityName("primaryEntityName");
              setAllColumns(DynamicColumns1);

              mockAsyncOperation().then(
                (results: any) => {
                  if (results) {
                    const parsedData = modifyRowData(RowData, DynamicColumns1);
                    setAllItems(parsedData);
                    setDataLoadingStatus("success");
                  }
                },
                (e: any) => {
                  console.error("An error occurred:", e);
                  setDataLoadingStatus("error");
                }
              );
            }
          },

          (e: any) => {
            console.error("An error occurred:", e);
            setDataLoadingStatus("error");
          }
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setDataLoadingStatus("error");
    } finally {
    }
  };

  function modifyRowData(rowData: any[], allColumns: DynamicColumnDetails): any[] {
    const modifiedData = rowData.map((row) => {
      const modifiedRow = { ...row };

      allColumns.data.forEach((dataEntity) => {
        if (dataEntity.isColumnVisible && dataEntity.fieldName in row) {
          if (dataEntity.metadata.type === "date") {
            const originalDate = row[dataEntity.fieldName];
            if (originalDate) {
              modifiedRow[dataEntity.fieldName] = moment(originalDate);
            }
          }

          if (dataEntity.metadata.type === "dateTime") {
            const originalDate = row[dataEntity.fieldName];
            if (originalDate) {
              modifiedRow[dataEntity.fieldName] = moment(originalDate);
            }
          }

          if (dataEntity.metadata.type === "boolean") {
            const originalData = row[dataEntity.fieldName];
            modifiedRow[dataEntity.fieldName] = originalData ? "Yes" : "No";
          }

          // Add more conditions for other data types if needed
        }
      });

      return modifiedRow;
    });
    return modifiedData;
  }

  return (
    <>
      {dataLoadingStatus === "loading" && <LoadingSpinner />}
      {dataLoadingStatus === "error" && <ErrorContainer />}
      {allColumns && dataLoadingStatus === "success" && (
        <CloudscapeGenericTable tableColumnDefinitions={tableColumnDefinitions} allColumns={allColumns} allItems={allItems || []} itemsPerPage={itemsPerPage} />
      )}
    </>
  );
};

export default KPIDataLoader;
