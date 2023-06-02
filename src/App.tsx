import style from "./sass/App.module.sass";
import { WindowedTable } from "./components/WindowedTable";
import * as Sentry from "@sentry/react";
import { useEffect, useState } from "react";
import { ITableConfig } from "./interfaces/component/ITableConfig";
import { defaultPersonTableConfig } from "./Constants";
import { getPersonalizedTableConfig } from "./api/tableconfig";
import { deletePersonData, getPersonData, insertPersonData, updatePersonData } from "./api/person";

function App() {
  return (
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
  );
}

export default Sentry.withProfiler(App);
