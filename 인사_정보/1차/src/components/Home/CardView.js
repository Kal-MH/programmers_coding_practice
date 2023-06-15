import Card from "./Card.js";

function CardView({ target, cardsData, onClick }) {
  const div = document.createElement("div");
  div.id = "cards_container";
  target.appendChild(div);

  const render = () => {
    div.innerHTML = `
        ${cardsData
          .map(({ idx, name, mbti, status }) =>
            Card({ idx, frontValue: name, backValue: mbti, status })
          )
          .join("")}
    `;
  };

  const init = () => {
    div.addEventListener("click", (e) => {
      const card = e.target.closest(".card");

      if (!card) return;

      const classArr = Array.from(card.classList);
      const idx = parseInt(card.dataset.idx);

      if (classArr.includes("is-flipped")) {
        card.classList.remove("is-flipped");
        onClick(idx, [...card.classList].join(" "));
      } else {
        card.classList.add("is-flipped");
        onClick(idx, [...card.classList].join(" "));
      }
    });

    render();
  };

  init();
}

export default CardView;
