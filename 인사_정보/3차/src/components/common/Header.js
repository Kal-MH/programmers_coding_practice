import { ROUTE } from "../../utils/constants.js";
import createElement from "../../utils/createElement.js";
import { historyPush } from "../../utils/route.js";

const HeaderDivContent = ({ divClass, spanClass, spanId, text }) => {
  return `
        <div class="${divClass}">
            <span class="${spanClass}" id="${spanId}">${text}</span>
        </div>
    `;
};

const HOME_ID = "menu_home";
const SIGNUP_ID = "menu_signup";

function Header({ target }) {
  const header = createElement({ name: "header" });
  target.appendChild(header);

  const render = () => {
    header.innerHTML = `
            ${HeaderDivContent({
              divClass: "header header_left",
              spanClass: "menu_name",
              spanId: "menu_home",
              text: "HOME",
            })}
            ${HeaderDivContent({
              divClass: "header header_right",
              spanClass: "menu_name",
              spanId: "menu_signup",
              text: "SIGNUP",
            })}
        `;
  };

  header.addEventListener("click", (e) => {
    const span = e.target.closest("span");

    if (!span) return;
    const id = span.id;

    switch (id) {
      case HOME_ID:
        historyPush(ROUTE.HOME);
        break;
      case SIGNUP_ID:
        historyPush(ROUTE.SIGNUP);
        break;
    }
  });

  render();
}

export default Header;
