import { getData } from "./api/api.js";
import Header from "./components/Header.js";
import Home from "./page/Home.js";
import Signup from "./page/Signup.js";
import { getStorage, setStorage } from "./utils/storage.js";

function App({ target }) {
  let homePage = null;
  let signupPage = null;

  const init = async () => {
    try {
      let personalInfo = getStorage("personalInfo", []);
      let cardStatusData = getStorage("cardStatus", []);

      if (personalInfo.length === 0 || cardStatusData.length === 0) {
        const data = await getData();
        personalInfo = data.map((d, i) => ({ ...d, idx: i }));
        cardStatusData = data.map((d, i) => ({
          idx: i,
          status: "card",
        }));
        setStorage("personalInfo", personalInfo);
        setStorage("cardStatus", cardStatusData);
      }

      new Header({ target });

      const main = document.createElement("main");
      main.id = "page_content";
      target.appendChild(main);

      homePage = new Home({ target: main });
      signupPage = new Signup({ target: main });

      document.addEventListener("urlChange", (e) => {
        route();
      });

      route();
    } catch (e) {
      throw new Error(e);
    }
  };

  const route = () => {
    const { pathname } = location;

    const decodePathname = decodeURIComponent(pathname).replace(
      "/과제테스트/인사_정보/1차",
      ""
    );

    if (decodePathname === "/") {
      homePage.render();
    } else if (decodePathname === "/signup") {
      signupPage.render();
    } else {
      target.innerHTML = `
        <h1> 404 Not Found </h1>
      `;
    }
  };

  window.addEventListener("popstate", () => route());

  init();
}

export default App;
