import { IDataApiQueryParams, IDataApiResponse } from "../data/IApiParams";

export interface ITableConfig {
  id: string;
  columns: IWindowedTableColumns[];
  name: string;
  height: number;
  headerHeight: number;
  rowHeight: number;
  sortOrder?: "asc" | "desc";
  sortBy?: string;
}

export interface IWindowedTableColumns {
  title: string;
  filterType?: "input" | "select";
  filterOptions?: { label: string; value: any }[];
  fieldName: string;
  sortable: boolean;
  width: number;
  visible: boolean;
  sortOrder: number;
  filterValue?: any;
}

export interface IWindowedTableProps {
  dataSource?: { [key: string]: any }[];
  getDataFunc?: (params: IDataApiQueryParams) => Promise<IDataApiResponse>;
  insertRowDataFunc?: (params: any) => Promise<{ success: boolean }>;
  updateRowDataFunc?: (params: any) => Promise<{ success: boolean }>;
  deleteRowDataFunc?: (id: string) => Promise<{ success: boolean }>;
}
