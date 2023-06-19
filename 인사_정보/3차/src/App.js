import Header from "./components/common/Header.js";
import Home from "./page/Home.js";
import Signup from "./page/Signup.js";
import { ROUTE, STORAGE } from "./utils/constants.js";
import createElement from "./utils/createElement.js";
import { addHistoryEventWindow } from "./utils/route.js";
import { getStorage, setStorage } from "./utils/storage.js";

function App({ target }) {
  let homePage = null;
  let signupPage = null;
  let pageContainer = null;

  const getDataFromAPIAndLocalStorage = async () => {
    const personalInfo = getStorage(STORAGE.PERSONAL_INFO, []);
    const cardStatus = getStorage(STORAGE.CARD_STATUS, []);

    if (personalInfo.length === 0 || cardStatus.length === 0) {
      const data = await getData("/new_data.json");

      personalInfo = data.map(({ d, i }) => ({ ...d, idx: i }));
      cardStatus = data.map(({ d, i }) => ({ idx: i, status: "card" }));

      setStorage(STORAGE.PERSONAL_INFO, personalInfo);
      setStorage(STORAGE.CARD_STATUS, cardStatus);
    }

    return { personalInfo, cardStatus };
  };

  const route = async () => {
    const { pathname } = location;
    const { personalInfo, cardStatus } = await getDataFromAPIAndLocalStorage();

    if (pageContainer) pageContainer.innerHTML = "";

    switch (pathname) {
      case ROUTE.HOME:
        homePage.render({ personalInfo, cardStatus });
        break;
      case ROUTE.SIGNUP:
        signupPage.render();
        break;
    }
  };

  const init = async () => {
    new Header({ target });

    pageContainer = createElement({ name: "main", id: "page_content" });
    target.appendChild(pageContainer);

    homePage = new Home({ target: pageContainer });
    signupPage = new Signup({ target: pageContainer });

    try {
      await getDataFromAPIAndLocalStorage();
    } catch (e) {
      throw new Error(e);
    }

    addHistoryEventWindow(route);
    route();
  };

  init();
}

export default App;
