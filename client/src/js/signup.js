const form = document.querySelector("form");
const submitBtn = document.querySelector("button");
const warning = document.querySelector(".warning");
const loading = document.querySelector(".loading");
submitBtn.addEventListener("click", submitHandler);
async function submitHandler(e) {
  e.preventDefault();
  const data = new FormData(form);
  const emailReg = new RegExp(
    /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  );
  let warningText = "";
  emailReg.test(data.get("email"))
    ? ""
    : (warningText += "请输入有效的电子邮箱地址。</br>");
  data.get("confirm_email")
    ? data.get("email") === data.get("confirm_email")
      ? ""
      : (warningText += "请在两个电子邮件地址字段中输入相同的地址。</br>")
    : (warningText += "请填写确认电子邮箱字段。</br>");

  data.get("agree") === "on"
    ? ""
    : (warningText += "您必须同意《Steam订户协议》才能继续。</br>");
  warningText === ""
    ? (warning.style.display = "none")
    : (warning.style.display = "block");
  warning.innerHTML = warningText;
  if (warningText) return;
  e.target.style.display = "none";
  loading.style.display = "block";
  let receive = await fetch("http://127.0.0.1:4010/signup", {
    method: "post",
    body: data,
  });
  receive = await receive.json();
  if (receive.result) {
    window.sessionStorage.email = data.get("email");
    setTimeout(function () {
      location.href = "../html/join.html";
    }, Math.random() * 2000 + 2000);
  }
}
