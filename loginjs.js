const form = document.getElementById("loginForm");

form.addEventListener("submit", function(event) {
  event.preventDefault(); 

  const id = document.getElementById("userId").value;
  const pw = document.getElementById("userPw").value;

  if (id === "hs1234" && pw === "cbhs1234!") {
    alert("로그인 성공!");
    sessionStorage.setItem("login", true);
    location.href = "main.html"; 
  } else {
    alert("아이디 또는 비밀번호가 틀렸습니다.");
  }
});

funtion notpro() {
  alert("지원하지 않는 기능입니다.")
}
