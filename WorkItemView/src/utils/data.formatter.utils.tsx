import * as React from "react";

export const arrayFormater = (array: any[], logicalname: string, internalId: string): any => {
  for (let i = 0; i < array.length; i++) {
    let dataSet = array[i];
    // const icon = dataSet?.icon;
    let { children, ...rest } = dataSet;
    if (!dataSet.children) {
      rest = { ...rest, switcherIcon: () => null };
    }
    dataSet = {
      ...rest,
      key: dataSet.id,
      hasChildren: dataSet.children,
      disableExpand: !dataSet.children,
      expanded: false,
      logicalName: logicalname,
      internalId: internalId,
    };
    array[i] = dataSet;
  }
  return array;
};