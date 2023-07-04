let targetDate = new Date(Date.UTC(2023, 4, 11, 17, 0, 0));

console.log(targetDate)

const futureTime = targetDate.getTime();
const countdownElement = document.querySelector('.giveaway');


function countdownTimer(targetDate) {
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // If the countdown is over
    if (distance < 0) {
      clearInterval(timer);
      countdownElement.innerHTML = "Countdown is over!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // countdownElement.innerHTML = `${days}天 ${hours}時 ${minutes}分 ${seconds}秒`;
  }, 1000);
}

countdownTimer(targetDate);

let format = (item) => {
  if (item < 10) {
    return (item = `0${item}`);
  }
  return item;
};
