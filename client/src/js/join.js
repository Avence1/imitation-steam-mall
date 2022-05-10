const form = document.querySelector("form");
const submitBtn = document.querySelector(".submit");
const continueBtn = document.querySelector(".continue");
const loading = document.querySelector(".loading");
const warning = document.querySelector(".warning");
const hasaccount = document.querySelector(".hasaccount");
const url = "http://127.0.0.1:4010/";
submitBtn.addEventListener("click", btnHandler);
continueBtn.addEventListener("click", btnHandler);
auth();
async function btnHandler(e) {
  e.preventDefault();
  if (e.target === continueBtn) {
    window.sessionStorage.email = "";
    auth();
  }
  if (e.target === submitBtn) {
    warning.style.display = "none";
    let warningText = "";
    const formData = new FormData(form);
    const accountName = formData.get("accountName");
    const password = formData.get("password");
    const confirm_password = formData.get("confirm_password");
    const passwordReg = new RegExp(
      /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[\.!@#$%^&*? ])\S*$/
    );
    passwordReg.test(password)
      ? ""
      : (warningText += "密码格式错误，请重新检查后输入。</br>");
    password
      ? password === confirm_password
        ? ""
        : (warningText += "请在两个密码字段中输入相同的内容。</br>")
      : (warningText += "请正确填写密码。</br>");
    let authName = await fetch(url + "auth/name", {
      method: "POST",
      body: JSON.stringify({ name: accountName }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    authName = await authName.json();
    authName.result
      ? ""
      : (warningText += "用户名重复,请输入其他用户名。</br>");
    warningText === ""
      ? (warning.style.display = "none")
      : (warning.style.display = "block");
    warning.innerHTML = warningText;
    if (warningText) return;
    e.target.parentElement.style.display = "none";
    loading.style.display = "block";
    let data = await fetch(url + "signup/join", {
      method: "POST",
      body: formData,
    });
    data = await data.json();

    data.result
      ? setTimeout(() => {
          location.href = "../html/signin.html";
        }, Math.random() * 2000 + 2000)
      : "";
  }
}
async function auth() {
  let data = await fetch(url + "auth", {
    method: "post",
    body: JSON.stringify({ email: window.sessionStorage.email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  data = await data.json();
  if (data.result) {
    hasaccount.style.display = "block";
    form.style.display = "none";
  } else {
    hasaccount.style.display = "none";
    form.style.display = "block";
  }
}
