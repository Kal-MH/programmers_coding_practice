import CardView from "../components/CardView.js";
import Title from "../components/Title.js";
import { getStorage, setStorage } from "../utils/storage.js";

function Home({ target }) {
  this.render = () => {
    target.innerHTML = "";

    const personalInfo = getStorage("personalInfo", []);
    const cardsStatusData = getStorage("cardStatus", []);
    const cardsData = personalInfo.map((p, i) => ({
      name: p.name,
      mbti: p.mbti,
      idx: p.idx,
      status: cardsStatusData[i].status,
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
        cardsStatusData[idx].status = classList;
        setStorage("cardStatus", cardsStatusData);
      },
    });
  };
}

export default Home;
