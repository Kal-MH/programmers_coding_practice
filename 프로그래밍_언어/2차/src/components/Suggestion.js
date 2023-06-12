function Suggestion({ target, initialState, onSelect }) {
  const container = document.createElement("div");
  container.className = "Suggestion";
  target.appendChild(container);

  this.state = {
    selectedIndex: 0,
    ...initialState,
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    this.render();
  };

  const highlight = (keyword, item) => {
    const matchedText = item.match(new RegExp(keyword, "gi"))[0];
    const highlightedText = item.replace(
      new RegExp(matchedText, "gi"),
      `<span class="Suggestion__item--matched">${matchedText}</span>`
    );

    return highlightedText;
  };

  this.render = function () {
    const { selectedIndex, items, keyword } = this.state;

    if (!items.length) {
      container.style.display = "none";
    } else {
      container.style.display = "block";

      container.innerHTML = `
            <ul>
                ${items
                  .map(
                    (item, index) =>
                      `<li
                      data-index=${index} 
                      ${
                        selectedIndex === index &&
                        "class=Suggestion__item--selected"
                      }>${highlight(keyword, item)}</li>`
                  )
                  .join("")}
            </ul>
        `;
    }
  };

  this.render();

  //event handler
  window.addEventListener("keyup", (e) => {
    const navigationKeys = ["ArrowUp", "ArrowDown"];
    const { selectedIndex, items } = this.state;

    if (!items.length) return;

    if (navigationKeys.includes(e.key)) {
      const lastIndex = items.length - 1;
      let nextIndex = selectedIndex;

      if (e.key === "ArrowUp") {
        nextIndex = nextIndex - 1 < 0 ? 0 : nextIndex - 1;
      } else if (e.key === "ArrowDown") {
        nextIndex = nextIndex + 1 >= lastIndex + 1 ? lastIndex : nextIndex + 1;
      }

      this.setState({
        selectedIndex: nextIndex,
      });
    } else if (e.key === "Enter") {
      onSelect(items[selectedIndex]);
    }
  });

  container.addEventListener("click", (e) => {
    const li = e.target.closest("li");

    if (li) {
      try {
        const index = parseInt(li.dataset.index);

        onSelect(this.state.items[index]);
      } catch (e) {
        alert("Error!");
      }
    }
  });
}

export default Suggestion;
