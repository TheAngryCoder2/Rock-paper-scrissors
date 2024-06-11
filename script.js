const gameContainer = document.querySelector(".container"),
userResult = document.querySelector(".userResult img"),
cpuResult = document.querySelector(".cpuResult img"),
result = document.querySelector(".result"),
countdown = document.querySelector(".countdown"),
optionImages = document.querySelectorAll(".optionImage");

optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        // Remove active class from all images and add to the clicked one
        optionImages.forEach(image => image.classList.remove("active"));
        image.classList.add("active");

        // Add shake animation
        gameContainer.classList.add("shake");

        // Start countdown
        countdown.textContent = "Rock...";
        setTimeout(() => countdown.textContent = "Paper...", 500);
        setTimeout(() => countdown.textContent = "Scissors...", 1000);

        // Determine results after countdown
        setTimeout(() => {
            gameContainer.classList.remove("shake");
            countdown.textContent = "Rock, Paper, Scissors...";

            let imageSrc = e.currentTarget.querySelector("img").src;
            userResult.src = imageSrc;
            let randomNumber = Math.floor(Math.random() * 3);
            let cpuImages = ["./140215.png", "./140217.png", "./140216.png"];
            cpuResult.src = cpuImages[randomNumber];
            let cpuValue = ["R", "P", "S"][randomNumber];
            let userValue = ["R", "P", "S"][index];
            let outcomes = {
                RR: "Draw",
                RP: "Cpu Wins!",
                RS: "User Wins!", 
                PP: "Draw",
                PR: "User Wins!",
                PS: "Cpu Wins!",
                SS: "Draw",
                SR: "User Wins!",
                SP: "Cpu Wins!",
            };
            let outcomeValue = outcomes[userValue + cpuValue];
            result.textContent = outcomeValue;

            // Add confetti effect for the winner
            if (outcomeValue !== "Draw") {
                let confettiContainer = document.createElement("span");
                confettiContainer.classList.add("confetti");
                confettiContainer.innerHTML = outcomeValue;

                for (let i = 0; i < 30; i++) {
                    let confettiPiece = document.createElement("div");
                    confettiPiece.classList.add("confetti-piece");
                    confettiPiece.style.left = `${Math.random() * 100}%`;
                    confettiPiece.style.backgroundColor = getRandomColor();
                    confettiContainer.appendChild(confettiPiece);
                }

                result.innerHTML = '';
                result.appendChild(confettiContainer);

                setTimeout(() => {
                    confettiContainer.innerHTML = outcomeValue;
                }, 1000);
            }
        }, 1500);
    });
});

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
