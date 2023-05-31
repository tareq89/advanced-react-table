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
