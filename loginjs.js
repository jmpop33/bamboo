const form = document.getElementById("loginForm");

form.addEventListener("submit", function(event) {
  event.preventDefault(); 

  const id = document.getElementById("userId").value;
  const pw = document.getElementById("userPw").value;

  if (id === "lol" && pw === "1023") {
    alert("로그인 성공!");
  } else {
    alert("아이디 또는 비밀번호가 틀렸습니다.");
  }
});