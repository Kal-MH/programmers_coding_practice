import Card from "./Card.js";

function CardView({ target, cardsData }) {
  const div = document.createElement("div");
  div.id = "cards_container";
  target.appendChild(div);

  const render = () => {
    div.innerHTML = `
        ${cardsData
          .map(({ name, mbti }, idx) =>
            Card({ idx: idx + 1, frontValue: name, backValue: mbti })
          )
          .join("")}
    `;
  };

  render();
}

export default CardView;
