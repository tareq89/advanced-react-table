import { IApiParams } from "../interfaces/data/IApiParams";
import { callMockApi } from "./MockApi/callMockApi";

export const callApi = (params: IApiParams): Promise<any> => {
  console.log(params);
  if (process.env.REACT_APP_USE_MOCKAPI) return callMockApi(params);
  else throw new Error("http client has not been implemented yet, run the app with mock api using .env file");
};
