function Title({ target, titleText, divClass }) {
  const div = document.createElement("div");
  div.className = divClass;
  div.innerHTML = `<h1>${titleText}</h1>`;
  target.appendChild(div);
}

export default Title;
