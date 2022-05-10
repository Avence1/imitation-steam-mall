const subuser = document.querySelector(".subuser");
const installsteam = document.querySelector(".installsteam");
const action = document.querySelector(".action");
const wishlist = document.querySelector(".wishlist");
const userlogo = document.querySelector(".yourlogo");
const foryour_store_menu = document.querySelector(".foryour_store_menu");
const div0 = document.createElement("div");
const left = document.querySelector(".left");
const url = "http://127.0.0.1:4010/";

let authData,
  inCartNumber,
  inWishlistNumber,
  inCartGames,
  addToCart,
  getCartGames,
  removeItem,
  removeAll;

init();
async function init() {
  authData = await auth("online");
  div0.className = "renderBox";
  if (authData.result) {
    inCartNumber = await auth("inCartNumber", {
      accountName: authData.data.accountName,
    });
    inWishlistNumber = await auth("inWishlistNumber", {
      accountName: authData.data.accountName,
    });
    inCartGames = await auth("inCartGames", {
      accountName: authData.data.accountName,
    });
    getCartGames = await auth("getCartGames", {
      accountName: authData.data.accountName,
      ids: inCartGames.data,
    });
    console.log(getCartGames.data);
    renderOnline();
    const pullDown = document.querySelector("#account_pulldown");
    pullDown.addEventListener("click", pulldownHandler);
  } else {
    renderOffline();
  }
  renderCart();
}
async function auth(router, body = {}) {
  let data = await fetch(url + "auth/" + router, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  data = await data.json();
  return data;
}
function renderOnline() {
  subuser.innerHTML = `
  <a href="javascript:void(0);" class="menuitem username">${authData.data.accountName}</a>
  <ul class="submenu_username">
      <li><a href="javascript:void(0);" class="submenuitem">动态</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">个人资料</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">好友</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">组</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">内容</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">徽章</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">库存</a></li>
  </ul>`;
  div0.innerHTML = `
  <div class="notification">
    <img src="../img/notification_envelope.png" width="11" height="8">
  </div>
  <div class="account_dropdown">
    <span id="account_pulldown" class="btn_arrow_down">${authData.data.accountName}</span>
    <div class="box" style="display:none">
      <div class="usermenu">
        <a href="javascript:void(0);" class="usermenuitem">查看个人资料</a>
        <a href="javascript:void(0);" class="usermenuitem">账户明细</a>
        <a href="javascript:void(0);" id="signout" class="usermenuitem">
          注销:
          <span class="user_online">${authData.data.accountName}</span>
        </a>
        <a href="javascript:void(0);" class="usermenuitem">偏好</a>
        <a href="javascript:void(0);" class="usermenuitem">更改语言</a>
      </div>
    </div>
  </div>
  <div class="wallet">
      <a href="javascript:void(0);" class="user_online_wallet">￥0.00</a>
  </div>
  <a href="javascript:void(0);" class="userlogo">
      <img src="https://store.st.dl.pinyuncloud.com/public/shared/images/header/logo_steam.svg?t=962016" alt="用户头像">
  </a>`;
  action.appendChild(div0);
  installsteam.style.backgroundColor = "#616a72";
  wishlist.innerHTML = `<a href="./wishlist.html" class="wishlistbtn">愿望单( <span class="wishlist_value">${
    inWishlistNumber.result ? inWishlistNumber.data : 0
  }</span> )</a><a href="./cart.html" class="cartbtn">购物车( <span class="cart_value">${
    inCartNumber.result ? inCartNumber.data : 0
  }</span> )</a>`;
}
function renderOffline() {
  subuser.innerHTML = ``;
  div0.innerHTML = `<a href="./signin.html" class="signin">登录</a> | <span class="language">语言</span>`;
  action.appendChild(div0);
  installsteam.style.backgroundColor = "#5c7e10";
  wishlist.style.display = "none";
  location.href = "../index.html";
}
function pulldownHandler(e) {
  const box = document.querySelector(".box");
  box.style.display = box.style.display === "none" ? "block" : "none";
  if (box.style.display === "block") {
    const signout = document.querySelector("#signout");
    signout.addEventListener("click", signoutHandler);
  }
}
async function signoutHandler(e) {
  let data = await auth("signout", {
    accountName: authData.data.accountName,
  });
  data.result ? renderOffline() : renderOnline();
}
function renderCart() {
  left.innerHTML = getCartGames.data.reduce((prev, item) => {
    return (
      prev +
      `<div class="cart">
    <img src="../img/carousel_img/main${item.gameId + 1}.jpg">
    <a href="javascript:void(0);" class="gameName">${item.gameName}</a>
    <div class="platform">
        ${item.platForm.reduce((p, t) => {
          return p + `<div class="platform_icon ${t}"></div>`;
        }, "")}
    </div>
    <div class="price">
        ${
          item.isDiscount
            ? `<div class="origin_price">${item.origin_price}</div>`
            : ``
        }
        <div class="finall_price">${item.finall_price}</div>
        <a href="javascript:void(0);" class="remove"data-id="${
          item.gameId
        }">移除</a>
    </div>
</div>
`
    );
  }, "");
  let cart_price = getCartGames.data.reduce((prev, item) => {
    return prev + Number(item.finall_price.slice(1));
  }, 0);
  left.innerHTML += `<div class="buy">
  <div class="total">
      <div class="cart_title">预计总额<sup>1</sup></div>
      <div class="cart_price">￥${cart_price.toFixed(2)}</div>
  </div>
  <div class="choose">为自己购买还是作为礼物购买?&nbsp;&nbsp;选择一项以继续付款</div>
  <div class="buy_for clear_fix">
      <div class="buy_for_gift">
          作为礼物购买
      </div>
      <div class="buy_for_self">
          为自己购买
      </div>
  </div>
</div>
<div class="desc"><sup>1</sup>&nbsp;&nbsp;&nbsp;<span>所有的价格都已包含增值税(如适用)</span></div>
<div class="left_footer">
  <div class="buy_continue"><a href="../index.html">继续购物</a></div>
  <a href="javascript:void(0);" class="remove_all">移除所有物品</a>
</div>
<br>
<br>
<div class="digital">
  <h2>交付</h2>
  <div class="notice">
      <img src="../img/ico_steam_cart.png" width="68px" height="57px">
      <div class="notice_content">
          <h4>所有电子商品将会通过Steam桌面应用程序交付。</h4>
          <p>本次购买结束后，您将可以下载Steam和您所购买的游戏</p>
      </div>
  </div>
</div>`;
  removeItem = document.querySelectorAll(".remove");
  removeAll = document.querySelector(".remove_all");
  removeItem.forEach((item) =>
    item.addEventListener("click", removeItemHandler)
  );
  removeAll.addEventListener("click", removeAllHandler);
}
async function removeAllHandler(e) {
  await fetch(url + "removeItem/all", {
    method: "POST",
    body: JSON.stringify({
      accountName: authData.data.accountName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  init();
}
async function removeItemHandler(e) {
  let id = parseInt(e.target.dataset.id);
  await fetch(url + "removeItem/cart", {
    method: "POST",
    body: JSON.stringify({
      gameId: id,
      accountName: authData.data.accountName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  init();
}
