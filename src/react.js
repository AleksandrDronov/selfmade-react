import { h } from 'snabbdom';

const createElement = (type, props = {}, ...children) => {
    return h(type, { props }, children);
  };

  // Экспортирум как React.createElement
  const React = {
    createElement
  };

  export default React;
