import { useState, useEffect } from "react";
import { Column, Table } from "react-virtualized";
import { Th } from "./Th";
import { Loader } from "./Loader";
import { IDataApiQueryParams } from "../interfaces/data/IApiParams";
import { ITableConfig, IWindowedTableProps } from "../interfaces/component/ITableConfig";
import { getDefaultPersonalizedTableConfig, getPersonalizedTableConfig } from "../api/tableconfig";
import { defaultPersonTableConfigID } from "../Constants";
import { Input } from "./Input";
import { SettingsIcon } from "../icons/SettingsIcon";
import * as Sentry from "@sentry/react";
import style from "../sass/windowedTable.module.sass";
import { SettingsModal } from "./SettingsModal";
import "react-virtualized/styles.css";

const getFilterObject = (tableConfig?: ITableConfig) => {
  if (!tableConfig) return {};
  let filterObj: { [key: string]: any } = {};
  tableConfig.columns.forEach((column) => {
    if (column.filterValue !== undefined) {
      filterObj[column.fieldName] = column.filterValue;
    }
  });
  if (tableConfig.sortBy !== undefined && tableConfig.sortOrder !== undefined) {
    filterObj["sortBy"] = tableConfig.sortBy;
    filterObj["sortOrder"] = tableConfig.sortOrder;
  }
  return filterObj;
};
export const WindowedTable = (props: IWindowedTableProps) => {
  const [tableConfig, setTableConfig] = useState<ITableConfig>();
  const [dataSource, setDataSource] = useState<{ [key: string]: any }[]>([]);
  const [totalFound, setTotalFound] = useState(0);
  const [loadingType, setLoadingType] = useState<"FRESH" | "PAGINATION">("FRESH");
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState<IDataApiQueryParams>();
  const [showModal, setShowMOdal] = useState(false);

  const loadTableConfig = async () => {
    if (!tableConfig) {
      let tableConfigResponse = await getPersonalizedTableConfig(defaultPersonTableConfigID);
      if (tableConfigResponse.success && tableConfigResponse.data) {
        setTableConfig(tableConfigResponse.data);
      } else {
        tableConfigResponse = await getDefaultPersonalizedTableConfig();
        if (tableConfigResponse.success && tableConfigResponse.data) {
          setTableConfig(tableConfigResponse.data);
        }
      }
      setQueryParams({
        sortOrder: undefined,
        sortBy: undefined,
        start: 0,
        limit: 30,
        ...getFilterObject(tableConfigResponse.data),
      });
    }
  };
  const loadData = async () => {
    if (props.dataSource) setDataSource(props.dataSource);
    else if (props.getDataFunc && queryParams) {
      const response = await props.getDataFunc(queryParams);
      setDataSource(loadingType === "FRESH" ? response.data : [...dataSource, ...response.data]);
      setTotalFound(response.totalFound);
      setLoadingType("FRESH");
    }
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadTableConfig();
      setLoading(false);
    })();
  });

  useEffect(() => {
    (async () => {
      if (queryParams) {
        setLoading(true);
        await loadData();
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [queryParams]);

  // useEffect(() => {
  //   setLoading(true);
  //   getPersonalizedTableConfig(defaultPersonTableConfigID)
  //     .then((response) => {
  //       if (response.success && response.data) {
  //         setTableConfig(response.data);
  //         console.log(response.data);
  //         setQueryParams({ ...queryParams, ...getFilterObject(response.data) });
  //       } else return getDefaultPersonalizedTableConfig();
  //     })
  //     .then((response) => {
  //       if (response?.success && response.data) {
  //         setTableConfig(response.data);
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    if (props.getDataFunc && loadingType === "PAGINATION" && queryParams) {
      setQueryParams({ ...queryParams, start: queryParams.start + queryParams.limit });
    }
    // eslint-disable-next-line
  }, [loadingType]);

  // useEffect(() => {
  //   if (props.dataSource) setDataSource(props.dataSource);
  //   else if (props.getDataFunc) {
  //     setLoading(true);
  //     props
  //       .getDataFunc(queryParams)
  //       .then((response) => {
  //         setDataSource(loadingType === "FRESH" ? response.data : [...dataSource, ...response.data]);
  //         setTotalFound(response.totalFound);
  //       })
  //       .finally(() => {
  //         setLoadingType("FRESH");
  //         setLoading(false);
  //       });
  //   }
  //   // eslint-disable-next-line
  // }, [props.dataSource, props.getDataFunc, queryParams]);
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
      <div className={style.tableContainer}>
        {loading && <Loader className={style.loader} />}
        {tableConfig && queryParams && (
          <>
            <h1>{tableConfig.name}</h1>
            <div className={style.controls}>
              <Input
                className={style.search}
                title={"Search"}
                onChange={(value) => setQueryParams({ ...queryParams, start: 0, search: value === "" ? undefined : value })}
              />
              <div>{!(loadingType === "FRESH" && loading) && <p>Total {totalFound} entry found</p>}</div>
              <button className={style.settings} onClick={() => setShowMOdal(true)}>
                <SettingsIcon />
              </button>
              {showModal && <SettingsModal setShowModal={setShowMOdal} tableCOnfig={tableConfig} setTableConfig={setTableConfig} />}
            </div>
            <Table
              className={style.table}
              style={{ ...(loading && { pointerEvents: "none" }) }}
              width={tableConfig.columns.reduce((acc, curr) => acc + curr.width, 0)}
              height={tableConfig.height}
              headerHeight={tableConfig.headerHeight}
              rowHeight={tableConfig.rowHeight}
              rowCount={dataSource.length}
              rowGetter={({ index }: { index: number }) => dataSource[index]}
              overscanRowCount={queryParams.limit}
              onScroll={(params) => {
                if (params.scrollHeight - params.clientHeight === params.scrollTop && dataSource?.length < totalFound)
                  setLoadingType("PAGINATION");
              }}
            >
              {tableConfig.columns.map((column, index) => (
                <Column
                  key={index}
                  cellRenderer={(param) => {
                    return param.dataKey === "index" ? param.rowIndex + 1 : param.cellData;
                  }}
                  headerStyle={{ border: "1px solid" }}
                  label={column.title}
                  dataKey={column.fieldName}
                  width={column.width}
                  headerRenderer={(params) => {
                    return (
                      <Th
                        onClick={() => {
                          if (queryParams.sortOrder === "asc")
                            setQueryParams({ ...queryParams, sortBy: column.fieldName, sortOrder: "desc" });
                          else if (queryParams.sortOrder === "desc")
                            setQueryParams({ ...queryParams, start: 0, sortBy: undefined, sortOrder: undefined });
                          else if (queryParams.sortOrder === undefined)
                            setQueryParams({ ...queryParams, start: 0, sortBy: column.fieldName, sortOrder: "asc" });
                        }}
                        onChange={(value: any) =>
                          setQueryParams({ ...queryParams, start: 0, [column.fieldName]: value === "" ? undefined : value })
                        }
                        sortBy={queryParams.sortBy}
                        sortOrder={queryParams.sortOrder}
                        column={column}
                      />
                    );
                  }}
                />
              ))}
            </Table>
          </>
        )}
      </div>
    </Sentry.ErrorBoundary>
  );
};
