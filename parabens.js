document.addEventListener('DOMContentLoaded', () => {
    const bilhete = document.querySelector('.bilhete');
    const dentro = document.querySelector('.dentro');
    const frente = document.querySelector('.frente');
    const baloesContainer = document.querySelector('.baloes-container');
    const videoFrame = document.getElementById('videoFrame');
    const playButton = document.getElementById('playButton');
    let balloonTimeout;

    // Configuração inicial: mostra apenas a .frente
    frente.style.display = 'block';
    dentro.style.display = 'none';

    // Função para iniciar os balões com um atraso de 14 segundos
    function startBalloons() {
        balloonTimeout = setTimeout(() => {
            for (let i = 0; i < 10; i++) { // Mude 5 para 10
                const balao = document.createElement('div');
                balao.className = 'balao';
                balao.style.left = `${Math.random() * 100}vw`;
                baloesContainer.appendChild(balao);

                balao.animate([
                    { transform: 'translateY(100vh)', opacity: 1 },
                    { transform: 'translateY(-100vh)', opacity: 0 }
                ], {
                    duration: 8000 + Math.random() * 2000,
                    easing: 'ease-out',
                    fill: 'forwards'
                });

                balao.addEventListener('animationend', () => {
                    balao.remove();
                });
            }
        }, 14000); // Altere para 14 segundos
    }

    // Função para alternar entre .frente e .dentro
    function toggleBilhete() {
        if (frente.style.display === 'block') {
            frente.style.display = 'none';
            dentro.style.display = 'block';
            startBalloons();
            if (playButton) playButton.style.display = 'block'; // Exibe botão no Safari Mobile
        } else {
            dentro.style.display = 'none';
            frente.style.display = 'block';
            clearTimeout(balloonTimeout); // Para o timer dos balões ao alternar
        }
    }

    // Detecta se é um dispositivo móvel
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // Configuração de eventos para troca entre .frente e .dentro
    if (isMobile) {
        bilhete.addEventListener('click', () => {
            toggleBilhete();
            videoFrame.src = videoFrame.src.replace("&mute=1", "&mute=0");
        });
    } else {
        bilhete.addEventListener('mouseenter', toggleBilhete);
        bilhete.addEventListener('mouseleave', () => {
            dentro.style.display = 'none';
            frente.style.display = 'block';
            clearTimeout(balloonTimeout); // Para o timer dos balões ao sair
        });
    }

    // Safari Mobile: Ativa o som ao clicar no botão play
    if (playButton) {
        playButton.addEventListener('click', (event) => {
            event.stopPropagation();
            videoFrame.src = videoFrame.src.replace("&mute=1", "&mute=0");
            playButton.style.display = 'none';
        });
    }
});
