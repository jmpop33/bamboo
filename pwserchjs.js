const form = document.getElementById("pwserch");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("username").value.trim();
  const school = document.getElementById("school").value.trim();
  const phone = document.getElementById("phnumber").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.name === name && u.school === school && u.phone === phone);

  if (user) {
    alert("비밀번호 찾기 성공!\n비밀번호: " + user.pw);
  } else {
    alert("일치하는 회원 정보가 없습니다.");
  }
});
