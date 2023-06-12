function Table({ target, initialState, tableKeys }) {
  const container = document.createElement("div");
  container.className = "area";
  container.id = "table";
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

    if (workers.length === 0) {
      tbody.innerHTML = "";
    } else {
      tbody.innerHTML = `
            ${workers
              .map(
                (row) => `
                    <tr>
                    ${Object.values(row)
                      .map((value) => `<td>${value}</td>`)
                      .join("")}
                    </tr>
                `
              )
              .join("")}
        `;
    }
  };

  const init = () => {
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
