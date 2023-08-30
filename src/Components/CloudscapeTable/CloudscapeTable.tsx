import {
  Box,
  CollectionPreferencesProps,
  Header,
  Pagination,
  PropertyFilter,
  PropertyFilterProps,
  Table,
  TableProps,
} from "@cloudscape-design/components";
import {
  BLANK_SEARCH_AND,
  DEFAULT_PAGE_SIZE_IS_20,
  extractFieldNamesForDefaultVisibleContent,
  generateColumnDefinitions,
  generateFilteringProperties,
  generateVisibleContentOptions,
} from "./CloudscapeTableConfig";
import { DynamicColumnDetails } from "./CloudscapeInterface";
import {
  Preferences,
  TableEmptyState,
  TableNoMatchState,
  getMatchesCountText,
  paginationAriaLabels,
  propertyFilterI18nStrings,
} from "../GenericComponents/Utils";
import { useCollection } from "@cloudscape-design/collection-hooks";
import * as React from "react";
import { useEffect } from "react";
import { DynamicColumns } from "../../MockData/AllColumns";
import { RowData } from "../../MockData/AllItems";

interface CloudscapeTableProps {
  kpiEntityId: string;
  kpiEntityName: string;
  pcfContext: any;
}
const CloudscapeTable: React.FC<CloudscapeTableProps> = ({ kpiEntityId, kpiEntityName, pcfContext }) => {
  const [dataLoading, setDataLoading] = React.useState(false);
  const [dataLoadingStatus, setDataLoadingStatus] = React.useState<"loading" | "error" | "success">("loading");

  const [primaryEntity, setPrimaryEntityName] = React.useState("");
  const [allColumns, setAllColumns] = React.useState<DynamicColumnDetails | undefined>();
  const [allItems, setAllItems] = React.useState<any | undefined>();

  const [tableDefaultPreferences, setTableDefaultPreferences] = React.useState<CollectionPreferencesProps.Preferences>({});

  const [tableColumnDefinitions, setTableColumnDefinitions] = React.useState<TableProps.ColumnDefinition<any>[]>([]);
  const [tableRowData, setTableRowData] = React.useState<any[]>([]);

  const [filteringProperties, setFilteringProperties] = React.useState<PropertyFilterProps.FilteringProperty[]>([]);
  const [query, setQuery] = React.useState(BLANK_SEARCH_AND);

  // generating Table default preferences from allColumns
  useEffect(() => {
    if (allColumns) {
      const defaultPreferences = {
        pageSize: DEFAULT_PAGE_SIZE_IS_20,
        visibleContent: extractFieldNamesForDefaultVisibleContent(allColumns),
        wrapLines: true,
        stripedRows: false,
        custom: false,
      } as CollectionPreferencesProps.Preferences;
      setTableDefaultPreferences(defaultPreferences);
    }
  }, [allColumns]);

  // generating Table column definitions from allColumns
  useEffect(() => {
    if (allColumns) {
      const columnDefinitions = generateColumnDefinitions(allColumns, pcfContext, primaryEntity);
      console.log("columnDefinitions ", columnDefinitions);
      setTableColumnDefinitions(columnDefinitions);
    }
  }, [allColumns, pcfContext, primaryEntity]);

  // generating filtering properties from allColumns
  useEffect(() => {
    if (allColumns) {
      const properties = generateFilteringProperties(allColumns);
      setFilteringProperties(properties);
    }
  }, [allColumns]);

  // generating Table row data from allItems
  useEffect(() => {
    setTableRowData(allItems || []);
  }, [allItems]);

  useEffect(() => {
    dynamicsHandler();
  }, [pcfContext]);

  function mockAsyncOperation() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Operation completed");
      }, 1000); // 1000 milliseconds (1 second)
    });
  }


  function findFieldName(rowData: any[], allColumns: DynamicColumnDetails): string | null {
    for (const dataEntity of allColumns.data) {
      if (dataEntity.fieldName in rowData) {
        console.log("dataEntity.fieldName ", dataEntity.fieldName);
        
        return dataEntity.fieldName;
      }
    }
    return null; // Field name not found in visible columns
  }

  const dynamicsHandler = async () => {
    setDataLoading(true);

    try {
      if (kpiEntityId) {
        var fetchData = {
          cb_kpimasterdataid: kpiEntityId,
        };
        console.log("fetchData.cb_kpimasterdataid", fetchData.cb_kpimasterdataid);

        mockAsyncOperation().then(
          (results: any) => {
            if (results) {
              setPrimaryEntityName("primaryEntityName");
              setAllColumns(DynamicColumns);

              mockAsyncOperation().then(
                (results: any) => {
                  if (results) {
                    const parsedData = RowData.map((row) => {
                      return {
                        ...row,
                      }
                    });
                    findFieldName(RowData, DynamicColumns);
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
      setDataLoading(false);
    }
  };

  const getPrimaryEntityNameFromFetchXml = (fetchXml: string): string => {
    let primaryEntityName: string = "";
    // @ts-ignore
    let filter = fetchXml.matchAll(/<entity name='(.*?)'>/g).next();
    if (filter && filter.value && filter.value[1]) {
      primaryEntityName = filter.value[1];
    }
    return primaryEntityName;
  };

  const { items, actions, filteredItemsCount, collectionProps, paginationProps, propertyFilterProps } = useCollection(tableRowData, {
    propertyFiltering: {
      filteringProperties,
      empty: <TableEmptyState resourceName="No results" />,
      noMatch: (
        <TableNoMatchState
          onClearFilter={() => {
            actions.setPropertyFiltering({ tokens: [], operation: "and" });
          }}
        />
      ),
    },
    pagination: {
      pageSize: tableDefaultPreferences.pageSize,
    },
    sorting: {
      defaultState: {
        sortingColumn: {
          sortingField: allColumns?.columnInfo?.sortingColumn || "",
        },
        isDescending: !allColumns?.columnInfo?.isAscending,
      },
    },
  });

  useEffect(() => {
    actions.setPropertyFiltering(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      {dataLoadingStatus === "error" && (
        <Box textAlign="center">
          <span>{"Error fetching records"}</span>
        </Box>
      )}
      {dataLoadingStatus !== "error" && (
        <Table
          variant="embedded"
          stickyHeader={true}
          loading={dataLoading}
          loadingText={"Loading Data..."}
          items={items}
          columnDefinitions={tableColumnDefinitions}
          visibleColumns={tableDefaultPreferences.visibleContent}
          resizableColumns={tableDefaultPreferences.custom}
          wrapLines={tableDefaultPreferences.wrapLines}
          stripedRows={tableDefaultPreferences.stripedRows}
          contentDensity={tableDefaultPreferences.contentDensity}
          header={<Header counter={`(${tableRowData?.length})`}>{allColumns?.columnInfo.tableName || ""}</Header>}
          filter={
            <PropertyFilter
              i18nStrings={propertyFilterI18nStrings("Table")}
              countText={getMatchesCountText(filteredItemsCount!)}
              expandToViewport={true}
              {...propertyFilterProps}
              query={query}
              onChange={(event: any) => {
                setQuery(event.detail.tokens?.length === 0 ? BLANK_SEARCH_AND : event.detail);
              }}
            />
          }
          {...collectionProps}
          pagination={<Pagination {...paginationProps} ariaLabels={paginationAriaLabels(paginationProps.pagesCount)} />}
          preferences={
            <Preferences
              preferences={tableDefaultPreferences}
              setPreferences={setTableDefaultPreferences}
              visibleContentOptions={generateVisibleContentOptions(allColumns)}
            />
          }
        />
      )}
    </>
  );
};

export default CloudscapeTable;
