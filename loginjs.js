const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("userId").value;
  const pw = document.getElementById("userPw").value;

  if (id === "hshs1234" && pw === "cbhs4321!") {
    alert("관리자 로그인 성공");
    sessionStorage.setItem("admin", "true");
    location.href = "ad.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.id === id && u.pw === pw);

  if (user) {
    alert("로그인 성공!");
    sessionStorage.setItem("loginUser", id);
    location.href = "main.html";
  } else {
    alert("아이디 또는 비밀번호가 틀렸습니다.");
  }
});
