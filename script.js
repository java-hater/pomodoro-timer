const start_mins = 10;
let time = start_mins * 60;

const countdown = document.getElementById('countdown');
setInterval(update_countdown, 1000);
function update_countdown() {
  const mins = Math.floor(time / 60);
  let secs = time % 60;

  countdown.innerHTML = `${mins}: ${secs}`;
  time--;
}
