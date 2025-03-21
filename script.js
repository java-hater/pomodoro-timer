const button = document.getElementById('button');
const countdown = document.getElementById('countdown');
const pause = document.getElementById('pause');
const title = document.getElementById('title');
const body = document.getElementById('body');
const break_counter = document.getElementById('break-counter');
const count_button = document.getElementsByClassName('count-button');
const timer_button = document.getElementsByClassName('small-button');

let running = false;
let interval;
let current_timer = 0; //0 = Pomodoro; 1 = Short Break; 2 = Long Break; 3 = Debug;
const colors = ["#086788", "#75BBA7", "#AA968A"];
const times = [1500, 300, 1200]; //20 minutes, 5 minutes, and 20 minutes respectively
let timeleft = times[current_timer];
let count = 0;

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
      // Super in-elegent but it's fiiiine
      if(current_timer === 1) {
        count++;
      }
      if (current_timer === 2) {
        count = 0;
      }
      counterHandler();
      clearInterval(interval);
      play_sound();
      timeleft = times[current_timer];
      running = false;
      update_countdown();
    }
  }, 1000)
};

const pause_countdown = () => {
  clearInterval(interval);
  running = false;
};

function play_sound() {
  var beep = new Audio('notification-alert.mp3');
  beep.play();
}

function timer_handler(newtime) {
  clearInterval(interval);
  timeleft = newtime;
  running = false;
  update_countdown();
  body.style.background = colors[current_timer];
  count_button[0].style.color = colors[current_timer];
  count_button[1].style.color = colors[current_timer];
  timer_button[current_timer].style.backgroundColor = "rgba(0,0,0,0.1)";
}

const focushandler = () => {
  timer_button[current_timer].style.backgroundColor = "rgba(0,0,0,0)";
  current_timer = 0;
  timer_handler(times[current_timer]);
};
const shorthandler = () => {
  timer_button[current_timer].style.backgroundColor = "rgba(0,0,0,0)";
  current_timer = 1;
  timer_handler(times[current_timer]);
};
const longhandler = () => {
  timer_button[current_timer].style.backgroundColor = "rgba(0,0,0,0)";
  current_timer = 2;
  timer_handler(times[current_timer]);
};

function counterHandler() {
  break_counter.innerHTML = `${count.toString()}`
}

button.addEventListener("click", start_countdown);
pause.addEventListener("click", pause_countdown);
timer_button[0].addEventListener("click", focushandler);
timer_button[1].addEventListener("click", shorthandler);
timer_button[2].addEventListener("click", longhandler);

