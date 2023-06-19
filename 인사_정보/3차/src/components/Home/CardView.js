import createElement from "../../utils/createElement.js";

function Card({ idx, name, mbti, status }) {
  return `
        <div idx="${idx}" data-idx="${idx}"class="${status}">
          <div class="card_plane card_plane--front">${name}</div>
          <div class="card_plane card_plane--back">${mbti}</div>
        </div>
    `;
}

function CardView({ target, cardViewData, onClick }) {
  const container = createElement({ name: "div", id: "cards_container" });
  target.appendChild(container);

  container.innerHTML = `
        ${cardViewData
          .map(
            ({ idx, name, mbti, status }) =>
              `${Card({ idx, name, mbti, status })}`
          )
          .join("")}

    `;

  container.addEventListener("click", (e) => {
    const card = e.target.closest(".card");

    if (!card) return;

    const classArr = Array.from(card.classList);
    const idx = card.dataset.idx;

    if (classArr.includes("is-flipped")) {
      card.classList.remove("is-flipped");
      onClick({ idx, status: "card" });
    } else {
      card.classList.add("is-flipped");
      onClick({ idx, status: "card is-flipped" });
    }
  });
}

export default CardView;
