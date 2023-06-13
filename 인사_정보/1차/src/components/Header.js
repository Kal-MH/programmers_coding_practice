function Header({ target }) {
  const header = document.createElement("header");
  target.appendChild(header);

  const createHeaderMenu = (
    divClass = "",
    spanClass = "",
    spanId = "",
    menu
  ) => {
    return `
        <div ${divClass ? `class="${divClass}"` : ""}>
            <span ${spanClass ? `class="${spanClass}"` : ""}${
      spanId ? `class="${spanId}"` : ""
    }>${menu}</span>
        </div>
    `;
  };

  const render = () => {
    header.innerHTML = `
        ${createHeaderMenu(
          "header header_left",
          "menu_name",
          "menu_home",
          "HOME"
        )}
        ${createHeaderMenu(
          "header header_right",
          "menu_name",
          "menu_signup",
          "SIGNUP"
        )}
        `;
  };

  const init = () => {
    header.addEventListener("click", (e) => {
      const clickedSpan = e.target.closest("span");

      if (!clickedSpan) return;

      const text = clickedSpan.textContent;

      switch (text) {
        case "HOME":
          window.history.pushState("", "", "/");
          const homeEvent = new CustomEvent("urlChange", {
            detail: { href: "/" },
          });
          document.dispatchEvent(homeEvent);
          break;
        case "SIGNUP":
          window.history.pushState("", "", "/signup");
          const signupEvent = new CustomEvent("urlChange", {
            detail: { href: "/signup" },
          });
          document.dispatchEvent(signupEvent);
          break;
        default:
          break;
      }
    });

    render();
  };

  init();
}

export default Header;
