import * as React  from "react";
import { arrayFormater } from "../utils/data.formatter.utils";
import { LogicalNames } from "../constants/state.constants";
// surveyitemid
// retrive work items tree data
export const retrieveTreeDataRequest = async (node?: any): Promise<any[]> => {
  console.log('lpomnim ===> ', node, node?.internalId);
  
  try {
    var req: any = {};
    var parameterTypes: any = {
      relatedsurveyitemid: {
        typeName: "Edm.String",
        structuralProperty: 1,
      },
      surveytemplateid: {
        typeName: "Edm.String",
        structuralProperty: 1,
      },
      islist: {
        typeName: "Edm.Boolean",
        structuralProperty: 1,
      }
    };

    // const surveyTemplate = await 
    // window.parent.Xrm.Page.getAttribute("gyde_surveytemplate").getValue()[0]?.id?.replace("{", "").replace("}", "");
    // window.parent.Xrm.Page.data.entity
    //   .getId()
    //   .replace("{", "")
    //   .replace("}", "");

    let surveyTemplate = null;

    const currentLogicalName = await window.parent.Xrm.Page.ui._formContext.contextToken.entityTypeName

    if (currentLogicalName === LogicalNames?.SURVEY) {
      surveyTemplate = await window.parent.Xrm.Page.data.entity
      .getId()
      .replace("{", "")
      .replace("}", "");
    } else {
      surveyTemplate = await 
        window.parent.Xrm.Page.getAttribute(LogicalNames?.SURVEY).getValue()[0]?.id?.replace("{", "").replace("}", "")
    }

    const internalId = node?.internalId ? node?.internalId : await window.parent.Xrm.Page.getAttribute("gyde_internalid").getValue()

    req.relatedsurveyitemid = internalId;
    req.surveytemplateid = surveyTemplate;
    req.islist = true;

    req.getMetadata = function () {
      return {
        boundParameter: null,
        parameterTypes,
        operationType: 1, // This is a function. Use '0' for actions and '2' for CRUD
        operationName: "gyde_GetSurveyWorkItemTreeData", // need to change according to work items
      };
    };
    const result = await window.parent.Xrm.WebApi.online
      .execute(req)
      .then(function (response: any) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (responseBody: any) {
        const resData = JSON.parse(responseBody.nodedata);
        console.log("data res ======> ", resData);
        
        const data = arrayFormater(resData?.workItems, resData?.logicalname, internalId)
        return data;
      })
      .catch(function (error: any) {
        console.log('error ======> ', error);
        
        return [];
      });
    await Promise.all([
      // surveyTemplate, 
      result,
      internalId,
    ])
    console.log("tree data",result);
    return result;
  } catch (error) {
    console.log("retrive tree data 'error' ====> ", error);
    return [];
  }
}