import { useCollection } from "@cloudscape-design/collection-hooks";
import { CollectionPreferencesProps, Header, Pagination, PropertyFilter, PropertyFilterProps, Table, TableProps } from "@cloudscape-design/components";
import { FilteringProperty } from "@cloudscape-design/components/property-filter/interfaces";
import * as React from "react";
import { DateTimeForm, formatDateTime } from "../GenericComponents/TableDateFilterForm";
import { Preferences, TableEmptyState, TableNoMatchState, getMatchesCountText, paginationAriaLabels, propertyFilterI18nStrings } from "../GenericComponents/Utils";
import { ColumnDataType, DataEntity, DynamicColumnDetails } from "./CloudscapeInterface";
import { BLANK_SEARCH_AND, extractFieldNamesForDefaultVisibleContent, generateVisibleContentOptions } from "./CloudscapeTableConfig";

interface CloudscapeGenericTableProps {
  tableColumnDefinitions: TableProps.ColumnDefinition<any>[];
  allColumns: DynamicColumnDetails;
  allItems: any[];
  itemsPerPage: number;
}
export const CloudscapeGenericTable: React.FC<CloudscapeGenericTableProps> = ({ tableColumnDefinitions, allColumns, allItems, itemsPerPage }) => {
  const [tableRowData, setTableRowData] = React.useState<any[]>([]);

  const [tableDefaultPreferences, setTableDefaultPreferences] = React.useState<CollectionPreferencesProps.Preferences>({});

  const [filteringProperties, setFilteringProperties] = React.useState<PropertyFilterProps.FilteringProperty[]>([]);
  const [query, setQuery] = React.useState(BLANK_SEARCH_AND);

  React.useEffect(() => {
    actions.setPropertyFiltering(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  React.useEffect(() => {
    setTableRowData(allItems || []);
    console.log("All Items ", JSON.stringify(allItems));
  }, [allItems]);

  // generating Table default preferences from allColumns
  React.useEffect(() => {
    if (allColumns) {
      const defaultPreferences = {
        pageSize: itemsPerPage,
        visibleContent: extractFieldNamesForDefaultVisibleContent(allColumns),
        wrapLines: true,
        stripedRows: false,
        custom: false,
      } as CollectionPreferencesProps.Preferences;
      setTableDefaultPreferences(defaultPreferences);
    }
  }, [allColumns, itemsPerPage]);

  // generating filtering properties from allColumns
  React.useEffect(() => {
    if (allColumns) {
      const properties = generateFilteringProperties(allColumns);
      setFilteringProperties(properties);
    }
  }, [allColumns]);

  function generateFilteringProperties(dynamicColumnDetails: DynamicColumnDetails): FilteringProperty[] {
    const filteringProperties: FilteringProperty[] = dynamicColumnDetails.data.map((dataEntity: DataEntity) => {
      const dataType: ColumnDataType = dataEntity.metadata.type;
      let operators: any[] = [];

      if (dataType === "string") {
        operators = [":", "!:", "=", "!="];
      } else if (dataType === "number") {
        operators = ["=", "!=", "<", "<=", ">", ">="];
      } else if (dataType === "date" || dataType === "dateTime") {
        operators = ["=", "!=", "<", "<=", ">", ">="].map((operator) => ({
          operator,
          form: DateTimeForm,
          format: formatDateTime,
          match: "datetime",
        }));
      } else {
        operators = [":", "!:", "=", "!="];
      }

      return {
        key: dataEntity.fieldName,
        propertyLabel: dataEntity.displayName,
        groupValuesLabel: `${dataEntity.displayName} values`,
        operators,
      } as FilteringProperty;
    });

    return filteringProperties;
  }

  const { items, actions, filteredItemsCount, collectionProps, paginationProps, propertyFilterProps } = useCollection(tableRowData, {
    propertyFiltering: {
      filteringProperties,
      empty: <TableEmptyState />,
      noMatch: <TableNoMatchState />,
    },
    pagination: {
      pageSize: tableDefaultPreferences.pageSize,
    },
    sorting: {
      defaultState: {
        sortingColumn: {
          sortingField: allColumns?.columnInfo?.sortingColumn,
        },
        isDescending: !allColumns?.columnInfo?.isAscending,
      },
    },
  });

  const onSortingChange = (e: any) => {
    console.log("Event ", e)
  }

  return (
    <>
      <Table
        variant="embedded"
        stickyHeader={true}
        loading={false}
        loadingText={"Loading Data..."}
        items={items}
        columnDefinitions={tableColumnDefinitions}
        visibleColumns={tableDefaultPreferences.visibleContent}
        resizableColumns={tableDefaultPreferences.custom}
        wrapLines={tableDefaultPreferences.wrapLines}
        stripedRows={tableDefaultPreferences.stripedRows}
        contentDensity={tableDefaultPreferences.contentDensity}
        header={<Header counter={`(${tableRowData?.length})`}>{allColumns?.columnInfo.tableName || ""}</Header>}
        onSortingChange={onSortingChange}
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
        preferences={<Preferences preferences={tableDefaultPreferences} setPreferences={setTableDefaultPreferences} visibleContentOptions={generateVisibleContentOptions(allColumns)} />}
      />
    </>
  );
};
