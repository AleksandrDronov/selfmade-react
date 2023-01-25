// React должен находиться в области видимости JSX-файла
import React from "./react";
import ReactDom from "./react-dom";

// Функциональный компонент
const Greeting = ({ name }) => <p>Привет, {name}!</p>;

const App = (
  <div>
    <h1 className="primary">
      Да здравствует React!
    </h1>
    <p>Самостоятельная реализация React в 90 строк кода</p>
    <Greeting name={"Самодельный React"} />
  </div>
);

ReactDom.render(App, document.getElementById('root'));



