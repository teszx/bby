document.addEventListener("DOMContentLoaded", () => {
    const bilhete = document.querySelector(".bilhete");
    const dentro = document.querySelector(".dentro");
    const frente = document.querySelector(".frente");
    const baloes = document.querySelectorAll(".baloes-container .balao");
    const videoFrame = document.getElementById("videoFrame");
    const playButton = document.getElementById("playButton");

    // Estado inicial do cartão
    frente.style.display = "block";
    dentro.style.display = "none";

    // Verifica se o dispositivo é Safari no iOS
    const isSafariMobile = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && /iPhone|iPad|iPod/i.test(navigator.userAgent);

    function startBalloons() {
        baloes.forEach((balao, index) => {
            balao.style.animationDelay = `${index * 0.5}s`; // Atraso para cada balão
            balao.style.animationPlayState = "running"; // Inicia a animação
            balao.style.opacity = 1; // Torna o balão visível
        });
    }

    function stopBalloons() {
        baloes.forEach(balao => {
            balao.style.animationPlayState = "paused"; // Pausa a animação
            balao.style.opacity = 0; // Torna o balão invisível
        });
    }

    if (window.innerWidth > 768) {
        // No PC, troca automaticamente após 2 segundos
        setTimeout(() => {
            frente.style.display = "none";
            dentro.style.display = "block";
            videoFrame.src = videoFrame.src.replace("&mute=1", "&mute=0");
        }, 2000);

        bilhete.addEventListener("mouseenter", () => {
            // Não inicia os balões na frente
            frente.style.display = "none";
            dentro.style.display = "block";
            startBalloons();
        });

        bilhete.addEventListener("mouseleave", () => {
            // Para os balões quando o mouse sai da área
            stopBalloons();
            dentro.style.display = "none";
            frente.style.display = "block";
        });
    } else {
        bilhete.addEventListener("click", (event) => {
            if (frente.style.display === "block") {
                frente.style.display = "none";
                dentro.style.display = "block";
                startBalloons(); // Inicia os balões ao entrar na parte de dentro
                if (isSafariMobile) {
                    playButton.style.display = "block";
                } else {
                    videoFrame.src = videoFrame.src.replace("&mute=1", "&mute=0");
                }
            } else {
                dentro.style.display = "none";
                frente.style.display = "block";
                stopBalloons(); // Para os balões ao voltar para a frente
            }
        });
    }

    // Ativa o som no Safari Mobile ao clicar no botão
    playButton.addEventListener("click", (event) => {
        event.stopPropagation();
        videoFrame.src = videoFrame.src.replace("&mute=1", "&mute=0");
        playButton.style.display = "none";
    });
});
