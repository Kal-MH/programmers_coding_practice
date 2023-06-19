import createElement from "../utils/createElement.js";

function Pagination({ target, initialState, onClick }) {
  const container = createElement({
    tagName: "div",
    className: "area",
    id: "pagination",
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
    const { curIdx, maxIdx } = state;

    container.innerHTML = `
        <button class="arrow left"><<</button>
        ${Array.from({ length: maxIdx }, (_, i) => i + 1)
          .map(
            (idx) =>
              `<button 
              data-idx=${idx}
              ${curIdx === idx ? 'style="color:red"' : ""}>${idx}</button>`
          )
          .join("")}
        <button class="arrow right">>></button>
    `;
  };

  const init = () => {
    render();

    container.addEventListener("click", (e) => {
      const button = e.target.closest("button");

      if (!button) return;
      const { curIdx, maxIdx } = state;
      const classList = Array.from(button.classList);
      let idx = parseInt(button.dataset.idx);

      if (classList.includes("left")) {
        idx = curIdx - 1 <= 0 ? 1 : curIdx - 1;
      } else if (classList.includes("right")) {
        idx = curIdx + 1 > maxIdx ? maxIdx : curIdx + 1;
      }

      onClick(idx);
    });
  };

  init();
}

export default Pagination;
