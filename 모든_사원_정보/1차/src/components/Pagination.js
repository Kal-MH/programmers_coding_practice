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

  const setButtonGroup = () => {
    const { maxPageCnt, currentPage } = this.state;
    const buttons = [];

    for (let i = 0; i < maxPageCnt; i++) {
      const button = document.createElement("button");
      button.appendChild(document.createTextNode(i + 1 + ""));
      if (i + 1 === currentPage) button.style.color = "red";

      button.addEventListener("click", (e) => {
        e.preventDefault();

        const curPage = parseInt(e.target.textContent);
        onClick(curPage);
      });
      buttons.push(button);
    }

    return buttons;
  };

  this.render = () => {
    container.innerHTML = "";

    const leftArrowButton = document.createElement("button");
    const rightArrowButton = document.createElement("button");
    const buttonGroup = setButtonGroup();

    leftArrowButton.className = "arrow";
    leftArrowButton.appendChild(document.createTextNode("<<"));
    leftArrowButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.state.currentPage === 1) return;
      onClick(this.state.currentPage - 1);
    });
    rightArrowButton.className = "arrow";
    rightArrowButton.appendChild(document.createTextNode(">>"));
    rightArrowButton.addEventListener("click", (e) => {
      e.preventDefault();
      const { maxPageCnt, currentPage } = this.state;

      if (currentPage === maxPageCnt) return;
      onClick(currentPage + 1);
    });

    container.appendChild(leftArrowButton);
    buttonGroup.forEach((button) => {
      container.appendChild(button);
    });
    container.appendChild(rightArrowButton);
  };

  this.render();
}

export default Pagination;
