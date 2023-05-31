import { IPersonData, IDataApiQueryParams, IDataApiResponse } from "./../interfaces/data/ITableData";
import { IApiParams } from "../interfaces/data/IApiParams";
import { callMockApi } from "./MockApi/callMockApi";

export const callApi = (params: IApiParams): Promise<any> => {
  if (process.env.REACT_APP_USE_MOCKAPI) return callMockApi(params);
  else throw new Error("http client has not been implemented yet, run the app with mock api using .env file");
};

export const getPersonData = (params: IDataApiQueryParams): Promise<IDataApiResponse> => {
  return callApi({
    url: "/getTableData",
    method: "get",
    params,
  }).then((response) => response.data);
};

export const insertPersonData = (data: IPersonData): Promise<{ success: boolean }> => {
  return callApi({
    url: "/insertTableData",
    method: "post",
    data,
  }).then((response) => response.data);
};

export const updatePersonData = (data: IPersonData): Promise<{ success: boolean }> => {
  return callApi({
    url: "/updateTableData",
    method: "put",
    data,
  }).then((response) => response.data);
};

export const deletePersonData = (id: string): Promise<{ success: boolean }> => {
  return callApi({
    url: "/updateTableData",
    method: "delete",
    params: { id },
  }).then((response) => response.data);
};
