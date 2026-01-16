const form = document.getElementById("signupForm");
const checkBtn = document.getElementById("checkIdBtn");
const idInput = document.getElementById("id");
const msg = document.getElementById("idCheckMsg");

let isIdChecked = false;

checkBtn.addEventListener("click", function () {
  const id = idInput.value.trim();
  if (!id) {
    msg.textContent = "아이디를 입력해주세요.";
    msg.style.color = "red";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find(user => user.id === id);

  if (exists) {
    msg.textContent = "이미 사용 중인 아이디입니다.";
    msg.style.color = "red";
    isIdChecked = false;
  } else {
    msg.textContent = "사용 가능한 아이디입니다.";
    msg.style.color = "green";
    isIdChecked = true;
  }
});

idInput.addEventListener("input", function () {
  isIdChecked = false;
  msg.textContent = "";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!isIdChecked) {
    alert("아이디 중복 확인을 해주세요.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const school = document.getElementById("school").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const id = document.getElementById("id").value.trim();
  const pw = document.getElementById("pw").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(user => user.id === id)) {
    alert("이미 존재하는 아이디입니다.");
    return;
  }

  users.push({
    name,
    age,
    school,
    phone,
    id,
    pw
  });

  localStorage.setItem("users", JSON.stringify(users));
  alert("회원가입이 완료되었습니다!");
  location.href = "login.html";
});
