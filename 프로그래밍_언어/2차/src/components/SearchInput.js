function SearchInput({ target, initialState, onChange }) {
  const form = document.createElement("form");
  form.className = "SearchInput";
  target.appendChild(form);

  this.render = () => {
    form.innerHTML = `
        <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." autofocus/>
    `;

    if (initialState) {
      form.querySelector("input").value = initialState;
    }
  };

  this.render();

  //event handler
  form.addEventListener("keyup", (e) => {
    const value = e.target.value;
    const navigationKeys = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
    ];

    if (!navigationKeys.includes(e.key)) onChange(value);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

export default SearchInput;
