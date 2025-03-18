const button = document.getElementById('button');
const countdown = document.getElementById('countdown');
const pause = document.getElementById('pause');
const title = document.getElementById('title');
let running = false;

let timeleft = 1500; //25 minutes
let interval;

const update_countdown = () => {
  const mins = Math.floor(timeleft / 60);
  const secs = timeleft % 60;

  countdown.innerHTML = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2,'0')}`;
  title.innerHTML = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2,'0')} - Pomodoro`;
};

const start_countdown = () => {
  if (running) {
    return;
  }

  interval = setInterval(() => {
    running = true;
    timeleft--;
    update_countdown();
    
    if(timeleft === 0) {
      clearInterval(interval);
      alert("Time's up!");
      timeleft = 1500;
      running = false;
      update_countdown();
    }
  }, 1000)
};

const pause_countdown = () => {
  clearInterval(interval);
  running = false;
};

button.addEventListener("click", start_countdown);
pause.addEventListener("click", pause_countdown);
