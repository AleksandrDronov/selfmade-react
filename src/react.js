import { h } from 'snabbdom';

const createElement = (type, props = {}, ...children) => {
    // Если type — функция, просто возвращаем результат этой функции.
  if (typeof (type) == 'function') {
    return type(props);
  }
    return h(type, { props }, children);
  };

  // Экспортирум как React.createElement
  const React = {
    createElement
  };

  export default React;
