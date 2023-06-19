const createElement = ({ tagName, className, id }) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (id) element.id = id;

  return element;
};

export default createElement;
