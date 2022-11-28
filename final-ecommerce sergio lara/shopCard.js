import { getsearchmarket, productUpdate } from "./api.js";
import { createMarketCard } from "./createMarketCard.js";

let search = "?isToBuy=true";

const buttons = (e) => {
  return `<form id="${e.id}" class="buttons-cant">
        <button type="button" id="sumar">+</button>
        <p>${e.itemsToBuy}</p>
         <button type="button" id="restar">-</button>
        <button type="button" id="eliminar">x</button>

    </form>
    
`;
};

const addEvent = () => {
  const formList = Array.prototype.slice.call(
    document.querySelectorAll(".buttons-cant")
  );
  formList.forEach((form) => {
    form.addEventListener("click", async (e) => {
      const id = form.getAttribute("id");
      const product = await getsearchmarket("/" + id);
      console.log(product.isToBuy);

      if (e.target.innerHTML === "+") {
        await productUpdate(id, {
          itemsToBuy: parseInt(product.itemsToBuy) + 1,
        });
      } else if (e.target.innerHTML === "-") {
        await productUpdate(id, {
          itemsToBuy: parseInt(product.itemsToBuy) - 1,
        });
      } else if (e.target.innerHTML === "x") {
        await productUpdate(id, { isToBuy: !product.isToBuy, itemsToBuy: 0 });
      }
      window.location.reload();
    });
  });
};

getsearchmarket(search).then((data) => {
  const container = document.querySelector("#container-cards");
  data.forEach((e) => {
    const card = createMarketCard(e, buttons(e));
    container.innerHTML += card;
  });
  addEvent();
});
