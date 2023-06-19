import createElement from "../utils/createElement.js";

function SelectedLanguage({ target, initialState }) {
  const container = createElement({
    tagName: "div",
    className: "SelectedLanguage",
  });
  target.appendChild(container);

  let state = initialState;

  this.setState = (nextState) => {
    state = nextState;
    render();
  };

  const render = () => {
    container.innerHTML = `
    <ul>
      ${state.map((selectedLan) => `<li>${selectedLan}</li>`).join("")}
    </ul>
    `;
  };

  render();
}

export default SelectedLanguage;
