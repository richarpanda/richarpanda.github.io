const prizes = [
  "SIN PREMIO",
  "Botella para el",
  "Sexy",
  "Copa Dama",
  "Copa con tu mesero",
  "Jacuzzi",
  "Premio de Broma",
  "10 segundos",
  "15 segundos",
  "30 segundos",
  "Botella para ella",
  "SIN PREMIO"
];

document.addEventListener("DOMContentLoaded", () => {
  const storedPrize = localStorage.getItem("prize");
  if (storedPrize) {
    displayPrize(storedPrize);
  } else {
    enableSpin();
  }
});

function enableSpin() {
  const border = document.querySelector("img.border");
  const marker = document.querySelector("img.marker");
  const logo = document.querySelector("img.logo");

  border.addEventListener("click", spinRoulette);
  marker.addEventListener("click", spinRoulette);
  logo.addEventListener("click", spinRoulette);
}

function disableSpin() {
  const border = document.querySelector("img.border");
  const marker = document.querySelector("img.marker");
  const logo = document.querySelector("img.logo");

  border.removeEventListener("click", spinRoulette);
  marker.removeEventListener("click", spinRoulette);
  logo.removeEventListener("click", spinRoulette);
}

function spinRoulette() {
  disableSpin();

  const roulette = document.querySelector('.roulette');
  const randomDegree = Math.floor(Math.random() * 360) + 3600;
  const modal = document.getElementById("myModal");
  const winnerText = document.getElementById("winnerText");

  roulette.style.transform = `rotate(${randomDegree}deg)`;

  const winningAngle = randomDegree % 360;
  const winningOption = Math.floor((360 - winningAngle + 15) % 360 / 30);

  setTimeout(() => {
    const prize = prizes[winningOption + 1];
    console.log(winningOption + 1);
    if (winningOption + 1 != 11 && winningOption + 1 != 12 && winningOption + 1 != 1) {
      const winnerDiv = document.querySelector(`.roulette div:nth-child(${winningOption + 2})`);
      winnerDiv.classList.add('winner');
      winnerText.textContent = `¡Felicidades! Ganaste: ${prize}`;
      modal.style.display = "flex";
      launchConfetti();
    }
    else {
      winnerText.textContent = `Lo sentimos, quedaste: ${prize == "undefined" || undefined ? "SIN PREMIO" : prize}`;
      modal.style.display = "flex";
    }
    localStorage.setItem("prize", prize);
  }, 3000);
}

function displayPrize(prize) {
  const modal = document.getElementById("myModal");
  const winnerText = document.getElementById("winnerText");

  if (prize == "SIN PREMIO" || prize == "undefined")
    winnerText.textContent = `Lo sentimos, quedaste: ${prize == "undefined" ? "SIN PREMIO" : prize}`;
  else
    winnerText.textContent = `¡Felicidades! Ganaste: ${prize}`;

  modal.style.display = "flex";
}

function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

document.querySelector(".close").onclick = function () {
  document.getElementById("myModal").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Function to clear localStorage for testing
function clearLocalStorage() {
  localStorage.removeItem("prize");
  location.reload();
}

// Add event listener to clear localStorage button (you need to add this button in your HTML)
document.getElementById("clearLocalStorage").onclick = clearLocalStorage;
