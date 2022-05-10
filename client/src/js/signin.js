const form = document.querySelector("form");
const loading = document.querySelector(".loading");
const warning = document.querySelector(".warning");
const btn = document.querySelector("button");
const sub = document.querySelector(".sub");
const url = "http://127.0.0.1:4010/";
btn.addEventListener("click", submitHandler);

async function submitHandler(e) {
  e.preventDefault();
  sub.style.display = "none";
  loading.style.display = "block";
  let formData = new FormData(form);
  let data = await fetch(url + "signin", {
    method: "POST",
    body: formData,
  });
  data = await data.json();
  if (data.result) {
    setTimeout(() => {
      location.href = "../index.html";
    }, Math.random() * 2000 + 2000);
  } else {
    setTimeout(() => {
      warning.style.display = "block";
      sub.style.display = "block";
      loading.style.display = "none";
    }, Math.random() * 2000 + 2000);
  }
}
