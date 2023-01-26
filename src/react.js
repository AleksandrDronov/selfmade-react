import { h } from "snabbdom";

const createElement = (type, props = {}, ...children) => {
  // Если type - класс, следует:
  // 1. Создать новый инстанс переданного класса.
  // 2. Вызвать метод render у этого инстанса.
  if (type.prototype && type.prototype.isReactClassComponent) {
    const componentInstance = new type(props);
    // Присваиваем текущий экземпляр vNode
    componentInstance.__vNode = componentInstance.render();
    // Добавляем хук к виртуальной ноде snabbdom.
    // При создании этой ноды в реальном DOM отработает метод create.
    componentInstance.__vNode.data.hook = {
      create: () => {
        componentInstance.componentDidMount()
      }
    }

    return componentInstance.__vNode;
  }

  // Если type — функция, просто возвращаем результат этой функции.
  if (typeof type == "function") {
    return type(props);
  }

  // props = props || {};
  let dataProps = {};
  let eventProps = {};

  // Этот блок кода нужен для разделения атрибутов на пропсы и обработчики событий
  for(let propKey in props) {
    // Обработчики событий всегда начинаются с on, например: onClick, onChange и т. д.
    if (propKey.startsWith('on')) {
      // превращаем onClick в click
      const event = propKey.substring(2).toLowerCase();

      eventProps[event] = props[propKey];
    }
    else {
      dataProps[propKey] = props[propKey];
    }
  }

  // { props: dataProps } - пропсы snabbdom
  // { on: eventProps } - обработчики событий
  return h(type, { props: dataProps, on: eventProps }, children);
};

// Базовый класс Component
class Component {
  constructor() {}

  componentDidMount() {}

  setState(partialState) {
    // Обновляем состояние, сохранив первый уровень вложенности предыдущего состояния
    this.state = {
      ...this.state,
      ...partialState
    }
    // Вызываем метод __updater, который назначается в ReactDom
    React.__updater(this);
  }

  render() {}
}

// Добавим статическое свойство в базовый класс Component, чтобы различать классовые и функциональные компоненты
Component.prototype.isReactClassComponent = true;

// Экспортируем как React.createElement и React.Component
const React = {
  createElement,
  Component,
};

export default React;
