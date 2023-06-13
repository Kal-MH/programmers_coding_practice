import { getData } from "./api/api.js";
import Header from "./components/Header.js";
import Home from "./page/Home.js";
import Signup from "./page/Signup.js";
import { setStorage } from "./utils/storage.js";

function App({ target }) {
  const header = new Header({ target });

  const main = document.createElement("main");
  main.id = "page_content";
  target.appendChild(main);

  const homePage = new Home({ target: main });
  const signupPage = new Signup({ target: main });
  homePage.render();

  document.addEventListener("urlChange", (e) => {
    const { href } = e.detail;

    switch (href) {
      case "/":
        homePage.render();
        break;
      case "/signup":
        signupPage.render();
        break;
      default:
        break;
    }
  });

  const init = async () => {
    try {
      const data = await getData();

      setStorage("personalInfo", data);
    } catch (e) {
      throw new Error(e);
    }
  };

  init();
}

export default App;
