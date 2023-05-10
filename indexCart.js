const newProduct = [
  {
    id: 1,
    img: "./assets/image/newproduct/1.jpeg",
    name: "1 Golden Egg Chicken",
    price: 41000,
    decription: "1 Golden Egg Chicken",
    group: "New-Product",
  },
  {
    id: 2,
    img: "./assets/image/newproduct/1.jpeg",
    name: "2 Golden Egg Chicken",
    price: 79000,
    decription: "2 Golden Egg Chicken",
    group: "New-Product",
  },
  {
    id: 3,
    img: "./assets/image/newproduct/1.jpeg",
    name: "3 Golden Egg Chicken",
    price: 117000,
    decription: "1 Golden Egg Chicken",
    group: "New-Product",
  },
  {
    id: 4,
    img: "./assets/image/newproduct/1.jpeg",
    name: "6 Golden Egg Chicken",
    price: 231000,
    decription: "6 Golden Egg Chicken",
    group: "New-Product",
  },
  {
    id: 5,
    img: "./assets/image/newproduct/1.jpeg",
    name: "Ga Oc Que",
    price: 45000,
    decription: "Ga Oc Que",
    group: "Combo-for-1",
  },
  {
    id: 6,
    img: "./assets/image/newproduct/1.jpeg",
    name: "Ga Oc Que A",
    price: 78000,
    decription: "01 Ga Oc Que + 04 Nuggets",
    group: "Combo-for-1",
  },
  {
    id: 7,
    img: "./assets/image/combo for 1/D1-new.jpeg",
    name: "Combo Fried Chicken",
    price: 89000,
    decription: "2 Fried Chicken + 1 FF (R) /2 Nuggets + 1 Lipton Regular",
    group: "Combo-for-1",
  },
  {
    id: 8,
    img: "./assets/image/combo for 1/D2-new.jpeg",
    name: "Combo Spaghetti",
    price: 89000,
    decription:
      "1 Spaghetti with Tomato Sauce and Popcorn + 1 Fried Chicken/2 Tenderods + 1 Pepsi",
    group: "Combo-for-1",
  },
  {
    id: 9,
    img: "./assets/image/combo for 1/D4-new.jpeg",
    name: "D4 CBO Salad",
    price: 79000,
    decription: "1 Fried Chicken + 1 Salad Hat + 1 Pepsi Can",
    group: "Combo-for-1",
  },
  {
    id: 10,
    img: "./assets/image/combo for 1/D5.jpeg",
    name: "Combo Burger",
    price: 91000,
    decription:
      "1 Burger Zinger/ Burger Flava/ Burger Shrimp + 1 Fried Chicken + 1 Pepsi Can",
    group: "Combo-for-sharing",
  },
  {
    id: 11,
    img: "./assets/image/comboForSharing/CFS1.jpeg",
    name: "Combo For Group 1",
    price: 175000,
    decription: "3 Fried Chicken + 1 Burger Shrimp + 2 Pepsi Can",
    group: "Combo-for-sharing",
  },
  {
    id: 12,
    img: "./assets/image/comboForSharing/CFS2.jpeg",
    name: "Combo Burger",
    price: 195000,
    decription: "4 Fried Chicken + 2 Pumcheese + 2 Pepsi Can",
    group: "Combo-for-sharing",
  },
  {
    id: 13,
    img: "./assets/image/comboForSharing/CFS3.jpeg",
    name: "Combo For Group 3",
    price: 232000,
    decription: "5 Fried Chicken + 1 Pop R /4 Nuggets + 2 Pepsi Can",
    group: "Combo-for-sharing",
  },
];

const quantity = document.querySelector(".quantity");
let cartQuantity = document.querySelectorAll(".cart-quantity");

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
  let cart = JSON.parse(localStorage.getItem("cart"));
  let productEle = document.querySelector(".cart-left");
  if (cart) {
    cart.forEach((item2, key) => {
      let divCart = document.createElement("div");
      divCart.innerHTML += `
          <div class="cart-item">
               <div class="cart-describe">
                   <img src="${item2.img}" alt="">
                   <div class="cart-detail">
                       <span class="cart-title">${item2.name}</span>
                       <a onclick=delCart(${item2.id}) class="cart-remove" href="">Remove</a>
                   </div>
               </div>  
               <div class="cart-control">
                   <button onclick='decrease(${item2.id})' class="btn-decrease">-</button>
                   <p class="cart-quantity">${item2.quantity}</p>
                   <button onclick='increase(${item2.id})' style="border-color: #000;" class="btn-increase">+</button>
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
  for (let i = 0; i < listCart.length; i++) {
    if (listCart[i].id === productId) {
      let sl = listCart[i].quantity++;
      cartQuantity.forEach((itemqua) => {
        itemqua.innerHTML = sl;
        renderSubTotal();
      });
    }
  }
  localStorage.setItem("cart", JSON.stringify(listCart));
  let cart = JSON.parse(localStorage.getItem("cart"));
}

function decrease(productId) {
  let cartQuantity = document.querySelectorAll(".cart-quantity");
  for (let i = 0; i < listCart.length; i++) {
    if (listCart[i].id === productId && listCart[i].quantity > 1) {
      let sl = listCart[i].quantity--;
      cartQuantity.forEach((itemqua) => {
        itemqua.innerHTML = sl;
        renderSubTotal();
      });
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
