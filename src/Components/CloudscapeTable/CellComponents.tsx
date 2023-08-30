import * as React from "react";
import { DataEntity } from "./CloudscapeInterface";
import { Box, Link } from "@cloudscape-design/components";
import moment from "moment-timezone";

export const DefaultDateFormat = "YYYY-MM-DD";
export const DefaultDateTimeFormat = "YYYY-MM-DD HH:mm:ss";

export const getDataToDisplay = (item: any, dataEntity: DataEntity, pcfContext: any, primaryEntityName: string) => {
  const dataType = dataEntity.metadata.type;
  const data = item[dataEntity.fieldName] ? item[dataEntity.fieldName] : "";

  switch (dataType) {
    case "date":
      if (data) {
        const desiredFormat = dataEntity?.metadata?.dateFormat ? dataEntity?.metadata?.dateFormat : "YYYY-MM-DD";
        return moment(data).format(desiredFormat);
      }
      return ""; // Use your desired format
    case "dateTime":
      if (data) {
        const desiredFormat = dataEntity?.metadata?.dateFormat ? dataEntity?.metadata?.dateFormat : "YYYY-MM-DD HH:mm:ss";
        return moment(data).format(desiredFormat);
      }
      return "";
    case "link":
      if (data) {
        const handleCLick = () => {
          console.log("handleCLick ", primaryEntityName);
          pcfContext.navigation.openForm({
            entityName: primaryEntityName,
            entityId: item[primaryEntityName + "id"],
          });
        };
        return <Link onFollow={() => handleCLick()}>{data}</Link>;
      }
      return "";
    case "externalLink":
      if (data) {
        return (
          <Link external href={dataEntity.metadata.link || ""}>
            {data || "external link"}
          </Link>
        );
      }
      return "";
    default:
      return (
        <>
          <Box>{`${data}`}</Box>
          {/* Future examles  */}
          {/* <Box textAlign="center">{`${data}`}</Box> */}
        </>
      );
  }
};
