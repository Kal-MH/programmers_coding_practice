import createElement from "../utils/createElement.js";

function Suggestion({ target, initialState, onSelect }) {
  const container = createElement({ tagName: "div", className: "Suggestion" });
  target.appendChild(container);

  let state = {
    ...initialState,
    curIdx: 0,
  };

  this.setState = (nextState) => {
    state = {
      ...state,
      ...nextState,
    };

    render();
  };

  const highlightText = (text, keyword) => {
    const matchedText = text.match(new RegExp(keyword, "gi"))[0];
    const result = text.replace(
      new RegExp(matchedText, "gi"),
      `<span class="Suggestion__item--matched">${matchedText}</span>`
    );

    return result;
  };

  const render = () => {
    const { languages, curIdx, keyword } = state;

    if (languages.length === 0) {
      container.style.visibility = "hidden";
      container.innerHTML = "";
    } else {
      container.style.visibility = "visible";
      container.innerHTML = `
                <ul>
                ${languages
                  .map(
                    (l, i) =>
                      `<li key="${i}" 
                      data-idx="${i}"
                      ${
                        curIdx === i ? 'class="Suggestion__item--selected"' : ""
                      }>${highlightText(l, keyword)}</li>`
                  )
                  .join("")}
                </ul>
            `;
    }
  };

  const init = () => {
    render();

    window.addEventListener("keyup", (e) => {
      const navigationKeys = ["ArrowUp", "ArrowDown"];
      const { languages, curIdx } = state;

      if (navigationKeys.includes(e.key)) {
        let nextIdx = curIdx;

        if (e.key === "ArrowUp") {
          nextIdx = nextIdx - 1 < 0 ? languages.length - 1 : nextIdx - 1;
        } else if (e.key === "ArrowDown") {
          nextIdx = nextIdx + 1 >= languages.length ? 0 : nextIdx + 1;
        }

        this.setState({ curIdx: nextIdx });
      } else if (e.key === "Enter") {
        onSelect(languages[curIdx]);
      }
    });

    container.addEventListener("click", (e) => {
      const li = e.target.closest("li");

      if (!li) return;
      const idx = li.dataset.idx;
      onSelect(state.languages[idx]);
    });
  };

  init();
}

export default Suggestion;
