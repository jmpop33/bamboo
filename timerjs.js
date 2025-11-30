let timer = null;    
let centiseconds = 0;   // 1/100초 단위로 저장

function updateDisplay() {
    let totalSeconds = Math.floor(centiseconds / 100);

    let hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    let mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    let secs = String(totalSeconds % 60).padStart(2, '0');

    let cs = String(centiseconds % 100).padStart(2, '0');   // 1/100초

    document.getElementById("display").innerText = `${hrs}:${mins}:${secs}:${cs}`;
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            centiseconds++;
            updateDisplay();
        }, 10);   // 0.01초(1/100초)마다 갱신
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