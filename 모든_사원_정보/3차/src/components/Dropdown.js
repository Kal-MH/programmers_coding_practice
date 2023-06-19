import createElement from "../utils/createElement.js";

function Dropdown({ target, optionValues, onChange }) {
  const container = createElement({
    tagName: "div",
    className: "area",
    id: "dropdown",
  });
  target.appendChild(container);

  const render = () => {
    container.innerHTML = `
        <select>
            ${optionValues.map(
              (option) => `<option value=${option}>${option}</option>`
            )}
        </select>
    `;
  };

  const init = () => {
    container.addEventListener("change", (e) => {
      onChange(parseInt(e.target.value));
    });
    render();
  };

  init();
}

export default Dropdown;
