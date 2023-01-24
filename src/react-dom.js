import * as snabbdom from 'snabbdom';
import propsModule from 'snabbdom/modules/props';

const reconcile = snabbdom.init([propsModule]);

// Переменная, содержащая корневой элемент, который функция render вернула последним
let rootVNode = null;

const render = (el, rootDomElement) => {
  // Этот блок кода будет вызван при первом вызове функции render
  if (rootVNode === null) {
    rootVNode = rootDomElement;
  }

  // Запоминаем VNode, которую возвращает reconcile
  rootVNode = reconcile(rootVNode, el);
}

const ReactDom =  {
  render
};

export default ReactDom;
