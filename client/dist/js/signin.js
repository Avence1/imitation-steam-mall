const form=document.querySelector("form"),loading=document.querySelector(".loading"),warning=document.querySelector(".warning"),btn=document.querySelector("button"),sub=document.querySelector(".sub"),url="http://127.0.0.1:4010/";async function submitHandler(e){e.preventDefault(),sub.style.display="none",loading.style.display="block";e=new FormData(form);let t=await fetch(url+"signin",{method:"POST",body:e});(t=await t.json()).result?setTimeout(()=>{location.href="../index.html"},2e3*Math.random()+2e3):setTimeout(()=>{warning.style.display="block",sub.style.display="block",loading.style.display="none"},2e3*Math.random()+2e3)}btn.addEventListener("click",submitHandler);