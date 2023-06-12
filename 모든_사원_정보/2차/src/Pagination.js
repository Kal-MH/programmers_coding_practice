function Pagination({ target, initialState, onClick }) {
  const container = document.createElement("div");
  container.className = "area";
  container.id = "pagination";
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
    const { maxPageNum, curPageNum } = state;

    container.innerHTML = `
        <button class="arrow left"><<</button>
            ${Array.from({ length: maxPageNum }, (_, i) => i + 1)
              .map(
                (index) =>
                  `<button 
                data-idx=${index}
                ${
                  index === curPageNum ? "style='color:red'" : ""
                }>${index}</button>`
              )
              .join("")}
        <button class="arrow right">>></button>
    `;
  };

  const init = () => {
    container.addEventListener("click", (e) => {
      const button = e.target.closest("button");

      if (!button) return;

      const classList = Array.from(button.classList);
      const idx = parseInt(button.dataset.idx);
      const { maxPageNum, curPageNum } = state;
      let nextIdx = null;

      if (idx) {
        nextIdx = idx;
      } else if (classList.includes("left")) {
        nextIdx = curPageNum - 1 < 1 ? 1 : curPageNum - 1;
      } else if (classList.includes("right")) {
        nextIdx = curPageNum + 1 > maxPageNum ? maxPageNum : curPageNum + 1;
      }

      onClick(nextIdx);
    });

    render();
  };

  init();
}

export default Pagination;
