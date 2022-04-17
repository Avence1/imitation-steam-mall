import Carousel1 from "./Carousel1.js";
let supernav,
  submenu,
  subItem,
  subId,
  subboolean = false;
let carousel1_list = {
  content_title: "精选和推荐",
  main1: {
    pic: "../img/carousel_img/main1.jpg",
    info: {
      title: "艾尔登法环",
      screen_shot: [
        "../img/carousel_img/info11.jpg",
        "../img/carousel_img/info12.jpg",
        "../img/carousel_img/info13.jpg",
        "../img/carousel_img/info14.jpg",
      ],
      now_state: {
        default: "现已推出",
        suggest_foryou: "",
        tags: ["热销商品"],
      },
      discount: {
        discount_pct: "",
        original_price: "",
        finall_price: "￥298.00",
      },
      platform: {
        win: "win",
        mac: "",
        linux: "linux",
      },
    },
  },
  main2: {
    pic: "../img/carousel_img/main2.jpg",
    info: {
      title: "Sea of Thieves",
      screen_shot: [
        "../img/carousel_img/info21.jpg",
        "../img/carousel_img/info22.jpg",
        "../img/carousel_img/info23.jpg",
        "../img/carousel_img/info24.jpg",
      ],
      now_state: {
        default: "现已推出",
        suggest_foryou: "",
        tags: ["热销商品"],
      },
      discount: {
        discount_pct: "-50%",
        original_price: "￥116.00",
        finall_price: "￥58.00",
      },
      platform: {
        win: "win",
        mac: "",
        linux: "linux",
      },
    },
  },
  main3: {
    pic: "../img/carousel_img/main3.jpg",
    info: {
      title: "Inscryption",
      screen_shot: [
        "../img/carousel_img/info31.jpg",
        "../img/carousel_img/info32.jpg",
        "../img/carousel_img/info33.jpg",
        "../img/carousel_img/info34.jpg",
      ],
      now_state: {
        default: "",
        suggest_foryou: ["为您推荐,", "因为您玩过标有一下标签的游戏:"],
        tags: ["轻度Rogue", "类Rogue", "像素图形", "2D"],
      },
      discount: {
        discount_pct: "",
        original_price: "",
        finall_price: "￥88.00",
      },
      platform: {
        win: "win",
        mac: "mac",
        linux: "",
      },
    },
  },
  main4: {
    pic: "../img/carousel_img/main4.jpg",
    info: {
      title: "Ori and the Will of the Wisps",
      screen_shot: [
        "../img/carousel_img/info41.jpg",
        "../img/carousel_img/info42.jpg",
        "../img/carousel_img/info43.jpg",
        "../img/carousel_img/info44.jpg",
      ],
      now_state: {
        default: "现已推出",
        suggest_foryou: "",
        tags: ["热销商品"],
      },
      discount: {
        discount_pct: "-67%",
        original_price: "￥90.00",
        finall_price: "￥29.70",
      },
      platform: {
        win: "win",
        mac: "",
        linux: "",
      },
    },
  },
  main5: {
    pic: "../img/carousel_img/main5.jpg",
    info: {
      title: "永劫无间",
      screen_shot: [
        "../img/carousel_img/info51.jpg",
        "../img/carousel_img/info52.jpg",
        "../img/carousel_img/info53.jpg",
        "../img/carousel_img/info54.jpg",
      ],
      now_state: {
        default: "现已推出",
        suggest_foryou: "",
        tags: ["热销商品"],
      },
      discount: {
        discount_pct: "",
        original_price: "",
        finall_price: "￥98.00",
      },
      platform: {
        win: "win",
        mac: "",
        linux: "",
      },
    },
  },
};
init();
function init() {
  supernav = document.querySelector(".supernav_container");
  submenu = document.querySelector(".submenu");
  supernav.addEventListener("mouseover", supernavMouseHandler);
  supernav.addEventListener("mouseout", supernavMouseHandler);
  submenu.addEventListener("mouseenter", submenuMouseHandler);
  submenu.addEventListener("mouseleave", submenuMouseHandler);
  let carousel1 = new Carousel1(carousel1_list);
  carousel1.appendTo(".home_page");
}
function supernavMouseHandler(e) {
  if (e.target.nodeName === "A" && e.target.parentElement === supernav) {
    subItem = e.target;
    subId = subItem.className;
    if (/store/.test(subId)) {
      subId = 0;
    } else if (/community/.test(subId)) {
      subId = 1;
    } else if (/username/.test(subId)) {
      subId = 2;
    }
    if (e.type === "mouseover") {
      submenu.children[subId].style.display = "block";
    }
    if (e.type === "mouseout") {
      submenu.children[subId].style.display = "none";
    }
    subboolean = true;
  }
}
function submenuMouseHandler(e) {
  if (!subboolean) return;
  if (e.target !== submenu) return;
  if (e.type === "mouseenter") {
    subId !== undefined
      ? (submenu.children[subId].style.display = "block")
      : "";
  } else if (e.type === "mouseleave") {
    subId !== undefined ? (submenu.children[subId].style.display = "none") : "";
    subboolean = false;
  }
}
