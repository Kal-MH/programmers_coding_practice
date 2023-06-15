import CardView from "../components/Home/CardView.js";
import Title from "../components/Title.js";
import { setStorage } from "../utils/storage.js";

function Home({ target }) {
  this.render = ({ personalInfo, cardStatusData }) => {
    target.innerHTML = "";

    const cardsData = personalInfo.map((p, i) => ({
      name: p.name,
      mbti: p.mbti,
      idx: p.idx,
      status: cardStatusData[i].status,
    }));

    new Title({
      target,
      titleText: "Great PeoPle",
      divClass: "content_title",
    });

    new CardView({
      target,
      cardsData,
      onClick: (idx, classList) => {
        cardStatusData[idx].status = classList;
        setStorage("cardStatus", cardStatusData);
      },
    });
  };
}

export default Home;
