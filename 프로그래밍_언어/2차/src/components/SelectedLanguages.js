function SelectedLanguages({ target, initialState }) {
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
                ${this.state.map((lan) => `<li>${lan}</li>`).join("")}
            </ul>
        `;
  };

  this.render();
}

export default SelectedLanguages;
