
const quantity = document.querySelector(".quantity");

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

let listCart;

let cart = JSON.parse(localStorage.getItem("cart"));
if (cart) {
  listCart = cart;
} else {
  listCart = [];
}

function renderCart() {
  let productEle = document.querySelector(".cart-left");
  if (listCart) {
    listCart.forEach((item2, key) => {
      let divCart = document.createElement("div");
      divCart.innerHTML += `
          <div class="cart-item">
               <div class="cart-describe">
                   <img src="${item2.img}" alt="">
                   <div class="cart-detail">
                       <span class="cart-title">${item2.name}</span>
                       <a onclick=delCart(${
                         item2.id
                       }) class="cart-remove" href="">Remove</a>
                   </div>
               </div>  
               <div class="cart-control">
                   <button onclick='decrease(${
                     item2.id
                   })' class="btn-decrease">-</button>
                 <p class="d-flex cart-quantity" id='${item2.id}-quantity'>${
        item2.quantity
      }</p>
                   <button onclick='increase(${
                     item2.id
                   })' style="border-color: #000;" class="btn-increase">+</button>
                   <p class="cart-price">${numberWithCommas(item2.price)}</p>
               </div>
           </div>
             `;
      productEle.appendChild(divCart);
    });
  }
}
renderCart();

function increase(productId) {
  let cartQuantity = document.querySelectorAll(".cart-quantity");
  let oldQuantity = document.getElementById(`${productId}-quantity`);
  for (let i = 0; i < listCart.length; i++) {
    if (listCart[i].id === productId) {
      let sl = listCart[i].quantity++;
      cartQuantity.forEach((itemqua) => {
        oldQuantity.innerHTML = sl;
        renderSubTotal();
      });
    }
  }
  localStorage.setItem("cart", JSON.stringify(listCart));
  let cart = JSON.parse(localStorage.getItem("cart"));
}

function decrease(productId) {
  let cartQuantity = document.querySelectorAll(".cart-quantity");
   let oldQuantity = document.getElementById(`${productId}-quantity`);
  for (let i = 0; i < listCart.length; i++) {
    if (listCart[i].id === productId && listCart[i].quantity > 1) {
      let sl = listCart[i].quantity--;
      cartQuantity.forEach((itemqua,index) => {
        oldQuantity.innerText = sl;
        renderSubTotal();
      });
      // for (let i = 0; i < cartQuantity.length; i++) {
      //   cartQuantity[i].innerHTML = sl;
      //     renderSubTotal();
      // }
    }
  }
  localStorage.setItem("cart", JSON.stringify(listCart));
  let cart = JSON.parse(localStorage.getItem("cart"));
}

function sum() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  return cart.reduce((total, item2) => {
    return total + item2.price * item2.quantity;

  }, 0);
}
function renderSubTotal() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let productEle = document.querySelector(".cart-item-title");
  if (cart) {
    const total2 = `
        <span>Total:</span>
        <span>${numberWithCommas(sum())}</span>
        `;
    productEle.innerHTML = total2;
  }
}
renderSubTotal();

function loadProduct() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    quantity.innerHTML = cart.length;
  }
}

function delCart(productId) {
  localStorage.removeItem("cart");
}
