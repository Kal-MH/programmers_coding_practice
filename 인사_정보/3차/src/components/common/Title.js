import createElement from "../../utils/createElement.js";

function Title({ target, text }) {
  const container = createElement({ name: "div", className: "content_title" });
  target.appendChild(container);

  container.innerHTML = `<h1>${text}</h1>`;
}

export default Title;
