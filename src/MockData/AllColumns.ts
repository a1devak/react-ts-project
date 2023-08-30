import { DynamicColumnDetails } from "../Components/CloudscapeTable/CloudscapeInterface";

export const DynamicColumns1: DynamicColumnDetails = {
  "columnInfo": {
    "tableName": "Table 1",
    "sortingColumn": "column1",
    "isAscending": true
  },
  "data": [
    {
      "fieldName": "column1",
      "displayName": "Column 1",
      "isColumnVisible": true,
      "isFilter": true,
      "minWidth": 80,
      "maxWidth": 100,
      "metadata": {
        "type": "string"
      }
    },
    {
      "fieldName": "column2",
      "displayName": "Column 2",
      "isColumnVisible": true,
      "isFilter": true,
      "minWidth": 80,
      "maxWidth": 100,
      "metadata": {
        "type": "string"
      }
    }
  ]
}

export const DynamicColumns: DynamicColumnDetails = {
  "columnInfo": {
    "tableName": "Table 1",
    "sortingColumn": "fullname",
    "isAscending": true
  },
  "data": [
    {
      "fieldName": "fullname",
      "displayName": "Name",
      "isColumnVisible": true,
      "isFilter": true,
      "minWidth": 80,
      "maxWidth": 100,
      "metadata": {
        "type": "link"
      }
    },
    {
      "fieldName": "companyname",
      "displayName": "Company Name",
      "isColumnVisible": true,
      "isFilter": true,
      "minWidth": 80,
      "maxWidth": 100,
      "metadata": {
        "type": "string"
      }
    },
    {
      "fieldName": "cb_athenabusinesslegalname",
      "displayName": "Legal Name",
      "isColumnVisible": true,
      "isFilter": true,
      "minWidth": 80,
      "maxWidth": 100,
      "metadata": {
        "type": "string"
      }
    },
    {
      "fieldName": "address1_composite",
      "displayName": "Address",
      "isColumnVisible": true,
      "isFilter": true,
      "minWidth": 80,
      "maxWidth": 100,
      "metadata": {
        "type": "string"
      }
    },
    {
      "fieldName": "createdon",
      "displayName": "Created On",
      "isColumnVisible": true,
      "isFilter": true,
      "minWidth": 80,
      "maxWidth": 100,
      "metadata": {
        "type": "date",
        "dateFormat": "YYYY-MM-DD"
      }
    },
    {
      "fieldName": "modifiedon",
      "displayName": "Modified On",
      "isColumnVisible": true,
      "isFilter": true,
      "minWidth": 80,
      "maxWidth": 100,
      "metadata": {
        "type": "dateTime",
        "dateFormat": "YYYY-MM-DD hh:mm a"
      }
    },
    {
      "fieldName": "cb_lastactivitydate",
      "displayName": "Last Activity Date",
      "isColumnVisible": true,
      "isFilter": true,
      "minWidth": 80,
      "maxWidth": 100,
      "metadata": {
        "type": "date",
        "dateFormat": "YYYY-MM-DD"
      }
    },
    {
      "fieldName": "cb_programleadsource",
      "displayName": "Program Lead Source",
      "isColumnVisible": true,
      "isFilter": true,
      "minWidth": 80,
      "maxWidth": 100,
      "metadata": {
        "type": "string"
      }
    },
    {
      "fieldName": "statuscode",
      "displayName": "Lead Status",
      "isColumnVisible": true,
      "isFilter": true,
      "minWidth": 80,
      "maxWidth": 100,
      "metadata": {
        "type": "string"
      }
    }
  ]
}