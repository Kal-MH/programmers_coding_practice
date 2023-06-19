const createElement = ({ name, className, id }) => {
  const element = document.createElement(name);
  if (className) element.className = className;
  if (id) element.id = id;

  return element;
};

export default createElement;
