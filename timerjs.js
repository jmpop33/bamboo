let timer = null;    
let centiseconds = 0;

function updateDisplay() {
    let totalSeconds = Math.floor(centiseconds / 100);

    let hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    let mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    let secs = String(totalSeconds % 60).padStart(2, '0');

    let cs = String(centiseconds % 100).padStart(2, '0'); 

    document.getElementById("display").innerText = `${hrs}:${mins}:${secs}:${cs}`;
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            centiseconds++;
            updateDisplay();
        }, 10);
    }
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    centiseconds = 0;
    updateDisplay();
}

window.onload = () => {
    const isLogin = sessionStorage.getItem("login");
    if (isLogin !== "true"){
        alert("로그인이 필요합니다");
        location = "login.html";
    }
}
