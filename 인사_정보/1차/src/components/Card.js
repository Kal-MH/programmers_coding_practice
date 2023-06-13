function Card({ idx, frontValue, backValue }) {
  const cardContainer = `
        <div idx="${idx}" class="card">
            <div class="card_plane card_plane--front">${frontValue}</div>
            <div class="card_plane card_plane--back">${backValue}</div>
        </div>
    `;

  return cardContainer;
}

export default Card;
