const button = document.getElementById('button');
const countdown = document.getElementById('countdown');
const stop = document.getElementById('stop');

let timeleft = 1500;
let interval;

const update_countdown = () => {
  const mins = Math.floor(timeleft / 60);
  const secs = timeleft % 60;

  countdown.innerHTML = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2,'0')}`;
};

const start_countdown = () => {
  interval = setInterval(() => {
    timeleft--;
    update_countdown();
    
    if(timeleft === 0) {
      clearInterval(interval);
      alert("Time's up!");
      timeleft = 1500;
      update_countdown();
    }
  }, 1000)
};

const pause_countdown = () => clearInterval(interval);

button.addEventListener("click", start_countdown);
stop.addEventListener("click", pause_countdown);
