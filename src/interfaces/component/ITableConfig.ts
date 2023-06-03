import { IDataApiQueryParams, IDataApiResponse } from "../data/IApiParams";

export interface ITableConfig {
  columns: IWindowedTableColumns[];
  height: number;
  headerHeight: number;
  rowHeight: number;
  name: string;
  sortOrder?: "asc" | "desc";
  sortBy?: string;
  filterField?: string;
  filterValue?: any;
}

export interface IWindowedTableColumns {
  title: string;
  filterType?: "input" | "select";
  filterOptions?: { label: string; value: any }[];
  filterValue?: any;
  fieldName: string;
  sortable: boolean;
  sortOrder: number;
  width: number;
  visible: boolean;
}

export interface IWindowedTableProps {
  dataSource?: { [key: string]: any }[];
  getDataFunc?: (params: IDataApiQueryParams) => Promise<IDataApiResponse>;
  insertRowDataFunc?: (params: any) => Promise<{ success: boolean }>;
  updateRowDataFunc?: (params: any) => Promise<{ success: boolean }>;
  deleteRowDataFunc?: (id: string) => Promise<{ success: boolean }>;
}
