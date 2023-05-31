import style from "./sass/App.module.sass";
import { Table } from "./components/Table";
import { getPersonData } from "./api/api";

function App() {
  return (
    <div className={style.App}>
      <Table
        getDataFunc={getPersonData}
        columns={[
          {
            title: "Name",
            fieldName: "name",
            sortOrder: 1,
            filterType: "input",
          },
          {
            title: "Email",
            fieldName: "email",
            sortOrder: 2,
            filterType: "input",
            width: 150,
          },
          {
            title: "Age",
            fieldName: "age",
            sortOrder: 3,
            filterType: "input",
          },
          {
            title: "Gender",
            fieldName: "gender",
            sortOrder: 4,
            filterType: "select",
            filterOption: [
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ],
          },
          {
            title: "Address",
            fieldName: "address",
            sortOrder: 5,
            filterType: "input",
          },
          {
            title: "City",
            fieldName: "city",
            sortOrder: 6,
            filterType: "input",
          },
          {
            title: "Postcode",
            fieldName: "postcode",
            sortOrder: 7,
            filterType: "input",
          },
          {
            title: "Country",
            fieldName: "country",
            sortOrder: 8,
            filterType: "input",
          },
        ]}
      />
    </div>
  );
}

export default App;
