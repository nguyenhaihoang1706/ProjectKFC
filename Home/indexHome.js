const quantity = document.querySelector(".quantity");
let listCart;

let cart = JSON.parse(localStorage.getItem("cart"));
if (cart) {
  listCart = cart;
} else {
  listCart = [];
}

function loadCartHome() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    quantity.innerHTML = cart.length;
  }
}
