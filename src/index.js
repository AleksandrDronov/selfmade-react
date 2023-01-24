// React должен находиться в области видимости JSX-файла
import React from "./react";
import ReactDom from "./react-dom";

const App = (
  <div>
    <h1 className="primary">
      Да здравствует React!
    </h1>
    <p>Самостоятельная реализация React в 90 строк кода</p>
  </div>
);

ReactDom.render(App, document.getElementById('root'));



