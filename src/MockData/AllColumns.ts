import { DynamicColumnDetails } from "../Components/CloudscapeTable/CloudscapeInterface";

export const DynamicColumns1: DynamicColumnDetails =
{
  "columnInfo": {
    "tableName": "Opportunities in Appointment Set",
    "sortingColumn": "mod@ified.on",
    "isAscending": false
  },
  "data": [
    {
      "fieldName": "name",
      "displayName": "Opportunity Name",
      "isColumnVisible": false,
      "isFilterable": true,
      "minWidth": 170,
      "maxWidth": 190,
      "metadata": {
        "type": "string"
      }
    },
    {
      "fieldName": "parentaccountid.name",
      "displayName": "Account Name",
      "isColumnVisible": false,
      "isFilterable": true,
      "minWidth": 170,
      "maxWidth": 190,
      "metadata": {
        "type": "string"
      }
    },
    {
      "fieldName": "cb_opportunitystage@OData.Community.Display.V1.FormattedValue",
      "displayName": "Opportunity Stage",
      "isColumnVisible": false,
      "isFilterable": true,
      "minWidth": 170,
      "maxWidth": 190,
      "metadata": {
        "type": "string"
      }
    },
    {
      "fieldName": "actualvalue@OData.Community.Display.V1.FormattedValue",
      "displayName": "SQO Proposal Amount",
      "isColumnVisible": false,
      "isFilterable": false,
      "minWidth": 200,
      "maxWidth": 200,
      "metadata": {
        "type": "string"
      }
    },
    {
      "fieldName": "estimatedclosedate",
      "displayName": "Projected Closed Date",
      "isColumnVisible": false,
      "isFilterable": false,
      "minWidth": 200,
      "maxWidth": 200,
      "metadata": {
        "type": "dateTime",
        "dateFormat": "MMM-YYYY"
      }
    },
    {
      "fieldName": "cb_upsideforecast@OData.Community.Display.V1.FormattedValue",
      "displayName": "Forecast Category",
      "isColumnVisible": false,
      "isFilterable": true,
      "minWidth": 170,
      "maxWidth": 190,
      "metadata": {
        "type": "string"
      }
    },
    {
      "fieldName": "mod@ified.on",
      "displayName": "Modified On",
      "isColumnVisible": false,
      "isFilterable": true,
      "minWidth": 170,
      "maxWidth": 190,
      "metadata": {
        "type": "date",
        "dateFormat": "ll"
      }
    },
    {
      "fieldName": "cb_lastactivitydate",
      "displayName": "Last Activity Date",
      "isColumnVisible": false,
      "isFilterable": false,
      "minWidth": 170,
      "maxWidth": 190,
      "metadata": {
        "type": "date",
        "dateFormat": "MM/DD/YYYY"
      }
    }
  ]
}