function SearchInput({ target, initialState, onChange }) {
  //init
  const form = document.createElement("form");
  form.className = "SearchInput";
  target.appendChild(form);

  //1. state
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
  };

  //2. render
  this.render = () => {
    form.innerHTML = `
        <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." />
        `;

    form.querySelector("input").focus();
  };

  //3. input eventListener
  form.addEventListener("keyup", (e) => {
    const keyword = e.target.value;
    const navigationKeys = [
      "ArrowUp",
      "ArrowDown",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
    ];

    if (!navigationKeys.includes(e.key)) onChange(keyword);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  this.render();
}

export default SearchInput;
