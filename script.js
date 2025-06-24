const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const topFlaps = document.querySelectorAll(".top");
const bottomFlaps = document.querySelectorAll(".bottom");

const end = new Date().getTime() + 14 * 24 * 60 * 60 * 1000;

let prev = {
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
};

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const diff = end - now;

  if (diff <= 0) {
    clearInterval(countdown);
    console.log("Countdown complete!");
    return;
  }

  const dys = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const min = Math.floor((diff / (1000 * 60)) % 60);
  const sec = Math.floor((diff / 1000) % 60);

  // Update DOM text
  days.innerHTML = dys;
  hours.innerHTML = hrs;
  minutes.innerHTML = min;
  seconds.innerHTML = sec;

  // Animate only if the value changed
  if (sec !== prev.seconds) triggerFlip(3); // seconds flap
  if (min !== prev.minutes) triggerFlip(2); // minutes flap
  if (hrs !== prev.hours) triggerFlip(1); // hours flap
  if (dys !== prev.days) triggerFlip(0); // days flap

  // Save current values for next comparison
  prev = { days: dys, hours: hrs, minutes: min, seconds: sec };
}, 1000);

// 👇 Reusable flip animation function
function triggerFlip(index) {
  topFlaps[index].animate(
    [{ transform: "rotateX(360deg)" }, { transform: "rotateX(180deg)" }],
    {
      duration: 500,
      fill: "forwards",
      easing: "ease-in-out",
    }
  );
  bottomFlaps[index].animate(
    [{ transform: "rotateX(0deg)" }, { transform: "rotateX(180deg)" }],
    {
      duration: 500,
      fill: "forwards",
      easing: "ease-in-out",
    }
  );
}
