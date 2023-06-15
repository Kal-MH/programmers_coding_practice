function Card({ idx, frontValue, backValue, status }) {
  const cardContainer = `
        <div idx="${idx}" data-idx=${idx} class="${status}">
            <div class="card_plane card_plane--front">${frontValue}</div>
            <div class="card_plane card_plane--back">${backValue}</div>
        </div>
    `;

  return cardContainer;
}

export default Card;
