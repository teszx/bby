document.addEventListener("DOMContentLoaded", () => {
    const bilhete = document.querySelector(".bilhete");
    const baloes = document.querySelectorAll(".baloes-container .balao");

    function startBalloons() {
        baloes.forEach(balao => {
            balao.style.animationPlayState = "running";
        });
    }

    function stopBalloons() {
        baloes.forEach(balao => {
            balao.style.animationPlayState = "paused";
            balao.style.transform = "translateY(0)"; // reinicia a posição
        });
    }

    bilhete.addEventListener("mouseenter", startBalloons);
    bilhete.addEventListener("mouseleave", stopBalloons);

    // Para dispositivos móveis, onde o hover não é aplicável
    bilhete.addEventListener("click", () => {
        if (baloes[0].style.animationPlayState === "paused") {
            startBalloons();
        } else {
            stopBalloons();
        }
    });
});
