import { IApiParams } from "../../interfaces/data/IApiParams";
import { ITableDataApiQueryParams, ITableDataResponse, ITableData } from "../../interfaces/data/ITableData";
import { tableData as tData } from "./tableData";
import { UUID } from "uuid-generator-ts";
import sortArray from "sort-array";

let tableData = tData;
export const callMockApi = (param: IApiParams): Promise<any> => {
  if (param.url === "/getTableData") return getTableData(param as any);
  if (param.url === "/insertTableData") return insertTableData(param as any);
  if (param.url === "/updateTableData") return updateTableData(param as any);
  if (param.url === "/deleteTableData") return deleteTableData(param as any);
  return Promise.resolve();
};

export const getTableData = (params: ITableDataApiQueryParams): Promise<ITableDataResponse> => {
  const { sortOrder, sortyBy, start, limit, ...filters } = params;
  let __tableData = tableData;

  if (Object.keys(filters).length > 0) {
    __tableData = __tableData.filter((x: { [key: string]: any }) => {
      let response = false;
      Object.keys(filters).forEach((filterKey) => {
        const filterValue = filters[filterKey];
        if (!!x[filterKey] && (x[filterKey] === filterValue || (typeof x[filterKey] === "string" && x[filterKey].includes(filterValue))))
          response = true;
      });
      return response;
    });
  }

  if (sortOrder && sortyBy) {
    __tableData = sortArray(__tableData, {
      by: sortyBy,
      order: sortOrder,
    });
  }

  if (start && limit) {
    const upperLimit = start + limit;
    __tableData = __tableData.filter((x, index) => {
      if (index >= start && index < upperLimit) {
        return true;
      }
      return false;
    });
  }

  return Promise.resolve({
    data: tableData as ITableData[],
    sortOrder: params.sortOrder,
    sortyBy: params.sortyBy,
    start: params.start,
    limit: params.limit,
    currentCount: 0,
    totalCount: 0,
  });
};
export const insertTableData = (data: ITableData & { id?: string }): Promise<{ success: boolean }> => {
  const uuid = new UUID();
  tableData.push({ ...data, id: uuid.getDashFreeUUID() });
  return Promise.resolve({ success: true });
};
export const updateTableData = (data: ITableData): Promise<{ success: boolean }> => {
  tableData = tableData.map((x) => {
    if (x.id === data.id) x = data;
    return x;
  });
  return Promise.resolve({ success: true });
};
export const deleteTableData = (id: string): Promise<{ success: boolean }> => {
  tableData = tableData.filter((x) => x.id !== id);
  return Promise.resolve({ success: true });
};
