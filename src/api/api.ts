import { IPersonData, IDataApiQueryParams, IDataApiResponse } from "./../interfaces/data/ITableData";
import { IApiParams } from "../interfaces/data/IApiParams";
import { callMockApi } from "./MockApi/callMockApi";
import * as Sentry from "@sentry/react";

export const callApi = (params: IApiParams): Promise<any> => {
  if (process.env.REACT_APP_USE_MOCKAPI) return callMockApi(params);
  else throw new Error("http client has not been implemented yet, run the app with mock api using .env file");
};

export const getPersonData = (params: IDataApiQueryParams): Promise<IDataApiResponse> => {
  return callApi({
    url: "/getTableData",
    method: "get",
    params,
  })
    .then((response) => response.data)
    .catch((error) => {
      Sentry.captureException({ method: "getPersonData", error });
      return Promise.reject(error);
    });
};

export const insertPersonData = (data: IPersonData): Promise<{ success: boolean }> => {
  return callApi({
    url: "/insertTableData",
    method: "post",
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      Sentry.captureException({ method: "insertPersonData", error });
      return Promise.reject(error);
    });
};

export const updatePersonData = (data: IPersonData): Promise<{ success: boolean }> => {
  return callApi({
    url: "/updateTableData",
    method: "put",
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      Sentry.captureException({ method: "updatePersonData", error });
      return Promise.reject(error);
    });
};

export const deletePersonData = (id: string): Promise<{ success: boolean }> => {
  return callApi({
    url: "/updateTableData",
    method: "delete",
    params: { id },
  })
    .then((response) => response.data)
    .catch((error) => {
      Sentry.captureException({ method: "deletePersonData", error });
      return Promise.reject(error);
    });
};
