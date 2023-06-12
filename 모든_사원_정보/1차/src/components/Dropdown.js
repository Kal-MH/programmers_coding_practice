function Dropdown({ target, initialData, onChange }) {
  const container = document.createElement("div");
  container.className = "area";
  container.id = "dropdown";
  target.appendChild(container);

  this.state = initialData;

  this.render = () => {
    container.innerHTML = "";

    const select = document.createElement("select");

    this.state.forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt;
      option.appendChild(document.createTextNode(`${opt}개씩`));

      select.appendChild(option);
    });

    select.addEventListener("change", (e) => {
      onChange(parseInt(e.target.value));
    });

    container.appendChild(select);
  };

  this.render();
}

export default Dropdown;
