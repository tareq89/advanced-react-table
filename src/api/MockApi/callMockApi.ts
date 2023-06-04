import { IApiParams, IDataApiQueryParams, IDataApiResponse } from "../../interfaces/data/IApiParams";
import { IPersonData } from "../../interfaces/data/IPersonData";
import { tableData as tData } from "./tableData";
import { UUID } from "uuid-generator-ts";
import sortArray from "sort-array";
import { ITableConfig } from "../../interfaces/component/ITableConfig";
import { defaultPersonTableConfig } from "../../Constants";

let tableData: IPersonData[] = tData;
export const callMockApi = (param: IApiParams): Promise<any> => {
  if (param.url === "/getTableData") return getTableData(param.params as any);
  if (param.url === "/insertTableData") return insertTableData(param.data as any);
  if (param.url === "/updateTableData") return updateTableData(param.data as any);
  if (param.url === "/deleteTableData") return deleteTableData(param.params as any);
  if (param.url === "/getPersonalizedTableConfig") return getPersonalizedTableConfig(param.params as any);
  if (param.url === "/getDefaultPersonalizedTableConfig") return getDefaultPersonalizedTableConfig();
  if (param.url === "/updatePersonalizedTableConfig") return updatePersonalizedTableConfig(param.data as any);
  return Promise.resolve();
};

export const getTableData = (params: IDataApiQueryParams): Promise<{ data: IDataApiResponse }> => {
  const { sortOrder, sortBy, start, limit, search, ...filters } = params;
  // console.log(sortOrder, sortBy, start, limit, filters);
  let __tableData = tableData;

  let keys = Object.keys(filters).filter((key) => !!filters[key]);
  if (keys.length > 0) {
    __tableData = __tableData.filter((x: { [key: string]: any }) => {
      let response = false;
      keys.forEach((filterKey) => {
        const filterValue = filters[filterKey];
        if (!!x[filterKey] && (x[filterKey] === filterValue || (typeof x[filterKey] === "string" && x[filterKey].includes(filterValue)))) {
          response = true;
        }
      });
      return response;
    });
  }

  if (search) {
    __tableData = __tableData.filter((x: { [key: string]: any }) => {
      const keys = Object.keys(x);
      let response = false;
      keys.forEach((key) => {
        if (String(x[key]).includes(search)) response = true;
      });
      return response;
    });
  }
  if (sortOrder && sortBy) {
    __tableData = sortArray(__tableData, {
      by: sortBy,
      order: sortOrder,
    });
  } else {
    __tableData = sortArray(__tableData, { by: "id", order: "asc" });
  }

  const totalFound = __tableData.length;

  if (!isNaN(start) && !isNaN(limit)) {
    const upperLimit = start + limit;
    __tableData = __tableData.filter((x, index) => {
      if (index >= start && index < upperLimit) {
        return true;
      }
      return false;
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          data: __tableData,
          sortOrder: params.sortOrder,
          sortBy: params.sortBy,
          start: params.start,
          limit: params.limit,
          totalFound: totalFound,
        },
      });
    }, 1 * 1000);
  });
};
export const insertTableData = (data: { [key: string]: any } & { id?: string }): Promise<{ data: { success: boolean } }> => {
  const uuid = new UUID();
  tableData.push({ ...data, id: uuid.getDashFreeUUID() } as IPersonData);
  return Promise.resolve({ data: { success: true } });
};
export const updateTableData = (data: { [key: string]: any }): Promise<{ data: { success: boolean } }> => {
  tableData = tableData.map((x) => {
    if (x.id === data.id) x = data as IPersonData;
    return x;
  });
  return Promise.resolve({ data: { success: true } });
};
export const deleteTableData = (params: { id: string }): Promise<{ data: { success: boolean } }> => {
  tableData = tableData.filter((x) => x.id !== params.id);
  return Promise.resolve({ data: { success: true } });
};
function getPersonalizedTableConfig(params: { id: string }): Promise<{ success: boolean; data?: ITableConfig }> {
  let value = localStorage.getItem(params.id);
  if (value) {
    const config: ITableConfig = JSON.parse(value);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: config });
      }, 1 * 1000);
    });
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: false });
    }, 1 * 1000);
  });
}

function getDefaultPersonalizedTableConfig(): Promise<{ success: boolean; data?: ITableConfig }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: defaultPersonTableConfig });
    }, 1 * 1000);
  });
}
function updatePersonalizedTableConfig(config: ITableConfig): Promise<{ success: boolean }> {
  localStorage.setItem(config.id, JSON.stringify(config));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1 * 1000);
  });
}
