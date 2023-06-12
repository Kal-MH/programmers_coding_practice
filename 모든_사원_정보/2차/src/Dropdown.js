function Dropdown({ target, initialState, onSelect }) {
  const container = document.createElement("div");
  container.className = "area";
  container.id = "dropdown";
  target.appendChild(container);

  const state = initialState;

  const render = () => {
    container.querySelector("select").innerHTML = `
        ${state.options
          .map((option) => `<option value=${option}>${option}</option>`)
          .join("")}
    `;
  };

  const init = () => {
    container.innerHTML = `
        <select>
        </select>
    `;

    container.querySelector("select").addEventListener("change", (e) => {
      onSelect(parseInt(e.target.value));
    });

    render();
  };

  init();
}

export default Dropdown;
