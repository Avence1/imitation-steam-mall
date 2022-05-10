const subuser = document.querySelector(".subuser");
const div0 = document.createElement("div");
const action = document.querySelector(".action");
const wishlist = document.querySelector(".wishlist");
const installsteam = document.querySelector(".installsteam");
const foryour_store_menu = document.querySelector(".foryour_store_menu");
const userlogo = document.querySelector(".yourlogo");
const itemName = document.querySelector(".page_header>h2");
const carousel = document.querySelector(".carousel");
const selector = document.querySelector(".selector");
const img_zoom = document.querySelector(".img_zoom");
const sliders = document.querySelectorAll(".btn");
const handle = document.querySelector(".handle");
const slider = document.querySelector(".slider");
const please_signin = document.querySelector(".please_signin");
const mate = document.querySelector(".mate");
const buy = document.querySelector(".buy");
const carousel_left = document.querySelector(".main_desc>.left");
const to_see_all = document.querySelector(".to_see_all");
const url = "http://127.0.0.1:4010/";
let authData,
  DauthDataData,
  prevIndex,
  num,
  nowIndex = 0,
  handleMove = false,
  selectorIndex = 0,
  authGame,
  authWishlist,
  inWishlistNumber,
  inCartNumber,
  timers;

init();
async function init() {
  timers ? clearInterval(timers) : "";
  div0.className = "renderBox";
  img_zoom.style.transition = `left 0.5s linear`;
  handle.style.transition = `left 0.5s linear`;
  selector.style.transition = `left 0.5s linear`;
  slider.addEventListener("mousedown", dropsliderHandler);
  slider.addEventListener("mouseup", dropsliderHandler);
  slider.addEventListener("mousemove", dropsliderHandler);
  img_zoom.addEventListener("click", carouselClickHandler);
  carousel_left.addEventListener("mouseover", MouseHandler);
  carousel_left.addEventListener("mouseleave", MouseHandler);
  sliders.forEach((item) =>
    item.addEventListener("click", slidersClickHandler)
  );
  gameData = await fetch(url + "getGame", {
    method: "POST",
    body: JSON.stringify({ data: sessionStorage.gameName }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  gameData = await gameData.json();
  authData = await auth("online");
  if (authData.result) {
    inWishlistNumber = await auth("inWishlistNumber", {
      accountName: authData.data.accountName,
    });
    inCartNumber = await auth("inCartNumber", {
      accountName: authData.data.accountName,
    });
    authGame = await auth("inCart", {
      accountName: authData.data.accountName,
      gameId: gameData.result[0].gameId,
    });
    authWishlist = await auth("inWishlist", {
      accountName: authData.data.accountName,
      gameId: gameData.result[0].gameId,
    });
    renderOnline();
    const pullDown = document.querySelector("#account_pulldown");
    pullDown.addEventListener("click", pulldownHandler);
  } else {
    renderOffline();
  }
  renderContent();
  changePrev();
  timers = setInterval(() => {
    let evt = new Event("click");
    sliders[1].dispatchEvent(evt);
  }, 3000);
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
  please_signin.innerHTML = authWishlist.result
    ? "在愿望单中"
    : "添加至愿望单中";
  please_signin.addEventListener("click", addToWishlist);
  console.log(authWishlist.result);
  mate.style.display = "none";
  wishlist.innerHTML = `<a href="./wishlist.html" class="wishlistbtn">愿望单( <span class="wishlist_value">${
    inWishlistNumber.result ? inWishlistNumber.data : 0
  }</span> )</a><a href="./cart.html" class="cartbtn">购物车( <span class="cart_value">${
    inCartNumber.result ? inCartNumber.data : 0
  }</span> )</a>`;
}
function renderOffline() {
  subuser.innerHTML = ``;
  div0.innerHTML = `<a href="./signin.html" class="signin">登录</a> | <span class="language">语言</span>`;
  foryour_store_menu.innerHTML = `
  <ul class="menu_header">
  <li><a href="javascript:void(0);">主页</a></li>
  <li><a href="javascript:void(0);">社区推荐</a></li>
  <li><a href="javascript:void(0);">最近查看过</a></li>
  <li><a href="javascript:void(0);">Steam鉴赏家</a></li>
  </ul>`;
  action.appendChild(div0);
  installsteam.style.backgroundColor = "#5c7e10";
  please_signin.innerHTML =
    '想要将此项目添加至您的愿望单或购物车，请先<a href="./signin.html">登录</a>';
  mate.style.display = "block";
  userlogo.style.display = "none";
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
function renderContent() {
  itemName.innerText = gameData.result[0].gameName;
  buy.innerHTML = `
  <div class="float_area clear_fix">
    <h1>购买 ${gameData.result[0].gameName}</h1>
    <div class="platform">
    ${gameData.result[0].platForm.reduce((prev, item) => {
      return (
        prev +
        `<div class=${item}><img src="../img/icon_platform_${item}.png"></div>`
      );
    }, "")}
    </div>
  </div>
  
  <div class="dis">${
    gameData.result[0].isDiscount ? "特价促销! 5月12日 截止" : ""
  }</div>
  <div class="discount">
    ${
      gameData.result[0].isDiscount
        ? `<div class="discount_pct">${gameData.result[0].discount_pct}</div>`
        : ""
    }
    <div class="price">
        ${
          gameData.result[0].isDiscount
            ? `<div class="origin_price">${gameData.result[0].origin_price}</div>`
            : ``
        }
        <div class="finall_price">${gameData.result[0].finall_price}</div>
    </div>
    <div class="cart">${
      authData.result
        ? authGame.result
          ? "在购物车中"
          : "添加至购物车"
        : "添加至购物车"
    }</div>
  </div>`;
  to_see_all.innerText = `在Steam上查看"${gameData.result[0].gameName}"全系列作品`;
  const cart = document.querySelector(".cart");
  cart.addEventListener("click", addToCartHandler);
}
function carouselClickHandler(e) {
  nowIndex = [...this.children].findIndex((item) => item === e.target);
  num = Math.abs(prevIndex - nowIndex);
  selector.style.transition = `left ${0.5 * (num / 5)}s linear`;
  selectorIndex = nowIndex > 4 ? 4 : nowIndex;
  judge(prevIndex - nowIndex > 0 ? "prev" : "next");
  changePrev();
  changeSelector();
}
function changePrev() {
  if (prevIndex >= 0) {
    [...carousel.children][prevIndex].style.opacity = 0;
  }
  prevIndex = nowIndex;
  [...carousel.children][prevIndex].style.opacity = 1;
}
function changeSelector() {
  selector.style.left = 20 * selectorIndex + "%";
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
function slidersClickHandler(e) {
  if (e.target === sliders[0]) {
    nowIndex--;
    selectorIndex--;
    nowIndex = nowIndex < 0 ? 7 : nowIndex;
    judge("prev");
  } else if (e.target === sliders[1]) {
    nowIndex++;
    selectorIndex++;
    nowIndex = nowIndex > 7 ? 0 : nowIndex;
    judge("next");
  }
  changePrev();
  changeSelector();
}
function dropsliderHandler(e) {
  if (e.type === "mousedown" && e.target === handle) {
    handleMove = true;
  }
  if (e.type === "mouseup") {
    handleMove = false;
  }
  if (e.type === "mousemove" && handleMove) {
    handle.style.left = e.clientX - 328 - 30 + "px";
    handle.style.left =
      parseInt(handle.style.left) < 0 ? "0px" : handle.style.left;
    handle.style.left =
      parseInt(handle.style.left) > 465 ? "465px" : handle.style.left;
  }
}
function judge(state) {
  switch (state) {
    case "prev":
      switch (nowIndex) {
        case 3:
          selectorIndex = 1;
          img_zoom.style.left = "-40%";
          handle.style.left = "60%";
          break;
        case 2:
          selectorIndex = 1;
          img_zoom.style.left = "-20%";
          handle.style.left = "30%";
          break;
        case 1:
          selectorIndex = 1;
          img_zoom.style.left = "0";
          handle.style.left = "0";
          break;
        case 7:
          selectorIndex = 4;
          img_zoom.style.left = "-60%";
          handle.style.left = "89%";
          break;
      }
      break;
    case "next":
      switch (nowIndex) {
        case 4:
          selectorIndex = 3;
          img_zoom.style.left = "-20%";
          handle.style.left = "30%";
          break;
        case 5:
          selectorIndex = 3;
          img_zoom.style.left = "-40%";
          handle.style.left = "60%";
          break;
        case 6:
          selectorIndex = 3;
          img_zoom.style.left = "-60%";
          handle.style.left = "89%";
          break;
        case 0:
          selectorIndex = 0;
          img_zoom.style.left = "0";
          handle.style.left = "0";
          break;
      }
      break;
  }
}
async function addToCartHandler(e) {
  if (e.target.innerText === "在购物车中") return;
  if (!authData.result) {
    alert("请登陆后重试");
  } else {
    let data = await auth("addToCart", {
      gameId: gameData.result[0].gameId,
      accountName: authData.data.accountName,
    });
  }
  init();
}
async function addToWishlist(e) {
  if (e.target.innerText === "在愿望单中") return;
  if (!authData.result) {
    alert("请登陆后重试");
  } else {
    let data = await auth("addToWishlist", {
      gameId: gameData.result[0].gameId,
      accountName: authData.data.accountName,
    });
  }
  init();
}

function MouseHandler(e) {
  e.type === "mouseover" ? clearInterval(timers) : "";
  e.type === "mouseleave"
    ? (timers = setInterval(() => {
        let evt = new Event("click");
        sliders[1].dispatchEvent(evt);
      }, 3000))
    : "";
}
