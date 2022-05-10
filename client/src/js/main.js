const subuser = document.querySelector(".subuser");
const installsteam = document.querySelector(".installsteam");
const action = document.querySelector(".action");
const wishlist = document.querySelector(".wishlist");
const userlogo = document.querySelector(".yourlogo");
const foryour_store_menu = document.querySelector(".foryour_store_menu");
const footer = document.querySelector(".set_bgc1");
const div0 = document.createElement("div");
const home_page = document.querySelector(".home_page");
const arrow = document.querySelectorAll(".arrow");
const rigthArrow = document.querySelectorAll(".right");
const leftArrow = document.querySelectorAll(".left");
const appname = document.querySelectorAll(".appname");
const now_state = document.querySelectorAll(".now_state");
const discount = document.querySelectorAll(".discount");
const platform = document.querySelectorAll(".platform");
const carousel_thumbs = document.querySelectorAll(".carousel_thumbs");
const carousel = document.querySelectorAll(".carousel");
const tabs_row = document.querySelector(".tabs_row");
const tab_see_more = document.querySelector(".tab_see_more");
const items = document.querySelector(".items");
const carousel_item = document.querySelectorAll(".carousel_item");
const tabs_item_desc = document.querySelector(".tabs_item_desc");
let carouselmain,
  screenshot,
  prev,
  gamesData,
  tab_item,
  inCartNumber,
  inWishlistNumber;
let originSrc = [],
  timers = [],
  nowSrc = [];
let carouselIndex = [5, 7, 2];

let authData;
const url = "http://127.0.0.1:4010/";

init();
async function init() {
  carousel_item.forEach((item) => item.addEventListener("click", toAppHandler));
  gamesData = await fetch(url + "getGame", {
    method: "POST",
    body: JSON.stringify({ data: "all" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  gamesData = await gamesData.json();
  authData = await auth("online");
  div0.className = "renderBox";
  arrow.forEach((item) => {
    item.addEventListener("click", arrowClickHandler);
  });
  document.querySelectorAll(".right").forEach((item) => {
    let evt = new Event("click");
    let timer = setInterval(() => {
      item.dispatchEvent(evt);
    }, Math.random() * 6000 + 1000);
    timers.push(timer);
  });
  if (authData.result) {
    //登录
    inCartNumber = await auth("inCartNumber", {
      accountName: authData.data.accountName,
    });
    inWishlistNumber = await auth("inWishlistNumber", {
      accountName: authData.data.accountName,
    });
    renderOnline();
    const pullDown = document.querySelector("#account_pulldown");
    pullDown.addEventListener("click", pulldownHandler);
  } else {
    //未登录
    renderOffline();
  }
  carousel.forEach((item, index) => {
    item.addEventListener("mouseenter", (e) => MouseHandler(e, index));
    item.addEventListener("mouseleave", (e) => MouseHandler(e, index));
  });
  carouselmain = document.querySelectorAll(".carousel_main");
  screenshot = document.querySelectorAll(".screenshot");
  screenshot.forEach((item) => {
    [...item.children].forEach((t) => {
      t.addEventListener("mouseenter", imgHandler);
      t.addEventListener("mouseleave", imgHandler);
    });
  });
  renderCarousel();
  carousel_thumbs.forEach((item, index) => {
    item.addEventListener("click", (e) => thumbsClickHandler(e, index));
  });
  prev = tabs_row.firstElementChild;
  changeTab(prev);
  changeItems(prev);
  tabs_row.addEventListener("click", tabsClickHandler);
}
async function auth(router, body = {}) {
  let authData = await fetch(url + "auth/" + router, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  authData = await authData.json();
  return authData;
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
  <img src="./img/notification_envelope.png" width="11" height="8">
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
  wishlist.innerHTML = `<a href="./html/wishlist.html" class="wishlistbtn">愿望单( <span class="wishlist_value">${
    inWishlistNumber.result ? inWishlistNumber.data : 0
  }</span> )</a><a href="./html/cart.html" class="cartbtn">购物车( <span class="cart_value">${
    inCartNumber.result ? inCartNumber.data : 0
  }</span> )</a>`;
  footer.style.display = "none";
}
function renderOffline() {
  subuser.innerHTML = ``;
  div0.innerHTML = `<a href="./html/signin.html" class="signin">登录</a> | <span class="language">语言</span>`;
  foryour_store_menu.innerHTML = `
  <ul class="menu_header">
    <li><a href="javascript:void(0);">主页</a></li>
    <li><a href="javascript:void(0);">社区推荐</a></li>
    <li><a href="javascript:void(0);">最近查看过</a></li>
    <li><a href="javascript:void(0);">Steam鉴赏家</a></li>
  </ul>`;
  action.appendChild(div0);
  installsteam.style.backgroundColor = "#5c7e10";
  wishlist.innerHTML = ``;
  userlogo.style.display = "none";
  footer.style.display = "block";
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
async function imgHandler(e) {
  title =
    e.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.firstElementChild.innerText;
  switch (title) {
    case "精选和推荐":
      carouselmain[0].firstElementChild.style.opacity = 0;
      setTimeout(() => {
        carouselmain[0].firstElementChild.style.opacity = 1;
        e.type === "mouseenter"
          ? (carouselmain[0].firstElementChild.src = e.target.src)
          : (carouselmain[0].firstElementChild.src = originSrc[0]);
        e.type === "mouseenter" ? (nowSrc[0] = e.target.src) : (nowSrc[0] = "");
        renderCarousel();
      }, 200);
      break;
    case "特别优惠":
      carouselmain[1].firstElementChild.style.opacity = 0;
      setTimeout(() => {
        carouselmain[1].firstElementChild.style.opacity = 1;
        e.type === "mouseenter"
          ? (carouselmain[1].firstElementChild.src = e.target.src)
          : (carouselmain[1].firstElementChild.src = originSrc[1]);
        e.type === "mouseenter" ? (nowSrc[1] = e.target.src) : (nowSrc[1] = "");
        renderCarousel();
      }, 200);
      break;
    case "社区推荐 本日推荐游戏":
      carouselmain[2].firstElementChild.style.opacity = 0;
      setTimeout(() => {
        carouselmain[2].firstElementChild.style.opacity = 1;
        e.type === "mouseenter"
          ? (carouselmain[2].firstElementChild.src = e.target.src)
          : (carouselmain[2].firstElementChild.src = originSrc[2]);
        e.type === "mouseenter" ? (nowSrc[2] = e.target.src) : (nowSrc[2] = "");
        renderCarousel();
      }, 200);
      break;
  }
}
async function renderCarousel() {
  originSrc = [];
  carouselmain.forEach((item, index) => {
    nowSrc[index]
      ? (item.firstElementChild.src = nowSrc[index])
      : (item.firstElementChild.src = `./img/carousel_img/main${
          carouselIndex[index] + 1
        }.jpg`);
    originSrc.push(item.firstElementChild.src);
    [...screenshot[index].children].forEach((t, i) => {
      t.src = gamesData.result[carouselIndex[index]].screenshot[i].slice(1);
    });
  });
  appname.forEach((item, index) => {
    item.innerText = gamesData.result[carouselIndex[index]].gameName;
  });
  now_state.forEach((item, index) => {
    item.innerHTML =
      gamesData.result[carouselIndex[index]].state === "现已推出"
        ? `<div class="default">现已推出</div>`
        : `<div class="suggest_foryou">为您推荐,&nbsp;&nbsp;<span>因为您玩过标有一下标签的游戏:</span></div>`;
    item.innerHTML += gamesData.result[carouselIndex[index]].tag.reduce(
      (prev, item, index) => {
        return prev + `<span>${item}</span>`;
      },
      ""
    );
  });
  discount.forEach((item, index) => {
    let str;
    if (gamesData.result[carouselIndex[index]].isDiscount) {
      str = `
      <div class="discount_pct">${
        gamesData.result[carouselIndex[index]].discount_pct
      }</div>
      <div class="discount_price">
        <div class="original_price">${
          gamesData.result[carouselIndex[index]].origin_price
        }</div>
        <div class="finall_price">${
          gamesData.result[carouselIndex[index]].finall_price
        }</div>
      </div>`;
    } else {
      str = `
      <div class="discount_price only">
        <div class="finall_price">${
          gamesData.result[carouselIndex[index]].finall_price
        }</div>
      </div>`;
    }
    item.innerHTML = str;
  });
  platform.forEach((item, index) => {
    item.innerHTML = gamesData.result[carouselIndex[index]].platForm.reduce(
      (prev, t) => {
        return (
          prev +
          `<span class="platform_img ${t}"><img src="./img/icon_platform_${t}.png"></span>`
        );
      },
      ""
    );
  });
  carousel_thumbs.forEach((item, index) => {
    item.innerHTML = gamesData.result.reduce((prev, t, i) => {
      return (
        prev +
        `<div data-id=${i} class=${
          carouselIndex[index] === i ? "focus" : ""
        }></div>`
      );
    }, "");
  });
}
function arrowClickHandler(e) {
  let id = e.target.id ? e.target.id : e.target.parentElement.id;
  switch (id) {
    case "right1":
      carouselIndex[0] = carouselIndex[0] >= 9 ? 0 : carouselIndex[0] + 1;
      break;
    case "left1":
      carouselIndex[0] = carouselIndex[0] <= 0 ? 9 : carouselIndex[0] - 1;
      break;
    case "right2":
      carouselIndex[1] = carouselIndex[1] >= 9 ? 0 : carouselIndex[1] + 1;
      break;
    case "left2":
      carouselIndex[1] = carouselIndex[1] <= 0 ? 9 : carouselIndex[1] - 1;
      break;
    case "right3":
      carouselIndex[2] = carouselIndex[2] >= 9 ? 0 : carouselIndex[2] + 1;
      break;
    case "left3":
      carouselIndex[2] = carouselIndex[2] <= 0 ? 9 : carouselIndex[2] - 1;
      break;
  }
  renderCarousel();
}
function MouseHandler(e, index) {
  if (e.type === "mouseenter") {
    clearInterval(timers[index]);
  } else if (e.type === "mouseleave") {
    let evt = new Event("click");
    timers[index] = setInterval(() => {
      document.querySelectorAll(".right")[index].dispatchEvent(evt);
    }, Math.random() * 6000 + 1000);
  }
}
function thumbsClickHandler(e, index) {
  if (!e.target.dataset.id) return;
  carouselIndex[index] = Number(e.target.dataset.id);
  renderCarousel();
}
function tabsClickHandler(e) {
  if (e.target.parentElement.className !== "tabs_row") return;
  changePrev(e.target);
  changeTab(e.target);
  changeItems(e.target);
}
function changePrev(elem) {
  if (prev) {
    prev.className = "";
    prev = elem;
  }
  prev.className = "click";
}
function changeTab(elem) {
  let str = `查看更多:`;
  switch (elem.innerText) {
    case "新品与热门商品":
      str += `<span class="title">新品</span>`;
      break;
    case "热销商品":
      str += `<span class="title">热销商品</span>或<span class="title">全球热销商品</span>`;
      break;
    case "热门即将推出":
      str += `<span class="title">即将推出</span>`;
      break;
    case "优惠":
      str += `<span class="title">优惠</span>`;
      break;
  }
  tab_see_more.innerHTML = str;
}
function changeItems(elem) {
  items.innerHTML = gamesData.result.reduce((pev, item, index) => {
    return (
      pev +
      `
  <a href="javascript:void(0);" class="tab_item" data-id="${item.gameName}">
    <img src="./img/carousel_img/main${
      index + 1
    }.jpg" class="clear_fix" data-id="${item.gameName}">
    <div class="item_desc" data-id="${item.gameName}">
      <div class="desc_title" data-id="${item.gameName}">${item.gameName}</div>
      <div class="item_icon" data-id="${item.gameName}">
        ${item.platForm.reduce((p, t) => {
          return (
            p +
            `<img src="./img/icon_platform_${t}.png" alt="" data-id="${item.gameName}">`
          );
        }, "")}
      </div>
      <div class="item_tags" data-id="${item.gameName}">
      ${item.tag.reduce((p, t) => {
        return p + `<span data-id="${item.gameName}">${t}</span>`;
      }, "")}
      </div>
    </div>
    ${
      item.isDiscount
        ? `<div class="item_discount" data-id="${item.gameName}">${item.discount_pct}</div><div class="item_price" data-id="${item.gameName}"><div class="item_origin_price" data-id="${item.gameName}">${item.origin_price}</div><div class="item_finall_price" data-id="${item.gameName}">${item.finall_price}</div></div>`
        : `<div class="item_discount" style="background:transparent" data-id="${item.gameName}"></div><div class="item_price" data-id="${item.gameName}"><div class="item_origin_price" data-id="${item.gameName}"></div><div class="item_finall_price" data-id="${item.gameName}">${item.finall_price}</div></div>`
    }
  </a>`
    );
  }, "");
  tab_item = document.querySelectorAll(".tab_item");
  tab_item.forEach((item, index) => {
    item.addEventListener("mouseenter", (e) => changeItemDesc(e, index));
    item.addEventListener("mouseleave", (e) => changeItemDesc(e, index));
    item.addEventListener("click", toAppHandler);
  });
  let evt = new Event("mouseenter");
  tab_item[0].dispatchEvent(evt);
}
function changeItemDesc(e, index) {
  let str = "";
  if (e.type === "mouseenter") {
    e.target.classList.add("active");
    str = `<h2>${gamesData.result[index].gameName}</h2>
    <div class="item_summary">
        <div class="title">总体用户评测:</div>
        <span class="summary positive">${
          gamesData.result[index].appraise
        }</span><span>(177,598)</span>
    </div>
    <div class="tags">
    ${gamesData.result[index].tag.reduce((pev, item) => {
      return pev + `<a href="javascript:void(0);">${item}</a>`;
    }, "")}
    </div>
    ${gamesData.result[index].screenshot.reduce((pev, item) => {
      return (
        pev +
        `<div class="tags_screen_shot" style="background:url(${item.slice(
          1
        )}) no-repeat center/100%"></div>`
      );
    }, "")}`;
    tabs_item_desc.innerHTML = str;
  } else if (e.type === "mouseleave") {
    e.target.classList.remove("active");
  }
}
function toAppHandler(e) {
  if (e.target.className === "appname") {
    sessionStorage.gameName = e.target.innerText;
    location.href = "./html/app.html";
  } else {
    sessionStorage.gameName = e.target.dataset.id;
    location.href = "./html/app.html";
  }
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
