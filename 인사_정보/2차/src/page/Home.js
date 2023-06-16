import CardView from "../components/Home/CardView.js";
import Title from "../components/common/Title.js";
import { STORAGE } from "../utils/constants.js";
import { getStorage, setStorage } from "../utils/storage.js";

function Home({ target }) {
  this.render = ({ personalInfo, cardStatus }) => {
    target.innerHTML = ``;

    const cardViewData = personalInfo.map(({ idx, name, mbti }, i) => ({
      name,
      idx,
      mbti,
      status: cardStatus[i].status,
    }));

    new Title({ target, text: "CardView" });
    new CardView({
      target,
      cardViewData,
      onClick: ({ idx, status }) => {
        const cardStatus = getStorage(STORAGE.CARD_STATUS, []);
        cardStatus[idx].status = status;

        setStorage(STORAGE.CARD_STATUS, cardStatus);
      },
    });
  };
}

export default Home;
