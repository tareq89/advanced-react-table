import React, { useState } from "react";
import { Modal } from "./Modal";
import { ITableConfig } from "../interfaces/component/ITableConfig";
import style from "../sass/settings.module.sass";
import { getDefaultPersonalizedTableConfig, updatePersonalizedTableConfig } from "../api/tableconfig";

export const SettingsModal = ({
  setShowModal,
  tableCOnfig,
  setTableConfig,
}: {
  setShowModal: (show: boolean) => void;
  tableCOnfig: ITableConfig;
  setTableConfig: (tableCOnfig: ITableConfig) => void;
}) => {
  const [localTableConfig, setLocalTableConfig] = useState(tableCOnfig);
  const [apiCallInProgress, setApiCallInProgress] = useState(false);

  const updateLocalTableConfig = (fieldName: string, value: any) => {
    setLocalTableConfig((prevConfig) => ({ ...prevConfig, [fieldName]: value }));
  };

  const updateColumnConfig = (fieldName: string, columnPropertyName: string, value: any) => {
    setLocalTableConfig((prevConfig) => ({
      ...prevConfig,
      columns: prevConfig.columns.map((column) =>
        column.fieldName === fieldName ? { ...column, [columnPropertyName]: value } : column
      ),
    }));
  };

  const updateTableConfig = async (restoreDefault?: boolean) => {
    setApiCallInProgress(true);
    let _tableConfig = localTableConfig;

    if (restoreDefault) {
      try {
        const defaultConfigResponse = await getDefaultPersonalizedTableConfig();
        if (defaultConfigResponse.success && defaultConfigResponse.data) {
          _tableConfig = defaultConfigResponse.data;
        }
      } catch (error) {
        console.error("Failed to get default config", error);
      }
    }

    try {
      const updateResponse = await updatePersonalizedTableConfig(_tableConfig);
      if (updateResponse.success) {
        setTableConfig(_tableConfig);
      }
    } catch (error) {
      console.error("Failed to update table config", error);
    } finally {
      setApiCallInProgress(false);
      setShowModal(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTableConfig();
  };

  return (
    <Modal title="Table Settings" onClose={() => setShowModal(false)} loading={apiCallInProgress}>
      <form name="Table Settings" className={style.settingsForm} onSubmit={handleSubmit}>
        <div className={style.formElements}>
          <h2>Table Config</h2>
          <div className={style.element}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={localTableConfig.name}
              onChange={(e) => updateLocalTableConfig("name", e.target.value)}
            />
          </div>
          <div className={style.element}>
            <label>Sort By</label>
            <select
              name="sortBy"
              value={localTableConfig.sortBy}
              onChange={(e) => updateLocalTableConfig("sortBy", e.target.value)}
            >
              {tableCOnfig.columns.map((column, i) => (
                <option key={i} value={column.fieldName}>
                  {column.title}
                </option>
              ))}
            </select>
          </div>
          <div className={style.element}>
            <label>Sort Order</label>
            <select
              name="sortOrder"
              value={localTableConfig.sortOrder}
              onChange={(e) => updateLocalTableConfig("sortOrder", e.target.value)}
            >
              <option value={"asc"}>Ascending</option>
              <option value={"desc"}>Descending</option>
            </select>
          </div>

          <h2>Column Config</h2>
          <div className={style.columnConfigGrid}>
            {localTableConfig.columns.map((column, i) => (
              <div key={i} className={style.columnConfig}>
                <h4>{column.title}</h4>
                <div className={style.element}>
                  <label>Title</label>
                  <input
                    type="text"
                    name={`title-${column.fieldName}`}
                    value={column.title}
                    onChange={(e) => updateColumnConfig(column.fieldName, "title", e.target.value)}
                  />
                </div>
                <div className={style.element}>
                  <label>Default Filter Value</label>
                  {column.filterType === "input" ? (
                    <input
                      type="text"
                      name={`filterValue-${column.fieldName}`}
                      value={column.filterValue}
                      onChange={(e) => updateColumnConfig(column.fieldName, "filterValue", e.target.value)}
                    />
                  ) : (
                    column.filterOptions && (
                      <select
                        name={`filterValue-${column.fieldName}`}
                        value={column.filterValue}
                        onChange={(e) => updateColumnConfig(column.fieldName, "filterValue", e.target.value)}
                      >
                        {column.filterOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )
                  )}
                </div>
                <div className={style.element}>
                  <label>Is Sortable</label>
                  <select
                    name={`sortable-${column.fieldName}`}
                    value={column.sortable ? "true" : "false"}
                    onChange={(e) => updateColumnConfig(column.fieldName, "sortable", e.target.value === "true")}
                  >
                    <option value={"true"}>Yes</option>
                    <option value={"false"}>No</option>
                  </select>
                </div>
                <div className={style.element}>
                  <label>Column Order</label>
                  <input
                    type="number"
                    name={`sortOrder-${column.fieldName}`}
                    value={column.sortOrder}
                    onChange={(e) => updateColumnConfig(column.fieldName, "sortOrder", Number(e.target.value))}
                  />
                </div>
                <div className={style.element}>
                  <label>Column Width</label>
                  <input
                    type="number"
                    name={`width-${column.fieldName}`}
                    value={column.width}
                    onChange={(e) => updateColumnConfig(column.fieldName, "width", Number(e.target.value))}
                  />
                </div>
                <div className={style.element}>
                  <label>Is Visible</label>
                  <select
                    name={`visible-${column.fieldName}`}
                    value={column.visible ? "true" : "false"}
                    onChange={(e) => updateColumnConfig(column.fieldName, "visible", e.target.value === "true")}
                  >
                    <option value={"true"}>Yes</option>
                    <option value={"false"}>No</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className={style.action}>
          <button type="button" onClick={() => updateTableConfig(true)}>
            Restore Defaults
          </button>
          <button type="submit">Submit</button>
          <button
            className={style.cancel}
            type="button"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
