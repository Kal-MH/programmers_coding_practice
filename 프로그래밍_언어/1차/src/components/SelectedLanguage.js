function SelectedLanguage({ target, initialState }) {
  const container = document.createElement("div");
  container.className = "SelectedLanguage";
  target.appendChild(container);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    container.innerHTML = `
        <ul>
        ${this.state.map((language) => `<li>${language}</li>`).join("")}
      </ul>
        `;
  };

  this.render();
}

export default SelectedLanguage;
