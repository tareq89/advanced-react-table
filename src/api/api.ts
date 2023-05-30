import { ITableData, ITableDataApiQueryParams, ITableDataResponse } from "./../interfaces/data/ITableData";
import { IApiParams } from "../interfaces/data/IApiParams";
import { callMockApi } from "./MockApi/callMockApi";

export const callApi = (params: IApiParams): Promise<any> => {
  if (process.env.REACT_APP_USE_MOCKAPI) return callMockApi(params);
  else throw new Error("http client has not been implemented yet, run the app with mock api using .env file");
};

export const getTableData = (params: ITableDataApiQueryParams): Promise<ITableDataResponse> => {
  return callApi({
    url: "/getTableData",
    method: "get",
    params,
  });
};

export const insertTableData = (data: ITableData): Promise<{ success: boolean }> => {
  return callApi({
    url: "/insertTableData",
    method: "post",
    data,
  });
};

export const updateTableData = (data: ITableData): Promise<{ success: boolean }> => {
  return callApi({
    url: "/updateTableData",
    method: "put",
    data,
  });
};

export const deleteTableData = (id: string): Promise<{ success: boolean }> => {
  return callApi({
    url: "/updateTableData",
    method: "delete",
    params: { id },
  });
};
