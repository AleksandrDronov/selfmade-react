import React from "./react";
import * as snabbdom from "snabbdom";
import propsModule from "snabbdom/modules/props";
import eventlistenersModule from 'snabbdom/modules/eventlisteners';

// propsModule отвечает за модификацию текстовых атрибутов
// eventListenersModule отвечает за обработку событий на элементах
const reconcile = snabbdom.init([propsModule, eventlistenersModule]);

// Переменная, содержащая корневой элемент, который функция render вернула последним
let rootVNode = null;

const render = (el, rootDomElement) => {
  // Этот блок кода будет вызван при первом вызове функции render
  if (rootVNode === null) {
    rootVNode = rootDomElement;
  }

  // Запоминаем VNode, которую возвращает reconcile
  rootVNode = reconcile(rootVNode, el);
};

// ReactDom указывает React, как обновлять DOM
React.__updater = (componentInstance) => {
  // В этом методе описана логика обновления DOM, когда вызывается this.setState в компонентах

  // Получаем текущий элемент oldVNode, который сохранён в __vNode
  const oldVNode = componentInstance.__vNode;
  // Присваеваем обновлённую версию DOM-узла с помощью вызова метода render у переданного элемента
  const newVNode = componentInstance.render();

  // Обновляем __vNode свойство — для этого заменяем oldVNode на newVNode
  componentInstance.__vNode = reconcile(oldVNode, newVNode);
};

const ReactDom = {
  render,
};

export default ReactDom;
