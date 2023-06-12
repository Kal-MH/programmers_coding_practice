function Suggestion({ target, initialState, onSelect }) {
  //init
  const container = document.createElement("div");
  container.className = "Suggestion";
  target.appendChild(container);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  const highlightText = (item, keyword) => {
    const matchedText = item.match(new RegExp(keyword, "gi"))[0];

    if (!matchedText) return item;

    return item.replace(
      new RegExp(matchedText, "gi"),
      `<span class="Suggestion__item--matched">${matchedText}</span>`
    );
  };

  this.render = () => {
    const { selectedIndex, items = [], keyword } = this.state;

    if (items.length > 0) {
      container.style.display = "block";
      container.innerHTML = `
      <ul>
      ${items
        .map(
          (item, i) => `
            <li data-index=${i} ${
            selectedIndex === i && "class='Suggestion__item--selected'"
          }>
            ${highlightText(item, keyword)}
            </li>
            `
        )
        .join("")}
        </ul>
        `;
    } else {
      container.style.display = "none";
      container.innerHTML = "";
    }
  };

  this.render();

  //eventListener
  window.addEventListener("keyup", (e) => {
    const { selectedIndex, items } = this.state;
    if (!items || !items.length) return;

    const FIRST_INDEX = 0,
      LAST_INDEX = items.length - 1;
    const navigationKeys = ["ArrowUp", "ArrowDown"];
    let nextIndex = selectedIndex;

    if (navigationKeys.includes(e.key)) {
      if (e.key === navigationKeys[0]) {
        nextIndex = selectedIndex - 1;

        if (nextIndex < 0) nextIndex = FIRST_INDEX;
      } else if (e.key === navigationKeys[1]) {
        nextIndex = selectedIndex + 1;

        if (nextIndex >= LAST_INDEX + 1) nextIndex = LAST_INDEX;
      }
      this.setState({ selectedIndex: nextIndex });
    } else if (e.key === "Enter") {
      onSelect(items[selectedIndex]);
    }
  });

  container.addEventListener("click", (e) => {
    const li = e.target.closest("li");

    if (li) {
      try {
        const selectedIndex = parseInt(li.dataset.index);

        onSelect(this.state.items[selectedIndex]);
      } catch (e) {
        alert("Error!");
      }
    }
  });
}

export default Suggestion;
