import CardView from "../components/CardView.js";
import Title from "../components/Title.js";
import { getStorage } from "../utils/storage.js";

function Home({ target }) {
  this.render = () => {
    target.innerHTML = "";

    const cardsData = getStorage("personalInfo", []);

    new Title({
      target,
      titleText: "Great PeoPle",
      divClass: "content_title",
    });

    new CardView({ target, cardsData });
  };
}

export default Home;
