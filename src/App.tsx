import style from "./sass/App.module.sass";
import { getPersonData } from "./api/api";
import { WindowedTable } from "./components/WindowedTable";
import * as Sentry from "@sentry/react";

function App() {
  return (
    <div className={style.App}>
      <div className={style.tableContainer}>
        <WindowedTable
          getDataFunc={getPersonData}
          columns={[
            {
              title: "Index",
              fieldName: "index",
              sortOrder: 0,
              sortable: false,
              width: 150,
            },
            {
              title: "Name",
              fieldName: "name",
              sortOrder: 1,
              sortable: true,
              filterType: "input",
              width: 150,
            },
            {
              title: "Email",
              fieldName: "email",
              sortOrder: 2,
              sortable: true,
              filterType: "input",
              width: 250,
            },
            {
              title: "Age",
              fieldName: "age",
              sortOrder: 3,
              sortable: true,
              filterType: "input",
              width: 150,
            },
            {
              title: "Gender",
              fieldName: "gender",
              sortOrder: 4,
              sortable: true,
              filterType: "select",
              width: 150,
              filterOptions: [
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ],
            },
            {
              title: "Address",
              fieldName: "address",
              sortOrder: 5,
              sortable: true,
              filterType: "input",
              width: 150,
            },
            {
              title: "City",
              fieldName: "city",
              sortOrder: 6,
              sortable: true,
              filterType: "input",
              width: 150,
            },
            {
              title: "Postcode",
              fieldName: "postcode",
              sortOrder: 7,
              sortable: true,
              filterType: "input",
              width: 150,
            },
            {
              title: "Country",
              fieldName: "country",
              sortOrder: 8,
              sortable: true,
              filterType: "input",
              width: 150,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Sentry.withProfiler(App);
