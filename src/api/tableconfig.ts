import { ITableConfig } from "../interfaces/component/ITableConfig";
import { callApi } from "./api";
import { captureException } from "@sentry/react";

export const getPersonalizedTableConfig = (id: string): Promise<{ success: boolean; data?: ITableConfig }> => {
  return callApi({
    url: "/getPersonalizedTableConfig",
    method: "get",
    params: { id },
  }).catch((error) => {
    captureException({ method: "getPersonData", error });
    return Promise.reject(error);
  });
};

export const getDefaultPersonalizedTableConfig = (): Promise<{ success: boolean; data?: ITableConfig }> => {
  return callApi({
    url: "/getDefaultPersonalizedTableConfig",
    method: "get",
  }).catch((error) => {
    captureException({ method: "getPersonData", error });
    return Promise.reject(error);
  });
};

export const updatePersonalizedTableConfig = (data: ITableConfig): Promise<{ success: true }> => {
  return callApi({
    url: "/updatePersonalizedTableConfig",
    method: "put",
    data,
  }).catch((error) => {
    captureException({ method: "getPersonData", error });
    return Promise.reject(error);
  });
};
