export interface IPersonData {
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

export interface IDataApiResponse {
  data: { [key: string]: any }[];
  currentCount: number;
  totalCount: number;
  sortOrder?: "asc" | "desc";
  sortyBy?: string;
  start: number;
  limit: number;
}

export interface IDataApiQueryParams {
  sortOrder?: "asc" | "desc";
  sortyBy?: string;
  start: number;
  limit: number;
  [key: string]: any;
}
