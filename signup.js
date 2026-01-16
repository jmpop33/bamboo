const form = document.getElementById("signupForm");
const checkBtn = document.getElementById("checkIdBtn");
const idInput = document.getElementById("id");
const msg = document.getElementById("idCheckMsg");

let isIdChecked = false;

/* 아이디 중복 확인 */
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

/* 아이디 변경 시 중복확인 초기화 */
idInput.addEventListener("input", function () {
  isIdChecked = false;
  msg.textContent = "";
});

/* 회원가입 */
form.addEventListener("submit", function (e) {
  e.preventDefault(); // ⭐ 제일 중요

  if (!isIdChecked) {
    alert("아이디 중복 확인을 해주세요.");
    return;
  }

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const school = document.getElementById("school").value;
  const id = idInput.value;
  const pw = document.getElementById("pw").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // 최종 중복 방어
  if (users.find(user => user.id === id)) {
    alert("이미 존재하는 아이디입니다.");
    return;
  }

  users.push({ name, age, school, id, pw });
  localStorage.setItem("users", JSON.stringify(users));

  alert("회원가입이 완료되었습니다!");
  location.href = "login.html";
});
