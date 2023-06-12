function Table({ target, initialData }) {
  const container = document.createElement("div");
  container.className = "area";
  container.id = "table";
  target.appendChild(container);

  const table = document.createElement("table");
  container.appendChild(table);

  const textHead = ["name", "title", "email", "role"];

  this.state = initialData;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const initTableHead = () => {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const thArr = textHead.map((text) => {
      const th = document.createElement("th");
      th.appendChild(document.createTextNode(text));

      return th;
    });

    thArr.forEach((th) => {
      tr.appendChild(th);
    });
    thead.appendChild(tr);

    return thead;
  };

  const initTableBody = () => {
    const tbody = document.createElement("tbody");
    const trArr = this.state.map((worker) => {
      const tr = document.createElement("tr");
      const values = Object.values(worker);

      for (const value of values) {
        const td = document.createElement("td");
        td.appendChild(document.createTextNode(value));
        tr.appendChild(td);
      }

      return tr;
    });

    trArr.forEach((tr) => {
      tbody.appendChild(tr);
    });

    return tbody;
  };

  this.render = () => {
    table.innerHTML = "";

    const thead = initTableHead();
    const tbody = initTableBody();

    table.appendChild(thead);
    table.appendChild(tbody);
  };

  this.render();
}

export default Table;
