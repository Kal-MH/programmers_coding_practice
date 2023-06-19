function Form({ target, onChange }) {
  const form = document.createElement("form");
  form.className = "SearchInput";
  target.appendChild(form);

  const render = () => {
    form.innerHTML = `
      <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요."">
      `;
  };

  const init = () => {
    render();

    form.addEventListener("keyup", (e) => {
      const keyword = e.target.value;
      const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];

      if (navigationKeys.includes(e.key)) return;
      onChange(keyword);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  };

  init();
}

export default Form;
