function Pagination({ target, initialData, onClick }) {
  const container = document.createElement("div");
  container.id = "pagination";
  container.className = "area";
  target.appendChild(container);

  this.state = initialData;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    this.render();
  };

  const renderButtonGroup = () => {
    const { maxPageCnt, currentPage } = this.state;
    const buttons = [];

    for (let i = 0; i < maxPageCnt; i++) {
      buttons[i] = `
        <button
          class="page"
          data-idx=${i + 1}
        ${i + 1 === currentPage ? "style='color:red'" : ""}>
          ${i + 1}
        </button>`;
    }

    return buttons.join("");
  };

  this.render = () => {
    container.innerHTML = `
      <button class="arrow left"><<</button>
      ${renderButtonGroup()}
      <button class="arrow right">>></button>
      `;
  };

  const init = () => {
    container.addEventListener("click", (e) => {
      if (!onClick) return;

      const { maxPageCnt, currentPage } = this.state;
      const button = e.target.closest("button");

      if (!button) return;

      const classList = e.target.classList;
      let curPage = 1;

      if (classList[0] === "page") {
        curPage = parseInt(e.target.dataset.idx);
      } else if (classList[1] === "left") {
        if (currentPage === 1) return;
        curPage = currentPage - 1;
      } else if (classList[1] === "right") {
        if (currentPage === maxPageCnt) return;
        curPage = currentPage + 1;
      }

      onClick(curPage);
    });

    this.render();
  };

  init();
}

export default Pagination;
