import React, { useState } from "react";
import { Modal } from "./Modal";
import { ITableConfig } from "../interfaces/component/ITableConfig";
import style from "../sass/settings.module.sass";
import { getDefaultPersonalizedTableConfig, updatePersonalizedTableConfig } from "../api/tableconfig";

export const SettingsModal = (props: {
  setShowModal: (show: boolean) => void;
  tableCOnfig: ITableConfig;
  setTableConfig: (tableCOnfig: ITableConfig) => void;
}) => {
  const [localTableConfig, setLocalTableConfig] = useState(props.tableCOnfig);
  const [apiCallInProgress, setApiCallInProgress] = useState(false);

  const setTableConfig = (fieldName: string, value: any) => {
    setLocalTableConfig({ ...localTableConfig, [fieldName]: value });
  };

  const setTableColumnConfig = (fieldName: string, columnPropertyName: string, value: any) => {
    setLocalTableConfig({
      ...localTableConfig,
      columns: localTableConfig.columns.map((column) => {
        if (column.fieldName === fieldName) {
          column = { ...column, [columnPropertyName]: value };
        }
        return column;
      }),
    });
  };

  const updateTableConfig = async (restoreDefault?: boolean) => {
    setApiCallInProgress(true);
    let _tableConfig = localTableConfig;
    if (restoreDefault) {
      const defaultConfigResponse = await getDefaultPersonalizedTableConfig();
      if (defaultConfigResponse.success && defaultConfigResponse.data) {
        _tableConfig = defaultConfigResponse.data;
      }
    }

    let updateResponse = await updatePersonalizedTableConfig(_tableConfig);
    if (updateResponse.success) {
      props.setTableConfig(_tableConfig);
    }

    setApiCallInProgress(false);
    props.setShowModal(false);
  };

  return (
    <Modal title="Table Settings" onClose={() => props.setShowModal(false)} loading={apiCallInProgress}>
      <form name="Table Settings" className={style.settingsForm}>
        <div className={style.formElements}>
          <h2>Table Config</h2>
          <div className={style.element}>
            <label>Name</label>
            <input type="text" name="name" defaultValue={localTableConfig.name} onChange={(e) => setTableConfig("name", e.target.value)} />
          </div>
          <div className={style.element}>
            <label>Sort By</label>
            <select name="sortBy" defaultValue={localTableConfig.sortBy} onChange={(e) => setTableConfig("sortBy", e.target.value)}>
              {props.tableCOnfig.columns.map((x, i) => (
                <option key={i} value={x.fieldName}>
                  {x.title}
                </option>
              ))}
            </select>
          </div>
          <div className={style.element}>
            <label>Name</label>
            <select
              name="sortOrder"
              defaultValue={localTableConfig.sortOrder}
              onChange={(e) => setTableConfig("sortOrder", e.target.value)}
            >
              <option value={"asc"}>Ascending</option>
              <option value={"desc"}>Descending</option>
            </select>
          </div>

          <h2>Column Config</h2>
          <div className={style.columnConfigGrid}>
            {localTableConfig.columns.map((x, i) => {
              return (
                <div key={i} className={style.columnConfig}>
                  <h4>{x.title}</h4>
                  <div className={style.element}>
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={x.title}
                      onChange={(e) => setTableColumnConfig(x.fieldName, "title", e.target.value)}
                    />
                  </div>
                  <div className={style.element}>
                    <label>Default Filter Value</label>
                    {x.filterType === "input" && (
                      <input
                        type="text"
                        name="filterValue"
                        defaultValue={x.filterValue}
                        onChange={(e) => setTableColumnConfig(x.fieldName, "filterValue", e.target.value)}
                      />
                    )}
                    {x.filterType === "select" && x.filterOptions && (
                      <select
                        name="filterValue"
                        defaultValue={x.filterValue}
                        onChange={(e) => setTableColumnConfig(x.fieldName, "filterValue", e.target.value)}
                      >
                        {x.filterOptions.map((x, i) => (
                          <option key={i} value={x.value}>
                            {x.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className={style.element}>
                    <label>Is Sortable</label>
                    <select
                      name="sortable"
                      defaultValue={x.sortable ? "true" : "false"}
                      onChange={(e) => setTableColumnConfig(x.fieldName, "sortable", e.target.value === "true")}
                    >
                      <option value={"true"}>Yes</option>
                      <option value={"false"}>No</option>
                    </select>
                  </div>
                  <div className={style.element}>
                    <label>Column Order</label>
                    <input
                      type="number"
                      name="sortOrder"
                      defaultValue={x.sortOrder}
                      onChange={(e) => setTableColumnConfig(x.fieldName, "sortOrder", e.target.value)}
                    />
                  </div>
                  <div className={style.element}>
                    <label>Column Width</label>
                    <input
                      type="number"
                      name="width"
                      defaultValue={x.width}
                      onChange={(e) => setTableColumnConfig(x.fieldName, "width", e.target.value === "true")}
                    />
                  </div>
                  <div className={style.element}>
                    <label>Is Visible</label>
                    <select
                      name="visible"
                      defaultValue={x.visible ? "true" : "false"}
                      onChange={(e) => setTableColumnConfig(x.fieldName, "visible", e.target.value === "true")}
                    >
                      <option value={"true"}>Yes</option>
                      <option value={"false"}>No</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <hr />
        <div className={style.action}>
          <button
            onClick={(e) => {
              e.preventDefault();
              updateTableConfig(true);
            }}
          >
            Restore Defaults
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              updateTableConfig();
            }}
          >
            Submit
          </button>
          <button
            className={style.cancel}
            onClick={(e) => {
              e.preventDefault();
              props.setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
