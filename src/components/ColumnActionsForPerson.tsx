import React, { useState } from "react";
import { IPersonData } from "../interfaces/data/IPersonData";
import style from "../sass/columnActionsForPerson.module.sass";
import { Modal } from "./Modal";
import { deletePersonData, updatePersonData } from "../api/person";
import { IWindowedTableColumns } from "../interfaces/component/ITableConfig";
import formElStyle from "../sass/settings.module.sass";

const PersonUpdateModal = ({
  updateRow,
  data,
  columnConfigs,
  setShowModal,
}: {
  updateRow: (rowData: { [key: string]: any }) => void;
  data: { [key: string]: any };
  columnConfigs: IWindowedTableColumns[];
  setShowModal: (flag: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState(data);

  const handleChange = (fieldName: string, value: string) => {
    setUpdatedData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updatePersonData(updatedData as IPersonData);
      if (response.success) {
        updateRow(updatedData);
        setShowModal(false);
      } else {
        // Handle error appropriately (e.g., show error message)
        console.error("Update failed", response.message);
      }
    } catch (error) {
      console.error("Update error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal loading={loading} title={"Update Selected Row"} onClose={() => setShowModal(false)}>
      <form className={formElStyle.settingsForm} onSubmit={handleUpdate}>
        <div style={{ height: "300px", overflowY: "scroll" }}>
          {columnConfigs
            .filter((x) => x.columnType === "data")
            .map((column, i) => (
              <div key={i} className={formElStyle.element} style={{ marginBottom: "10px" }}>
                <label>{column.title}</label>
                {column.filterType === "select" ? (
                  <select
                    name={column.fieldName}
                    defaultValue={data[column.fieldName]}
                    onChange={(e) => handleChange(column.fieldName, e.target.value)}
                  >
                    {column.filterOptions?.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={column.filterType}
                    name={column.fieldName}
                    defaultValue={data[column.fieldName]}
                    onChange={(e) => handleChange(column.fieldName, e.target.value)}
                  />
                )}
              </div>
            ))}
        </div>
        <div className={formElStyle.action}>
          <button type="submit">Update</button>
          <button
            className={formElStyle.cancel}
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export const ColumnActionsForPerson = ({
  rowData,
  columnConfigs,
  updateRow,
  deleteRowData,
}: {
  rowData: { [key: string]: any };
  columnConfigs: IWindowedTableColumns[];
  updateRow: (rowData: { [key: string]: any }) => void;
  deleteRowData: (id: string) => void;
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deletePersonData(rowData.id);
      if (response.success) {
        deleteRowData(rowData.id);
        setShowModal(false);
      } else {
        // Handle error appropriately (e.g., show error message)
        console.error("Delete failed", response.message);
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className={style.container}>
      {showModal && (
        <PersonUpdateModal
          columnConfigs={columnConfigs}
          updateRow={updateRow}
          data={rowData as IPersonData}
          setShowModal={setShowModal}
        />
      )}
      <button className={style.update} onClick={() => setShowModal(true)}>
        Update
      </button>
      <button className={style.cancel} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
