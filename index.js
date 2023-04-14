const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const hourCase = ["час", "часа", "часов"];
const minCase = ["минута", "минуты", "минут"];
const seconndCase = ["секунда", "секунды", "секунд"];

const caseDefinition = (n, arr) => {
  let m = Math.abs(n) % 100;
  let n1 = m % 10;
  if (m > 10 && m < 20) {
    return arr[2];
  }
  if (n1 > 1 && n1 < 5) {
    return arr[1];
  }
  if (n1 == 1) {
    return arr[0];
  }
  return arr[2];
};

const transformationTimeInFormat = (seconds) => {
  const hour = Math.floor(seconds / 3600);
  const min = Math.floor(seconds / 60) - hour * 60;
  const seconnd = seconds - (hour * 60 + min) * 60;
  return `${hour}:${min}:${seconnd} - ${hour} ${caseDefinition(hour, hourCase)}, ${min} ${caseDefinition(min, minCase)}, ${seconnd} ${caseDefinition(
    seconnd,
    seconndCase
  )}`;
};
// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    const idSetInterval = setInterval(() => {
      timerEl.textContent = transformationTimeInFormat(seconds);
      seconds--;
      if (seconds < 0) {
        timerEl.textContent = "Время кончилось!";
        clearInterval(idSetInterval);
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  inputEl.value = inputEl.value.replace(/[^0-9\.]/g, "");
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
