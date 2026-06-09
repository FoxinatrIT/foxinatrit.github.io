const helpButton = document.getElementById("helpButton");
const tipText = document.getElementById("tip");

const tips = [
    "Controleer altijd de afzender van een e-mail.",
    "Gebruik een uniek wachtwoord voor elke account.",
    "Activeer tweestapsverificatie waar mogelijk.",
    "Klik niet op verdachte links.",
    "Vraag hulp als je twijfelt over een bericht."
];

helpButton.addEventListener("click", () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipText.textContent = randomTip;
});