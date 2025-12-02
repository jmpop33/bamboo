const form = document.getElementById("pwserch");

form.addEventListener("submit", function(event) {
  event.preventDefault(); 

  const un = document.getElementById("username").value;
  const pn = document.getElementById("phnumber").value;

  if (un === "김형석" && pn === "01011223344") {
    alert("비밀번호 찾기 성공!");
    alert("비밀번호: cbhs1234!")
  } else {
    alert("존재하지 않는 정보입니다.");
  }
});