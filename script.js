const coin = document.querySelector(".coin");
const outcome = document.getElementById("outcome");

coin.addEventListener("click", () => {
  coin.style.animation = "";
  void coin.offsetWidth;

  new Audio("audio.mp3").play();

  const random = Math.floor(Math.random() * 2);
  console.log("Random result:", random === 0 ? "YES" : "NO");

  const spins = Math.floor(Math.random() * 6) + 3;
  const finalRotation = random === 0 ? 0 : 180;

  const totalRotation =
    random === 0
      ? 360 * spins + finalRotation
      : 360 * (spins + 1.0) + finalRotation;

  const flipKeyframes = `
        @keyframes dynamicFlipUp {
            0% { transform: scale(1) rotateY(0deg); }
            25% { transform: scale(1.2) rotateY(90deg); }
            50% { transform: scale(1.2) rotateY(180deg); }
            75% { transform: scale(1.1) rotateY(270deg); }
            100% { transform: scale(1) rotateY(${totalRotation % 360}deg); }
        }
    `;

  const styleSheet = document.styleSheets[0];
  const ruleIndex = Array.from(styleSheet.cssRules).findIndex(
    (rule) => rule.name === "dynamicFlipUp"
  );
  if (ruleIndex !== -1) {
    styleSheet.deleteRule(ruleIndex);
  }
  styleSheet.insertRule(flipKeyframes, styleSheet.cssRules.length);

  const duration = random === 0 ? spins * 0.2 : (spins + 0.5) * 0.2;
  coin.style.animation = `dynamicFlipUp ${duration}s linear forwards`;

  setTimeout(() => {
    if (random === 0) {
      outcome.textContent = "YES! Do it, child.";
    } else {
      outcome.textContent = "NO! Maybe next time.";
    }
  }, duration * 1000);

  setTimeout(() => {
    outcome.textContent = "Click the coin to flip it!";
    // coin.style.animation = "bounce 2s ease-in-out infinite";
  }, duration * 1800);
});

function playAudio() {
  var audio = document.getElementById("audio");
  audio.play();
}
