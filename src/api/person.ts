import { IPersonData } from "../interfaces/data/IPersonData";
import { IDataApiQueryParams, IDataApiResponse } from "../interfaces/data/IApiParams";
import { captureException } from "@sentry/react";
import { callApi } from "./api";

export const getPersonData = (params: IDataApiQueryParams): Promise<IDataApiResponse> => {
  return callApi({
    url: "/getTableData",
    method: "get",
    params,
  })
    .then((response) => response.data)
    .catch((error) => {
      captureException({ method: "getPersonData", error });
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
      captureException({ method: "insertPersonData", error });
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
      captureException({ method: "updatePersonData", error });
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
      captureException({ method: "deletePersonData", error });
      return Promise.reject(error);
    });
};
