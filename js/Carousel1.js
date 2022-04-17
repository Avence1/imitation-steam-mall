import Commpents from "./Commpents.js";
import Utils from "./Utils.js";
export default class Carousel1 extends Commpents {
  static cssBool = false;
  id = 1;
  list;
  mainList;
  screen_shot;
  tags;
  carousel_thumbs;
  constructor(_data) {
    super("div");
    this.elem.className = "content";
    if (_data) this.list = _data;
    this.setCarouse();
    this.elem.addEventListener("click", (e) => this.clickHandler(e));
    this.elem.addEventListener("mouseover", (e) => this.mouseHandler(e));
    this.elem.addEventListener("mouseout", (e) => this.mouseHandler(e));
    Carousel1.setCSS();
  }
  clickHandler(e) {
    let target = e.target;
    if (/arrow/.test(target.parentElement.className))
      target = target.parentElement;
    if (/arrow/.test(target.className)) {
      /left/.test(target.className)
        ? this.id === 1
          ? (this.id = 5)
          : this.id--
        : this.id === 5
        ? (this.id = 1)
        : this.id++;
      this.setCarouse();
    }
  }
  mouseHandler(e) {
    if (
      e.target.nodeName === "IMG" &&
      e.target.parentElement &&
      e.target.parentElement.className === "screenshot"
    ) {
      let src = ".." + e.target.src.match(/.*(\/img.*)/)[1];
      let originsrc = this.mainList.pic;
      this.mainList.pic = src;
      // this.setCarouse();
      this.mainList.pic = originsrc;
    }
    if (e.type === "mouseout") {
      this.setCarouse();
    }
  }
  setCarouse() {
    this.mainList = this.list["main" + this.id];
    this.screen_shot = this.mainList.info.screen_shot.reduce((prev, item) => {
      return prev + `<img src=${item}>`;
    }, "");
    this.tags = this.mainList.info.now_state.tags.reduce((prev, item) => {
      return prev + `<span>${item}</span>`;
    }, "");
    let i = -1;
    for (var key in this.list) {
      i++;
    }
    this.carousel_thumbs = new Array(i).fill(0).reduce((prev, item, index) => {
      return (
        prev +
        `<div id='${index + 1}' class=${
          this.id === index + 1 ? "focus" : ""
        }></div>`
      );
    }, "");
    this.elem.innerHTML = `<div class="content_title">${
      this.list.content_title
    }</div><div class="carousel"><div class="carousel_item clear_fix"><div class="carousel_main"><img src="${
      this.mainList.pic
    }"><div class="doubledownArrow"></div></div><div class="carousel_info"><div class="appname">${
      this.mainList.info.title
    }</div><div class="screenshot">${
      this.screen_shot
    }</div><div class="now_state">${
      this.mainList.info.now_state.default
        ? `<div class="default">${this.mainList.info.now_state.default}</div>`
        : ""
    }${
      this.mainList.info.now_state.suggest_foryou
        ? `<div class="suggest_foryou">为您推荐,&nbsp;&nbsp;<span>因为您玩过标有一下标签的游戏:</span></div>`
        : ""
    }${this.tags}</div><div class="discount">${
      this.mainList.info.discount.discount_pct
        ? `<div class="discount_pct">${this.mainList.info.discount.discount_pct}</div>`
        : ""
    } <div class="discount_price ${
      this.mainList.info.discount.discount_pct ? "" : "only"
    }">${
      this.mainList.info.discount.original_price
        ? `<div class="original_price">${this.mainList.info.discount.original_price}</div> `
        : ""
    }    <div class="finall_price">${
      this.mainList.info.discount.finall_price
    }</div></div></div><div class="platform">${
      this.mainList.info.platform.win
        ? `<span class="platform_img win"><img src="../img/icon_platform_win.png"></span>`
        : ""
    }${
      this.mainList.info.platform.mac
        ? `<span class="platform_img mac"><img src="../img/icon_platform_mac.png"></span>`
        : ""
    }${
      this.mainList.info.platform.linux
        ? `<span class="platform_img linux"><img src="../img/icon_platform_linux.png"></span>`
        : ""
    }</div></div></div><div class="carousel_thumbs clear_fix">${
      this.carousel_thumbs
    }</div><div class="arrow right"><div></div></div><div class="arrow left"><div></div></div></div>`;
  }
  static setCSS() {
    if (Carousel1.cssBool) return;
    Carousel1.cssBool = true;
    Utils.setCSS(`.home_page .content {
        margin: 0 254px;
      }
    
      .content>.content_title {
        width: 940px;
        height: 20px;
        margin-bottom: 20px;
        padding-top: 2px;
      }
      
      .carousel {
        width: 100%;
        height: 380px;
        position: relative;
        background-color: #1b2839;
      }
      
      .carousel_item {
        height: 353px;
        width: 100%;
        background-color: #0f1922;
        box-shadow: 0 0 7px 0px #000;
        transition: all 1s;
      }
    
      .carousel_main {
        height: 353px;
        width: 626px;
        float: left;
        position: absolute;
        z-index: 1;
        box-shadow: 0 0 10px 5px #000;
      }
      
      .carousel_main>img {
        width: 100%;
        height: 100%;
        font-size: 0;
      }
      
      .doubledownArrow {
        width: 15px;
        height: 15px;
        position: absolute;
        right: 0px;
        top: 0;
        opacity: 0;
        margin: 5px 5px 0 0;
        box-shadow: 0 0 3px #000;
        border-radius: 3px;
        cursor: pointer;
        background: url("../img/icon_expand_dark.png") no-repeat 4px 4px;
        z-index: 50;
        transition: all 0.3s;
        background-color: #e5e5e5;
      }
      
      .carousel_main:hover>.doubledownArrow {
        opacity: 1;
        right: 5px;
      }
      
      .carousel_main>.doubledownArrow:hover {
        background: url("../img/icon_expand_white.png") no-repeat 4px 4px;
        background-color: #67c1f5;
      }
      
      .carousel_item>.carousel_info {
        width: 300px;
        height: 353px;
        padding-left: 4px;
        float: right;
        background-color: #0f1922;
      }
      
      .carousel_item>.carousel_info>.appname {
        width: 302px;
        height: 52px;
        font-size: 24px;
        text-align: left;
        padding: 4px 0;
      }
      
      .carousel_item>.carousel_info>.screenshot {
        height: 158px;
        width: 344px;
        position: absolute;
        right: 0px;
        z-index: 0;
      }
      
      .carousel_item>.carousel_info>.screenshot>img {
        width: 162px;
        height: 69px;
        padding: 10px 10px 0 0;
      }
      
      .carousel_item>.carousel_info>.screenshot>img {
        width: 162px;
        height: 69px;
        opacity:0.5;
      }
      .carousel_item>.carousel_info>.screenshot>img:hover{
        opacity:1;
      }
      
      .carousel_item>.carousel_info>.now_state {
        width: 288px;
        height: 67px;
        position: absolute;
        padding-left: 4px;
        padding-right: 8px;
        top: 228px;
      }
      
      .carousel_item>.carousel_info>.now_state>.suggest_foryou {
        color: #a4d007;
      }
      
      .carousel_item>.carousel_info>.now_state>.suggest_foryou>span {
        color: #fff;
      }
      
      .carousel_item>.carousel_info>.now_state>span {
        display: inline-block;
        padding: 0 7px;
        margin: 0 2px 3px 0;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        font-size: 11px;
      }
      
      .carousel_item>.carousel_info>.now_state>.default {
        font-size: 21px;
        font-weight: 200;
      }
      
      .discount {
        position: absolute;
        bottom: 35px;
        background-color: rgba(0, 0, 0, 0.6);
      }
      
      div.only {
        background-color: #0f1922;
      }
      
      .discount_pct {
        color: #a4d007;
        background: #4c6b22;
        display: inline;
        padding: 0 3px;
      }
      
      .discount>.discount_price {
        display: inline;
      }
      
      .discount_price>.original_price {
        display: inline;
        font-size: 11px;
        text-align: right;
        text-decoration: line-through;
        color: #7193a6;
      }
      
      .discount_price>.finall_price {
        color: #acdbf5;
        font-size: 11px;
        margin-right: 6px;
        text-align: right;
        display: inline;
      }
      
      .carousel_info>.platform {
        position: absolute;
        bottom: 35px;
        right: 6px;
      }
      
      .carousel>.carousel_thumbs {
        width: 940px;
        height: 30px;
        background-color: #1a2b40;
        margin-top: 7px;
      }
      
      .carousel>.carousel_thumbs>div {
        width: 15px;
        height: 9px;
        border-radius: 2px;
        transition: backgroundColor 0.2s;
        background-color: hsla(202, 60%, 100%, 0.2);
        cursor: pointer;
        float: left;
        margin: 11px 2px;
      }
      
      .carousel>.carousel_thumbs>div:nth-child(1) {
        margin-left: 426px;
      }

      .carousel>.carousel_thumbs>div.focus{
        background-color: hsla(202, 60%, 100%, 0.3)
      }
      
      .carousel>.arrow {
        width: 45px;
        height: 108px;
        display: inline-block;
        position: absolute;
        top: 50%;
        margin-top: -54px;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.3) 5%, rgba(0, 0, 0, 0) 95%);
      }
      
      .carousel>.arrow.right {
        background: linear-gradient(to right, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0.3) 95%);
      }
      
      .carousel>.arrow.left:hover {
        background: linear-gradient(to right, rgba(171, 218, 244, 0.3) 5%, rgba(171, 218, 244, 0) 95%);
      }
      
      .carousel>.arrow.right:hover {
        background: linear-gradient(to right, rgba(171, 218, 244, 0) 5%, rgba(171, 218, 244, 0.3) 95%);
      }
      
      .carousel>.arrow.left {
        left: -45px;
      }
      
      .carousel>.arrow.right {
        right: -45px;
      }
      
      .carousel>.arrow>div {
        width: 23px;
        height: 36px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -11.5px;
        margin-top: -18px;
        background: url("../img/arrows.png") no-repeat;
      }
      
      .carousel>.arrow.left>div {
        background-position: -23px 0;
      }`);
  }
}
