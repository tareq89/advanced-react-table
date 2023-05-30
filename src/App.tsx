import React from "react";
import logo from "./logo.svg";
import style from "./sass/App.module.sass";

function App() {
  return (
    <div className={style.App}>
      <header className={style.Appheader}>
        <img src={logo} className={style.Applogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className={style.Applink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
