export interface ITableData {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  address: string;
  city: string;
  postcode?: string;
  country: string;
}

export interface ITableDataResponse {
  data: ITableData[];
  sortOrder: "asc" | "desc";
  sortyBy: string;
  start: number;
  limit: number;
  currentCount: number;
  totalCount: number;
}

export interface ITableDataApiQueryParams {
  sortOrder: "asc" | "desc";
  sortyBy: string;
  start: number;
  limit: number;
  [key: string]: any;
}
