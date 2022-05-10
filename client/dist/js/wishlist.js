const subuser=document.querySelector(".subuser"),installsteam=document.querySelector(".installsteam"),action=document.querySelector(".action"),wishlist=document.querySelector(".wishlist"),userlogo=document.querySelector(".yourlogo"),foryour_store_menu=document.querySelector(".foryour_store_menu"),div0=document.createElement("div"),title=document.querySelector("head>title"),wishlistTitle=document.querySelector(".wishlist_header>h2"),wish_list_ctn=document.querySelector(".wish_list_ctn"),newmodal_bg=document.querySelector(".newmodal_bg"),newmodal=document.querySelector(".newmodal"),comfirm=document.querySelector(".comfirm"),cancle=document.querySelector(".cancle"),url="http://127.0.0.1:4010/";let nothing_to_see_here=document.querySelector(".nothing_to_see_here"),authData,inCartNumber,inWishlistNumber,inWishlistGames,removeItem,addToCart,gameItem=[],authInCart=[];async function init(){if(authData=await auth("online"),div0.className="renderBox",authData.result){inCartNumber=await auth("inCartNumber",{accountName:authData.data.accountName}),inWishlistNumber=await auth("inWishlistNumber",{accountName:authData.data.accountName}),inWishlistGames=await auth("inWishlistGames",{accountName:authData.data.accountName}),title.innerText=authData.data.accountName+"的愿望单",renderOnline(),renderitem();const e=document.querySelector("#account_pulldown");e.addEventListener("click",pulldownHandler)}else renderOffline(),nothing_to_see_here.style.display="block"}async function auth(e,a={}){let t=await fetch(url+"auth/"+e,{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}});return t=await t.json()}function renderOnline(){subuser.innerHTML=`
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
</a>`,wishlistTitle.innerText=authData.data.accountName+"的愿望单",action.appendChild(div0),installsteam.style.backgroundColor="#616a72",wishlist.innerHTML=`<a href="./wishlist.html" class="wishlistbtn">愿望单( <span class="wishlist_value">${inWishlistNumber.result?inWishlistNumber.data:0}</span> )</a><a href="./cart.html" class="cartbtn">购物车( <span class="cart_value">${inCartNumber.result?inCartNumber.data:0}</span> )</a>`}function renderOffline(){subuser.innerHTML="",div0.innerHTML='<a href="./signin.html" class="signin">登录</a> | <span class="language">语言</span>',action.appendChild(div0),installsteam.style.backgroundColor="#5c7e10",wishlist.style.display="none"}function pulldownHandler(e){const a=document.querySelector(".box");if(a.style.display="none"===a.style.display?"block":"none","block"===a.style.display){const t=document.querySelector("#signout");t.addEventListener("click",signoutHandler)}}async function signoutHandler(e){((await auth("signout",{accountName:authData.data.accountName})).result?renderOffline:renderOnline)()}async function renderitem(){if(0===inWishlistGames.data.length)return(nothing_to_see_here=document.querySelector(".nothing_to_see_here")).style.display="block",void(document.querySelector(".wish_row")&&(document.querySelector(".wish_row").style.display="none"));for(let a=0;a<inWishlistGames.data.length;a++){let e=await fetch(url+"getGame/byId",{method:"POST",body:JSON.stringify({gameId:inWishlistGames.data[a]}),headers:{"Content-Type":"application/json"}});e=await e.json(),gameItem.push(e.result);var t=await auth("inCart",{accountName:authData.data.accountName,gameId:inWishlistGames.data[a]});authInCart.push(t.result)}wish_list_ctn.innerHTML=`<div class="nothing_to_see_here">
  <h2>哎呀,这里没有内容可以显示</h2>
  <p>
      您愿望单里有
      <span class="game_nums">0</span>
      件物品
  </p>
</div>`+inWishlistGames.data.reduce((e,a,t)=>e+`<div class="wish_row">
        <div class="hover_handler">
            <img src="../img/handle.png" alt="">
            <div class="order">
                <input type="text" value=${t+1}>
            </div>
        </div>
        <a class="capsule">
            <img src="../img/carousel_img/main${a+1}.jpg" alt="">
            <div class="screenshots">
                ${gameItem[t].screenshot.reduce((e,a)=>e+`<div><img src=${a}></div>`,"")}
            </div>
        </a>
        <div class="wish_row_content">
            <a href="" class="title">${gameItem[t].gameName}</a>
            <div class="middle">
                <div class="stats">
                    <div class="summary">总体评测:</div>
                    <div class="review_summary positive">${gameItem[t].appraise}</div>
                    <div class="release">发行日期:</div>
                    <div class="date">${gameItem[t].releaseDate}</div>
                </div>
                <div class="purchase">
                    <div class="discount_area">
                        ${gameItem[t].isDiscount?`<div class="discount_pct">${gameItem[t].discount_pct}</div>`:""}
                        <div class="discount_price">
                            ${gameItem[t].isDiscount?`<div class="discount_origin_price">${gameItem[t].origin_price}</div>`:""}
                            <div class="discount_finall_price">${gameItem[t].finall_price}</div>
                        </div>
                    </div>
                    <a class="add_to_cart" href="" data-id=${gameItem[t].gameId}><span>${authInCart[t]?"在购物车中":"添加至购物车"}</span></a>
                </div>
            </div>
            <div class="lower">
                <div class="platform">
                    <span class="earlyaccess">${gameItem[t].state}</span>
                    ${gameItem[t].platForm.reduce((e,a)=>e+`<span class="platform_icon ${a}">.</span>`,"")}
                </div>
                <div class="lower_footer">
                    <div class="tags">
                    ${gameItem[t].tag.reduce((e,a)=>e+`<div class="tag">${a}</div>`,"")}
                    </div>
                    <div class="add_date">
                        添加日期:2022/4/14( <span class="delete" data-id=${gameItem[t].gameId}>移除</span> )
                    </div>
                </div
            </div>
        </div>
    </div></div>`,""),(removeItem=document.querySelectorAll(".delete")).forEach(e=>{e.addEventListener("click",removeHandler)}),(addToCart=document.querySelectorAll(".add_to_cart")).forEach(e=>e.addEventListener("click",addToCartHandler))}function removeHandler(a){newmodal_bg.style.display="block",newmodal.style.display="block",newmodal.addEventListener("click",e=>comfirmHandler(e,Number(a.target.dataset.id)))}async function comfirmHandler(e,a){e.target===comfirm?(await fetch(url+"removeItem/wishlist",{method:"POST",body:JSON.stringify({gameId:a,accountName:authData.data.accountName}),headers:{"Content-Type":"application/json"}}),newmodal_bg.style.display="none",newmodal.style.display="none",init()):e.target===cancle&&(newmodal_bg.style.display="none",newmodal.style.display="none")}async function addToCartHandler(e){"在购物车中"!==e.target.firstElementChild.innerText&&(await auth("addToCart",{accountName:authData.data.accountName,gameId:Number(e.target.dataset.id)})).result&&init()}init();