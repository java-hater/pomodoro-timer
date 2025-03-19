const button = document.getElementById('button');
const countdown = document.getElementById('countdown');
const pause = document.getElementById('pause');
const title = document.getElementById('title');
const body = document.getElementById('body');
const count_button = document.getElementsByClassName('count-button');

const colors = ["#086788", "#75BBA7", "#C17767"];

const pomodoro_time = document.getElementById('pomodoro-button');
const short_break_time = document.getElementById('short-break-button');
const long_break_time = document.getElementById('long-break-button');

let running = false;

let timeleft = 1500; //25 minutes
let interval;
let current_timer = 0; //0 = Pomodoro; 1 = Short Break; 2 = Long Break

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

function timer_handler(newtime) {
  clearInterval(interval);
  timeleft = newtime;
  running = false;
  update_countdown();
  body.style.background = colors[current_timer];
  count_button[0].style.color = colors[current_timer];
  count_button[1].style.color = colors[current_timer];
  console.log(current_timer);
}

const focushandler = () => {
  current_timer = 0;
  timer_handler(1500);
};
const shorthandler = () => {
  current_timer = 1
  timer_handler(300);
};
const longhandler = () => {
  current_timer = 2
  timer_handler(1200);
};

button.addEventListener("click", start_countdown);
pause.addEventListener("click", pause_countdown);
pomodoro_time.addEventListener("click", focushandler);
short_break_time.addEventListener("click", shorthandler);
long_break_time.addEventListener("click", longhandler);