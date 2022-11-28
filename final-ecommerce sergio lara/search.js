import { getsearchmarket } from "./api.js";
import { createMarketCard } from "./createMarketCard.js";
const search = window.location.search;

getsearchmarket(search).then((data) => {
  const containerCards = document.querySelector("#container-card");
  data.forEach((e) => {
    containerCards.innerHTML += createMarketCard(e);
  });
});
