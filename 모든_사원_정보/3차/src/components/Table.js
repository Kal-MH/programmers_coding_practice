import createElement from "../utils/createElement.js";

function Table({ target, initialState }) {
  const container = createElement({
    tagName: "div",
    className: "area",
    id: "table",
  });
  target.appendChild(container);

  let state = initialState;

  this.setState = (nextState) => {
    state = {
      ...state,
      ...nextState,
    };

    render();
  };

  const render = () => {
    const tbody = container.querySelector("tbody");
    const { workers } = state;

    tbody.innerHTML = `
        ${workers
          .map(
            (worker) => `
            <tr>
            ${Object.values(worker)
              .map((value) => `<td>${value}</td>`)
              .join("")}
            </tr>
        `
          )
          .join("")}
    `;
  };

  const init = () => {
    const { tableKeys } = state;

    container.innerHTML = `
    <table>
            <thead>
                <tr>
                    ${tableKeys.map((key) => `<th>${key}</th>`).join("")}
                </tr>
            </thead>
            <tbody>
            </tbody>
    </table>
        `;

    render();
  };

  init();
}

export default Table;
