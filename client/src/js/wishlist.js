const subuser = document.querySelector(".subuser");
const installsteam = document.querySelector(".installsteam");
const action = document.querySelector(".action");
const wishlist = document.querySelector(".wishlist");
const userlogo = document.querySelector(".yourlogo");
const foryour_store_menu = document.querySelector(".foryour_store_menu");
const div0 = document.createElement("div");
const title = document.querySelector("head>title");
const wishlistTitle = document.querySelector(".wishlist_header>h2");
const wish_list_ctn = document.querySelector(".wish_list_ctn");
const newmodal_bg = document.querySelector(".newmodal_bg");
const newmodal = document.querySelector(".newmodal");
const comfirm = document.querySelector(".comfirm");
const cancle = document.querySelector(".cancle");
const url = "http://127.0.0.1:4010/";

let nothing_to_see_here = document.querySelector(".nothing_to_see_here");
let authData,
  inCartNumber,
  inWishlistNumber,
  inWishlistGames,
  removeItem,
  addToCart,
  gameItem = [],
  authInCart = [];

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
    inWishlistGames = await auth("inWishlistGames", {
      accountName: authData.data.accountName,
    });
    title.innerText = `${authData.data.accountName}的愿望单`;
    renderOnline();
    renderitem();
    const pullDown = document.querySelector("#account_pulldown");
    pullDown.addEventListener("click", pulldownHandler);
  } else {
    renderOffline();
    nothing_to_see_here.style.display = "block";
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
  wishlistTitle.innerText = `${authData.data.accountName}的愿望单`;
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
async function renderitem() {
  if (inWishlistGames.data.length === 0) {
    nothing_to_see_here = document.querySelector(".nothing_to_see_here");
    nothing_to_see_here.style.display = "block";
    document.querySelector(".wish_row")
      ? (document.querySelector(".wish_row").style.display = "none")
      : "";
    return;
  }
  for (let i = 0; i < inWishlistGames.data.length; i++) {
    let data = await fetch(url + "getGame/byId", {
      method: "POST",
      body: JSON.stringify({ gameId: inWishlistGames.data[i] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await data.json();
    gameItem.push(data.result);
    let cartAuth = await auth("inCart", {
      accountName: authData.data.accountName,
      gameId: inWishlistGames.data[i],
    });
    authInCart.push(cartAuth.result);
  }
  wish_list_ctn.innerHTML =
    `<div class="nothing_to_see_here">
  <h2>哎呀,这里没有内容可以显示</h2>
  <p>
      您愿望单里有
      <span class="game_nums">0</span>
      件物品
  </p>
</div>` +
    inWishlistGames.data.reduce((prev, item, index) => {
      return (
        prev +
        `<div class="wish_row">
        <div class="hover_handler">
            <img src="../img/handle.png" alt="">
            <div class="order">
                <input type="text" value=${index + 1}>
            </div>
        </div>
        <a class="capsule">
            <img src="../img/carousel_img/main${item + 1}.jpg" alt="">
            <div class="screenshots">
                ${gameItem[index].screenshot.reduce((p, t) => {
                  return p + `<div><img src=${t}></div>`;
                }, "")}
            </div>
        </a>
        <div class="wish_row_content">
            <a href="" class="title">${gameItem[index].gameName}</a>
            <div class="middle">
                <div class="stats">
                    <div class="summary">总体评测:</div>
                    <div class="review_summary positive">${
                      gameItem[index].appraise
                    }</div>
                    <div class="release">发行日期:</div>
                    <div class="date">${gameItem[index].releaseDate}</div>
                </div>
                <div class="purchase">
                    <div class="discount_area">
                        ${
                          gameItem[index].isDiscount
                            ? `<div class="discount_pct">${gameItem[index].discount_pct}</div>`
                            : ""
                        }
                        <div class="discount_price">
                            ${
                              gameItem[index].isDiscount
                                ? `<div class="discount_origin_price">${gameItem[index].origin_price}</div>`
                                : ""
                            }
                            <div class="discount_finall_price">${
                              gameItem[index].finall_price
                            }</div>
                        </div>
                    </div>
                    <a class="add_to_cart" href="" data-id=${
                      gameItem[index].gameId
                    }><span>${
          authInCart[index] ? "在购物车中" : "添加至购物车"
        }</span></a>
                </div>
            </div>
            <div class="lower">
                <div class="platform">
                    <span class="earlyaccess">${gameItem[index].state}</span>
                    ${gameItem[index].platForm.reduce((p, t) => {
                      return p + `<span class="platform_icon ${t}">.</span>`;
                    }, "")}
                </div>
                <div class="lower_footer">
                    <div class="tags">
                    ${gameItem[index].tag.reduce((p, t) => {
                      return p + `<div class="tag">${t}</div>`;
                    }, "")}
                    </div>
                    <div class="add_date">
                        添加日期:2022/4/14( <span class="delete" data-id=${
                          gameItem[index].gameId
                        }>移除</span> )
                    </div>
                </div
            </div>
        </div>
    </div></div>`
      );
    }, "");
  removeItem = document.querySelectorAll(".delete");
  removeItem.forEach((item) => {
    item.addEventListener("click", removeHandler);
  });
  addToCart = document.querySelectorAll(".add_to_cart");
  addToCart.forEach((item) => item.addEventListener("click", addToCartHandler));
}
function removeHandler(evt) {
  newmodal_bg.style.display = "block";
  newmodal.style.display = "block";
  newmodal.addEventListener("click", (e) =>
    comfirmHandler(e, Number(evt.target.dataset.id))
  );
}
async function comfirmHandler(e, id) {
  if (e.target === comfirm) {
    await fetch(url + "removeItem/wishlist", {
      method: "POST",
      body: JSON.stringify({
        gameId: id,
        accountName: authData.data.accountName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    newmodal_bg.style.display = "none";
    newmodal.style.display = "none";
    init();
  } else if (e.target === cancle) {
    newmodal_bg.style.display = "none";
    newmodal.style.display = "none";
  }
}
async function addToCartHandler(e) {
  if (e.target.firstElementChild.innerText === "在购物车中") return;
  let data = await auth("addToCart", {
    accountName: authData.data.accountName,
    gameId: Number(e.target.dataset.id),
  });
  data.result ? init() : "";
}
