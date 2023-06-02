export interface IApiParams {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: any;
  params?: { [key: string]: any };
}

export interface IDataApiResponse {
  data: { [key: string]: any }[];
  totalFound: number;
  sortOrder?: "asc" | "desc";
  sortBy?: string;
  start: number;
  limit: number;
}

export interface IDataApiQueryParams {
  sortOrder?: "asc" | "desc";
  sortBy?: string;
  start: number;
  limit: number;
  search?: string;
  [key: string]: any;
}
