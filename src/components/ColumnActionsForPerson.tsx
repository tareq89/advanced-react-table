import React, { useState } from "react";
import { IPersonData } from "../interfaces/data/IPersonData";
import style from "../sass/columnActionsForPerson.module.sass";
import { Modal } from "./Modal";
import { deletePersonData, updatePersonData } from "../api/person";
import { IWindowedTableColumns } from "../interfaces/component/ITableConfig";
import formElStyle from "../sass/settings.module.sass";

const PersonUpdateModal = (props: {
  updateRow: (rowData: { [key: string]: any }) => void;
  data: { [key: string]: any };
  columnConfigs: IWindowedTableColumns[];
  setShowModal: (flag: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [updatedDate, setUpdatedDate] = useState(props.data);
  return (
    <Modal loading={loading} title={"Update Selected Rpw"} onClose={() => props.setShowModal(false)}>
      <form className={formElStyle.settingsForm}>
        <div style={{ height: "300px", overflowY: "scroll" }}>
          {props.columnConfigs
            .filter((x) => x.columnType === "data")
            .map((column, i) => {
              return (
                <div key={i} className={formElStyle.element} style={{ marginBottom: "10px" }}>
                  <label>{column.title}</label>
                  {column.filterType === "select" && (
                    <select
                      name="sortOrder"
                      defaultValue={props.data[column.fieldName]}
                      onChange={(e) => {
                        e.preventDefault();
                        setUpdatedDate({ ...updatedDate, [column.fieldName]: e.target.value });
                      }}
                    >
                      {column.filterOptions &&
                        column.filterOptions.map((x, i) => (
                          <option value={x.value} key={i}>
                            {x.label}
                          </option>
                        ))}
                    </select>
                  )}
                  {column.filterType === "input" && (
                    <input
                      type={column.filterType}
                      name={column.fieldName}
                      defaultValue={props.data[column.fieldName]}
                      onChange={(e) => {
                        e.preventDefault();
                        setUpdatedDate({ ...updatedDate, [column.fieldName]: e.target.value });
                      }}
                    />
                  )}
                </div>
              );
            })}
        </div>
        <div className={formElStyle.action}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              updatePersonData(updatedDate as IPersonData).then((response) => {
                if (response.success) {
                  setLoading(false);
                  props.updateRow(updatedDate);
                  props.setShowModal(false);
                }
              });
            }}
          >
            Update
          </button>
          <button
            className={formElStyle.cancel}
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

export const ColumnActionsForPerson = (props: {
  rowData: { [key: string]: any };
  columnConfigs: IWindowedTableColumns[];
  updateRow: (rowData: { [key: string]: any }) => void;
  deleteRowData: (id: string) => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={style.container}>
      {showModal && (
        <PersonUpdateModal
          columnConfigs={props.columnConfigs}
          updateRow={props.updateRow}
          data={props.rowData as IPersonData}
          setShowModal={setShowModal}
        />
      )}
      <button
        className={style.update}
        onClick={() => {
          setShowModal(true);
        }}
      >
        Update
      </button>
      <button
        className={style.cancel}
        onClick={() => {
          console.log(props.rowData.id);
          deletePersonData(props.rowData.id).then((response) => {
            if (response.success) {
              props.deleteRowData((props.rowData as IPersonData).id);
              setShowModal(false);
            }
            // add logic to refresh table data
          });
        }}
      >
        Delete
      </button>
    </div>
  );
};
