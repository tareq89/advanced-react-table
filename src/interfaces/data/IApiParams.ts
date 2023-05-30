export interface IApiParams {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: any;
  params?: { [key: string]: any };
}
