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


const quantity = document.querySelector('.quantity');


function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function render(product) {
  const productEle2 = document.querySelector(".newProduct-grid");
  const item = `
                <div class="newProduct-items">
                  <img src="${product.img}" alt="" />
                  <div class="newProduct-items-title">
                    <div class="title">${product.name}</div>
                    <div class="price">${numberWithCommas(product.price)}₫</div>
                  </div>
                  <div class="newProduct-items-describe">
                        ${product.decription}
                  </div>
                  <span class="newProduct-items-info"></span>
                  <button onClick="addToCart(${product.id})" class="btn">Add</button>
                </div>
  `;
  productEle2.innerHTML += item;
}

function getFilter(item,group) {
  return item.filter((fil) => fil.group === group);
}
    

const newProductGroup = getFilter(newProduct, "New-Product");
const comboOne = getFilter(newProduct, "Combo-for-1");
const conboSharing = getFilter(newProduct, "Combo-for-sharing");

function renderItem(item1) {
   const items = `
        <h1 id="group" class="newProduct-heading">${item1.group}</h1>
      `;
    document.querySelector(".newProduct").innerHTML += items;
}

function renderGroup(groupList){
  for (let item of groupList) {
    renderItem(item);
    }
}

renderGroup(newProductGroup);
renderGroup(comboOne);
renderGroup(conboSharing);

function taoSanPham(productLis) {
  for (let product of productLis) {
    render(product);
  }
}

taoSanPham(newProduct);


let listCart;

let cart = JSON.parse(localStorage.getItem('cart'));
  if(cart){
    listCart = cart  
  }else{
    listCart = [];
  }

   let kkt = 0;
function addToCart(productId) {
 
    const cartItem = listCart.find((items) => items.id === productId);
    if( cartItem){ // !==undefind
        cartItem.quantity++;
    }else{
      const productItem = newProduct.find((product) => product.id === productId);
      listCart.push({...productItem,quantity:1})
    } 
    for(let i = 0;i<listCart.length;i++){
      if(listCart[i].id == productId){
        listCart[i].quantity+1;
    }
    localStorage.setItem('cart',JSON.stringify(listCart));
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart){
      quantity.innerHTML = cart.length;
    }
  }
    
}

function loadCartHome(){
  let cart = JSON.parse(localStorage.getItem('cart'));
  if(cart){
    quantity.innerHTML = cart.length;
  }
}

