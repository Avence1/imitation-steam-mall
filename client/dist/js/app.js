const subuser=document.querySelector(".subuser"),div0=document.createElement("div"),action=document.querySelector(".action"),wishlist=document.querySelector(".wishlist"),installsteam=document.querySelector(".installsteam"),foryour_store_menu=document.querySelector(".foryour_store_menu"),userlogo=document.querySelector(".yourlogo"),itemName=document.querySelector(".page_header>h2"),carousel=document.querySelector(".carousel"),selector=document.querySelector(".selector"),img_zoom=document.querySelector(".img_zoom"),sliders=document.querySelectorAll(".btn"),handle=document.querySelector(".handle"),slider=document.querySelector(".slider"),please_signin=document.querySelector(".please_signin"),mate=document.querySelector(".mate"),buy=document.querySelector(".buy"),carousel_left=document.querySelector(".main_desc>.left"),to_see_all=document.querySelector(".to_see_all"),url="http://127.0.0.1:4010/";let authData,DauthDataData,prevIndex,num,nowIndex=0,handleMove=!1,selectorIndex=0,authGame,authWishlist,inWishlistNumber,inCartNumber,timers;async function init(){if(timers&&clearInterval(timers),div0.className="renderBox",img_zoom.style.transition="left 0.5s linear",handle.style.transition="left 0.5s linear",selector.style.transition="left 0.5s linear",slider.addEventListener("mousedown",dropsliderHandler),slider.addEventListener("mouseup",dropsliderHandler),slider.addEventListener("mousemove",dropsliderHandler),img_zoom.addEventListener("click",carouselClickHandler),carousel_left.addEventListener("mouseover",MouseHandler),carousel_left.addEventListener("mouseleave",MouseHandler),sliders.forEach(e=>e.addEventListener("click",slidersClickHandler)),gameData=await(gameData=await fetch(url+"getGame",{method:"POST",body:JSON.stringify({data:sessionStorage.gameName}),headers:{"Content-Type":"application/json"}})).json(),(authData=await auth("online")).result){inWishlistNumber=await auth("inWishlistNumber",{accountName:authData.data.accountName}),inCartNumber=await auth("inCartNumber",{accountName:authData.data.accountName}),authGame=await auth("inCart",{accountName:authData.data.accountName,gameId:gameData.result[0].gameId}),authWishlist=await auth("inWishlist",{accountName:authData.data.accountName,gameId:gameData.result[0].gameId}),renderOnline();const e=document.querySelector("#account_pulldown");e.addEventListener("click",pulldownHandler)}else renderOffline();renderContent(),changePrev(),timers=setInterval(()=>{var e=new Event("click");sliders[1].dispatchEvent(e)},3e3)}function renderOnline(){subuser.innerHTML=`
  <a href="javascript:void(0);" class="menuitem username">${authData.data.accountName}</a>
  <ul class="submenu_username">
      <li><a href="javascript:void(0);" class="submenuitem">??????</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">????????????</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">??????</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">???</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">??????</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">??????</a></li>
      <li><a href="javascript:void(0);" class="submenuitem">??????</a></li>
  </ul>`,div0.innerHTML=`
  <div class="notification">
    <img src="../img/notification_envelope.png" width="11" height="8">
  </div>
  <div class="account_dropdown">
    <span id="account_pulldown" class="btn_arrow_down">${authData.data.accountName}</span>
    <div class="box" style="display:none">
      <div class="usermenu">
        <a href="javascript:void(0);" class="usermenuitem">??????????????????</a>
        <a href="javascript:void(0);" class="usermenuitem">????????????</a>
        <a href="javascript:void(0);" id="signout" class="usermenuitem">
          ??????:
          <span class="user_online">${authData.data.accountName}</span>
        </a>
        <a href="javascript:void(0);" class="usermenuitem">??????</a>
        <a href="javascript:void(0);" class="usermenuitem">????????????</a>
      </div>
    </div>
  </div>
  <div class="wallet">
      <a href="javascript:void(0);" class="user_online_wallet">???0.00</a>
  </div>
  <a href="javascript:void(0);" class="userlogo">
      <img src="https://store.st.dl.pinyuncloud.com/public/shared/images/header/logo_steam.svg?t=962016" alt="????????????">
  </a>`,action.appendChild(div0),installsteam.style.backgroundColor="#616a72",please_signin.innerHTML=authWishlist.result?"???????????????":"?????????????????????",please_signin.addEventListener("click",addToWishlist),console.log(authWishlist.result),mate.style.display="none",wishlist.innerHTML=`<a href="./wishlist.html" class="wishlistbtn">?????????( <span class="wishlist_value">${inWishlistNumber.result?inWishlistNumber.data:0}</span> )</a><a href="./cart.html" class="cartbtn">?????????( <span class="cart_value">${inCartNumber.result?inCartNumber.data:0}</span> )</a>`}function renderOffline(){subuser.innerHTML="",div0.innerHTML='<a href="./signin.html" class="signin">??????</a> | <span class="language">??????</span>',foryour_store_menu.innerHTML=`
  <ul class="menu_header">
  <li><a href="javascript:void(0);">??????</a></li>
  <li><a href="javascript:void(0);">????????????</a></li>
  <li><a href="javascript:void(0);">???????????????</a></li>
  <li><a href="javascript:void(0);">Steam?????????</a></li>
  </ul>`,action.appendChild(div0),installsteam.style.backgroundColor="#5c7e10",please_signin.innerHTML='???????????????????????????????????????????????????????????????<a href="./signin.html">??????</a>',mate.style.display="block",userlogo.style.display="none"}async function auth(e,a={}){let t=await fetch(url+"auth/"+e,{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}});return t=await t.json()}function renderContent(){itemName.innerText=gameData.result[0].gameName,buy.innerHTML=`
  <div class="float_area clear_fix">
    <h1>?????? ${gameData.result[0].gameName}</h1>
    <div class="platform">
    ${gameData.result[0].platForm.reduce((e,a)=>e+`<div class=${a}><img src="../img/icon_platform_${a}.png"></div>`,"")}
    </div>
  </div>
  
  <div class="dis">${gameData.result[0].isDiscount?"????????????! 5???12??? ??????":""}</div>
  <div class="discount">
    ${gameData.result[0].isDiscount?`<div class="discount_pct">${gameData.result[0].discount_pct}</div>`:""}
    <div class="price">
        ${gameData.result[0].isDiscount?`<div class="origin_price">${gameData.result[0].origin_price}</div>`:""}
        <div class="finall_price">${gameData.result[0].finall_price}</div>
    </div>
    <div class="cart">${authData.result&&authGame.result?"???????????????":"??????????????????"}</div>
  </div>`,to_see_all.innerText=`???Steam?????????"${gameData.result[0].gameName}"???????????????`;const e=document.querySelector(".cart");e.addEventListener("click",addToCartHandler)}function carouselClickHandler(a){nowIndex=[...this.children].findIndex(e=>e===a.target),num=Math.abs(prevIndex-nowIndex),selector.style.transition=`left ${num/5*.5}s linear`,selectorIndex=4<nowIndex?4:nowIndex,judge(0<prevIndex-nowIndex?"prev":"next"),changePrev(),changeSelector()}function changePrev(){0<=prevIndex&&([...carousel.children][prevIndex].style.opacity=0),prevIndex=nowIndex,[...carousel.children][prevIndex].style.opacity=1}function changeSelector(){selector.style.left=20*selectorIndex+"%"}function pulldownHandler(e){const a=document.querySelector(".box");if(a.style.display="none"===a.style.display?"block":"none","block"===a.style.display){const t=document.querySelector("#signout");t.addEventListener("click",signoutHandler)}}async function signoutHandler(e){((await auth("signout",{accountName:authData.data.accountName})).result?renderOffline:renderOnline)()}function slidersClickHandler(e){e.target===sliders[0]?(nowIndex--,selectorIndex--,nowIndex=nowIndex<0?7:nowIndex,judge("prev")):e.target===sliders[1]&&(nowIndex++,selectorIndex++,nowIndex=7<nowIndex?0:nowIndex,judge("next")),changePrev(),changeSelector()}function dropsliderHandler(e){"mousedown"===e.type&&e.target===handle&&(handleMove=!0),"mouseup"===e.type&&(handleMove=!1),"mousemove"===e.type&&handleMove&&(handle.style.left=e.clientX-328-30+"px",handle.style.left=parseInt(handle.style.left)<0?"0px":handle.style.left,handle.style.left=465<parseInt(handle.style.left)?"465px":handle.style.left)}function judge(e){switch(e){case"prev":switch(nowIndex){case 3:selectorIndex=1,img_zoom.style.left="-40%",handle.style.left="60%";break;case 2:selectorIndex=1,img_zoom.style.left="-20%",handle.style.left="30%";break;case 1:selectorIndex=1,img_zoom.style.left="0",handle.style.left="0";break;case 7:selectorIndex=4,img_zoom.style.left="-60%",handle.style.left="89%"}break;case"next":switch(nowIndex){case 4:selectorIndex=3,img_zoom.style.left="-20%",handle.style.left="30%";break;case 5:selectorIndex=3,img_zoom.style.left="-40%",handle.style.left="60%";break;case 6:selectorIndex=3,img_zoom.style.left="-60%",handle.style.left="89%";break;case 0:selectorIndex=0,img_zoom.style.left="0",handle.style.left="0"}}}async function addToCartHandler(e){"???????????????"!==e.target.innerText&&(authData.result?await auth("addToCart",{gameId:gameData.result[0].gameId,accountName:authData.data.accountName}):alert("??????????????????"),init())}async function addToWishlist(e){"???????????????"!==e.target.innerText&&(authData.result?await auth("addToWishlist",{gameId:gameData.result[0].gameId,accountName:authData.data.accountName}):alert("??????????????????"),init())}function MouseHandler(e){"mouseover"===e.type&&clearInterval(timers),"mouseleave"===e.type&&(timers=setInterval(()=>{var e=new Event("click");sliders[1].dispatchEvent(e)},3e3))}init();