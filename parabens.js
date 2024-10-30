document.addEventListener('DOMContentLoaded', () => {
    const bilhete = document.querySelector('.bilhete');
    const dentro = document.querySelector('.dentro');
    const frente = document.querySelector('.frente');
    const videoFrame = document.getElementById('videoFrame');
    const playButton = document.getElementById('playButton');
    const baloesContainer = document.querySelector('.baloes-container');
    let balloonTimeout;

    // Estado inicial: mostra apenas .frente
    frente.style.display = 'block';
    dentro.style.display = 'none';

    // Detecta se é Safari no iOS
    const isSafariMobile = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && /iPhone|iPad|iPod/i.test(navigator.userAgent);

    function startBalloons() {
        balloonTimeout = setTimeout(() => {
            for (let i = 0; i < 5; i++) { // Criar múltiplos balões
                const balao = document.createElement('div');
                balao.className = 'balão';
                baloesContainer.appendChild(balao);
                balao.style.left = `${Math.random() * 100}vw`; // Posição horizontal aleatória

                // Animação do balão subindo
                balao.animate([
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-100vh)', opacity: 0 }
                ], {
                    duration: 5000 + Math.random() * 3000, // Tempo de subida variável
                    easing: 'linear',
                    fill: 'forwards'
                });

                balao.addEventListener('animationend', () => {
                    baloesContainer.removeChild(balao);
                });
            }
        }, 22000); // 22 segundos de atraso
    }

    function stopBalloons() {
        clearTimeout(balloonTimeout); // Limpa o temporizador para balões
        while (baloesContainer.firstChild) {
            baloesContainer.removeChild(baloesContainer.firstChild);
        }
    }

    if (window.innerWidth > 768) { // Desktop
        setTimeout(() => {
            frente.style.display = 'none';
            dentro.style.display = 'block';
            videoFrame.src = videoFrame.src.replace("&mute=1", "&mute=0");
        }, 2000);

        bilhete.addEventListener('mouseenter', () => {
            frente.style.display = 'none';
            dentro.style.display = 'block';
            startBalloons(); // Inicia os balões
        });

        bilhete.addEventListener('mouseleave', () => {
            dentro.style.display = 'none';
            frente.style.display = 'block';
            stopBalloons(); // Para os balões
        });
    } else { // Mobile
        bilhete.addEventListener('click', (event) => {
            if (frente.style.display === 'block') {
                frente.style.display = 'none';
                dentro.style.display = 'block';
                startBalloons(); // Inicia os balões após 22s
                if (isSafariMobile) {
                    playButton.style.display = 'block';
                } else {
                    videoFrame.src = videoFrame.src.replace("&mute=1", "&mute=0");
                }
            } else {
                dentro.style.display = 'none';
                frente.style.display = 'block';
                stopBalloons(); // Para os balões
            }
        });
    }

    // Ativa o som no Safari Mobile ao clicar no botão
    playButton.addEventListener('click', (event) => {
        event.stopPropagation();
        videoFrame.src = videoFrame.src.replace("&mute=1", "&mute=0");
        playButton.style.display = 'none';
    });
});
