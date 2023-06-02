import { ITableConfig } from "../interfaces/component/ITableConfig";
import { callApi } from "./api";

export const getPersonalizedTableConfig = () => {
  return callApi({
    url: "/getPersonalizedTableConfig",
    method: "get",
  });
};

export const updatePersonalizedTableConfig = (data: ITableConfig) => {
  return callApi({
    url: "/updatePersonalizedTableConfig",
    method: "put",
    data,
  });
};
