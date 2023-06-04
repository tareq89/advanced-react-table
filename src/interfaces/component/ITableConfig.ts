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
  columnType: "index" | "data" | "action";
  filterType?: "input" | "select";
  filterOptions?: { label: string; value: any }[];
  fieldName: string;
  sortable: boolean;
  width: number;
  visible: boolean;
  sortOrder: number;
  filterValue?: any;
  render?: (props: {
    rowData: { [key: string]: any };
    columnConfigs: IWindowedTableColumns[];
    updateRow: (rowData: { [key: string]: any }) => void;
    deleteRowData: (id: string) => void;
  }) => React.ReactNode;
}

export interface IWindowedTableProps {
  dataSource?: { [key: string]: any }[];
  getDataFunc?: (params: IDataApiQueryParams) => Promise<IDataApiResponse>;
  insertRowDataFunc?: (params: any) => Promise<{ success: boolean }>;
  updateRowDataFunc?: (params: any) => Promise<{ success: boolean }>;
  deleteRowDataFunc?: (id: string) => Promise<{ success: boolean }>;
}
