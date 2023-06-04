import style from "./sass/App.module.sass";
import { WindowedTable } from "./components/WindowedTable";
import * as Sentry from "@sentry/react";
import { deletePersonData, getPersonData, insertPersonData, updatePersonData } from "./api/person";

function App() {
  return (
    <>
      <div id="modal-container" role="dialog"></div>
      <div id="modal-container-2" role="dialog"></div>
      <div className={style.App}>
        <div className={style.tableContainer}>
          <WindowedTable
            getDataFunc={getPersonData}
            insertRowDataFunc={insertPersonData}
            updateRowDataFunc={updatePersonData}
            deleteRowDataFunc={deletePersonData}
          />
        </div>
      </div>
    </>
  );
}

export default Sentry.withProfiler(App);
