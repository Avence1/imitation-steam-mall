const subuser=document.querySelector(".subuser"),installsteam=document.querySelector(".installsteam"),action=document.querySelector(".action"),wishlist=document.querySelector(".wishlist"),userlogo=document.querySelector(".yourlogo"),foryour_store_menu=document.querySelector(".foryour_store_menu"),footer=document.querySelector(".set_bgc1"),div0=document.createElement("div"),home_page=document.querySelector(".home_page"),arrow=document.querySelectorAll(".arrow"),rigthArrow=document.querySelectorAll(".right"),leftArrow=document.querySelectorAll(".left"),appname=document.querySelectorAll(".appname"),now_state=document.querySelectorAll(".now_state"),discount=document.querySelectorAll(".discount"),platform=document.querySelectorAll(".platform"),carousel_thumbs=document.querySelectorAll(".carousel_thumbs"),carousel=document.querySelectorAll(".carousel"),tabs_row=document.querySelector(".tabs_row"),tab_see_more=document.querySelector(".tab_see_more"),items=document.querySelector(".items"),carousel_item=document.querySelectorAll(".carousel_item"),tabs_item_desc=document.querySelector(".tabs_item_desc");let carouselmain,screenshot,prev,gamesData,tab_item,inCartNumber,inWishlistNumber,originSrc=[],timers=[],nowSrc=[],carouselIndex=[5,7,2],authData;const url="http://127.0.0.1:4010/";async function init(){if(carousel_item.forEach(e=>e.addEventListener("click",toAppHandler)),gamesData=await(gamesData=await fetch(url+"getGame",{method:"POST",body:JSON.stringify({data:"all"}),headers:{"Content-Type":"application/json"}})).json(),authData=await auth("online"),div0.className="renderBox",arrow.forEach(e=>{e.addEventListener("click",arrowClickHandler)}),document.querySelectorAll(".right").forEach(e=>{let a=new Event("click");var t=setInterval(()=>{e.dispatchEvent(a)},6e3*Math.random()+1e3);timers.push(t)}),authData.result){inCartNumber=await auth("inCartNumber",{accountName:authData.data.accountName}),inWishlistNumber=await auth("inWishlistNumber",{accountName:authData.data.accountName}),renderOnline();const e=document.querySelector("#account_pulldown");e.addEventListener("click",pulldownHandler)}else renderOffline();carousel.forEach((e,a)=>{e.addEventListener("mouseenter",e=>MouseHandler(e,a)),e.addEventListener("mouseleave",e=>MouseHandler(e,a))}),carouselmain=document.querySelectorAll(".carousel_main"),(screenshot=document.querySelectorAll(".screenshot")).forEach(e=>{[...e.children].forEach(e=>{e.addEventListener("mouseenter",imgHandler),e.addEventListener("mouseleave",imgHandler)})}),renderCarousel(),carousel_thumbs.forEach((e,a)=>{e.addEventListener("click",e=>thumbsClickHandler(e,a))}),changeTab(prev=tabs_row.firstElementChild),changeItems(prev),tabs_row.addEventListener("click",tabsClickHandler)}async function auth(e,a={}){let t=await fetch(url+"auth/"+e,{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}});return t=await t.json()}function renderOnline(){subuser.innerHTML=`
<a href="javascript:void(0);" class="menuitem username">${authData.data.accountName}</a>
<ul class="submenu_username">
    <li><a href="javascript:void(0);" class="submenuitem">动态</a></li>
    <li><a href="javascript:void(0);" class="submenuitem">个人资料</a></li>
    <li><a href="javascript:void(0);" class="submenuitem">好友</a></li>
    <li><a href="javascript:void(0);" class="submenuitem">组</a></li>
    <li><a href="javascript:void(0);" class="submenuitem">内容</a></li>
    <li><a href="javascript:void(0);" class="submenuitem">徽章</a></li>
    <li><a href="javascript:void(0);" class="submenuitem">库存</a></li>
</ul>`,div0.innerHTML=`
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
</a>`,action.appendChild(div0),installsteam.style.backgroundColor="#616a72",wishlist.innerHTML=`<a href="./html/wishlist.html" class="wishlistbtn">愿望单( <span class="wishlist_value">${inWishlistNumber.result?inWishlistNumber.data:0}</span> )</a><a href="./html/cart.html" class="cartbtn">购物车( <span class="cart_value">${inCartNumber.result?inCartNumber.data:0}</span> )</a>`,footer.style.display="none"}function renderOffline(){subuser.innerHTML="",div0.innerHTML='<a href="./html/signin.html" class="signin">登录</a> | <span class="language">语言</span>',foryour_store_menu.innerHTML=`
  <ul class="menu_header">
    <li><a href="javascript:void(0);">主页</a></li>
    <li><a href="javascript:void(0);">社区推荐</a></li>
    <li><a href="javascript:void(0);">最近查看过</a></li>
    <li><a href="javascript:void(0);">Steam鉴赏家</a></li>
  </ul>`,action.appendChild(div0),installsteam.style.backgroundColor="#5c7e10",wishlist.innerHTML="",userlogo.style.display="none",footer.style.display="block"}function pulldownHandler(e){const a=document.querySelector(".box");if(a.style.display="none"===a.style.display?"block":"none","block"===a.style.display){const t=document.querySelector("#signout");t.addEventListener("click",signoutHandler)}}async function signoutHandler(e){((await auth("signout",{accountName:authData.data.accountName})).result?renderOffline:renderOnline)()}async function imgHandler(e){switch(title=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.innerText){case"精选和推荐":carouselmain[0].firstElementChild.style.opacity=0,setTimeout(()=>{carouselmain[0].firstElementChild.style.opacity=1,"mouseenter"===e.type?carouselmain[0].firstElementChild.src=e.target.src:carouselmain[0].firstElementChild.src=originSrc[0],"mouseenter"===e.type?nowSrc[0]=e.target.src:nowSrc[0]="",renderCarousel()},200);break;case"特别优惠":carouselmain[1].firstElementChild.style.opacity=0,setTimeout(()=>{carouselmain[1].firstElementChild.style.opacity=1,"mouseenter"===e.type?carouselmain[1].firstElementChild.src=e.target.src:carouselmain[1].firstElementChild.src=originSrc[1],"mouseenter"===e.type?nowSrc[1]=e.target.src:nowSrc[1]="",renderCarousel()},200);break;case"社区推荐 本日推荐游戏":carouselmain[2].firstElementChild.style.opacity=0,setTimeout(()=>{carouselmain[2].firstElementChild.style.opacity=1,"mouseenter"===e.type?carouselmain[2].firstElementChild.src=e.target.src:carouselmain[2].firstElementChild.src=originSrc[2],"mouseenter"===e.type?nowSrc[2]=e.target.src:nowSrc[2]="",renderCarousel()},200)}}async function renderCarousel(){originSrc=[],carouselmain.forEach((e,t)=>{nowSrc[t]?e.firstElementChild.src=nowSrc[t]:e.firstElementChild.src=`./img/carousel_img/main${carouselIndex[t]+1}.jpg`,originSrc.push(e.firstElementChild.src),[...screenshot[t].children].forEach((e,a)=>{e.src=gamesData.result[carouselIndex[t]].screenshot[a].slice(1)})}),appname.forEach((e,a)=>{e.innerText=gamesData.result[carouselIndex[a]].gameName}),now_state.forEach((e,a)=>{e.innerHTML="现已推出"===gamesData.result[carouselIndex[a]].state?'<div class="default">现已推出</div>':'<div class="suggest_foryou">为您推荐,&nbsp;&nbsp;<span>因为您玩过标有一下标签的游戏:</span></div>',e.innerHTML+=gamesData.result[carouselIndex[a]].tag.reduce((e,a,t)=>e+`<span>${a}</span>`,"")}),discount.forEach((e,a)=>{let t;t=gamesData.result[carouselIndex[a]].isDiscount?`
      <div class="discount_pct">${gamesData.result[carouselIndex[a]].discount_pct}</div>
      <div class="discount_price">
        <div class="original_price">${gamesData.result[carouselIndex[a]].origin_price}</div>
        <div class="finall_price">${gamesData.result[carouselIndex[a]].finall_price}</div>
      </div>`:`
      <div class="discount_price only">
        <div class="finall_price">${gamesData.result[carouselIndex[a]].finall_price}</div>
      </div>`,e.innerHTML=t}),platform.forEach((e,a)=>{e.innerHTML=gamesData.result[carouselIndex[a]].platForm.reduce((e,a)=>e+`<span class="platform_img ${a}"><img src="./img/icon_platform_${a}.png"></span>`,"")}),carousel_thumbs.forEach((e,s)=>{e.innerHTML=gamesData.result.reduce((e,a,t)=>e+`<div data-id=${t} class=${carouselIndex[s]===t?"focus":""}></div>`,"")})}function arrowClickHandler(e){switch(e.target.id||e.target.parentElement.id){case"right1":carouselIndex[0]=9<=carouselIndex[0]?0:carouselIndex[0]+1;break;case"left1":carouselIndex[0]=carouselIndex[0]<=0?9:carouselIndex[0]-1;break;case"right2":carouselIndex[1]=9<=carouselIndex[1]?0:carouselIndex[1]+1;break;case"left2":carouselIndex[1]=carouselIndex[1]<=0?9:carouselIndex[1]-1;break;case"right3":carouselIndex[2]=9<=carouselIndex[2]?0:carouselIndex[2]+1;break;case"left3":carouselIndex[2]=carouselIndex[2]<=0?9:carouselIndex[2]-1}renderCarousel()}function MouseHandler(e,a){if("mouseenter"===e.type)clearInterval(timers[a]);else if("mouseleave"===e.type){let e=new Event("click");timers[a]=setInterval(()=>{document.querySelectorAll(".right")[a].dispatchEvent(e)},6e3*Math.random()+1e3)}}function thumbsClickHandler(e,a){e.target.dataset.id&&(carouselIndex[a]=Number(e.target.dataset.id),renderCarousel())}function tabsClickHandler(e){"tabs_row"===e.target.parentElement.className&&(changePrev(e.target),changeTab(e.target),changeItems(e.target))}function changePrev(e){prev&&(prev.className="",prev=e),prev.className="click"}function changeTab(e){let a="查看更多:";switch(e.innerText){case"新品与热门商品":a+='<span class="title">新品</span>';break;case"热销商品":a+='<span class="title">热销商品</span>或<span class="title">全球热销商品</span>';break;case"热门即将推出":a+='<span class="title">即将推出</span>';break;case"优惠":a+='<span class="title">优惠</span>'}tab_see_more.innerHTML=a}function changeItems(e){items.innerHTML=gamesData.result.reduce((e,t,a)=>e+`
  <a href="javascript:void(0);" class="tab_item" data-id="${t.gameName}">
    <img src="./img/carousel_img/main${a+1}.jpg" class="clear_fix" data-id="${t.gameName}">
    <div class="item_desc" data-id="${t.gameName}">
      <div class="desc_title" data-id="${t.gameName}">${t.gameName}</div>
      <div class="item_icon" data-id="${t.gameName}">
        ${t.platForm.reduce((e,a)=>e+`<img src="./img/icon_platform_${a}.png" alt="" data-id="${t.gameName}">`,"")}
      </div>
      <div class="item_tags" data-id="${t.gameName}">
      ${t.tag.reduce((e,a)=>e+`<span data-id="${t.gameName}">${a}</span>`,"")}
      </div>
    </div>
    ${t.isDiscount?`<div class="item_discount" data-id="${t.gameName}">${t.discount_pct}</div><div class="item_price" data-id="${t.gameName}"><div class="item_origin_price" data-id="${t.gameName}">${t.origin_price}</div><div class="item_finall_price" data-id="${t.gameName}">${t.finall_price}</div></div>`:`<div class="item_discount" style="background:transparent" data-id="${t.gameName}"></div><div class="item_price" data-id="${t.gameName}"><div class="item_origin_price" data-id="${t.gameName}"></div><div class="item_finall_price" data-id="${t.gameName}">${t.finall_price}</div></div>`}
  </a>`,""),(tab_item=document.querySelectorAll(".tab_item")).forEach((e,a)=>{e.addEventListener("mouseenter",e=>changeItemDesc(e,a)),e.addEventListener("mouseleave",e=>changeItemDesc(e,a)),e.addEventListener("click",toAppHandler)});var a=new Event("mouseenter");tab_item[0].dispatchEvent(a)}function changeItemDesc(e,a){"mouseenter"===e.type?(e.target.classList.add("active"),a=`<h2>${gamesData.result[a].gameName}</h2>
    <div class="item_summary">
        <div class="title">总体用户评测:</div>
        <span class="summary positive">${gamesData.result[a].appraise}</span><span>(177,598)</span>
    </div>
    <div class="tags">
    ${gamesData.result[a].tag.reduce((e,a)=>e+`<a href="javascript:void(0);">${a}</a>`,"")}
    </div>
    `+gamesData.result[a].screenshot.reduce((e,a)=>e+`<div class="tags_screen_shot" style="background:url(${a.slice(1)}) no-repeat center/100%"></div>`,""),tabs_item_desc.innerHTML=a):"mouseleave"===e.type&&e.target.classList.remove("active")}function toAppHandler(e){"appname"===e.target.className?sessionStorage.gameName=e.target.innerText:sessionStorage.gameName=e.target.dataset.id,location.href="./html/app.html"}async function auth(e,a={}){let t=await fetch(url+"auth/"+e,{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}});return t=await t.json()}init();