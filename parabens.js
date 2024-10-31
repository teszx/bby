document.addEventListener('DOMContentLoaded', () => {
    const bilhete = document.querySelector('.bilhete');
    const dentro = document.querySelector('.dentro');
    const frente = document.querySelector('.frente');
    const baloesContainer = document.querySelector('.baloes-container');
    const videoFrame = document.getElementById('videoFrame');
    const playButton = document.getElementById('playButton');
    let balloonTimeout;

    // Configuração inicial
    frente.style.display = 'block'; // Exibe a frente
    dentro.style.display = 'none'; // Esconde a dentro

    // Função para iniciar os balões após 14 segundos
    function startBalloons() {
        balloonTimeout = setTimeout(() => {
            for (let i = 0; i < 10; i++) {
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
        }, 14000); // Atraso de 14 segundos
    }

    // Função para alternar entre frente e dentro
    function toggleBilhete() {
        if (frente.style.display === 'block') {
            frente.style.display = 'none';
            dentro.style.display = 'block';
            startBalloons(); // Inicia os balões
            if (playButton) playButton.style.display = 'block'; // Mostra botão no Safari Mobile
        } else {
            dentro.style.display = 'none';
            frente.style.display = 'block';
            clearTimeout(balloonTimeout); // Para o timer dos balões
        }
    }

    // Detecta se é um dispositivo móvel
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // Configuração de eventos
    if (isMobile) {
        bilhete.addEventListener('click', () => {
            toggleBilhete();
            videoFrame.src = videoFrame.src.replace("&mute=1", "&mute=0"); // Ativa som
        });
    } else {
        bilhete.addEventListener('mouseenter', toggleBilhete);
        bilhete.addEventListener('mouseleave', () => {
            dentro.style.display = 'none';
            frente.style.display = 'block';
            clearTimeout(balloonTimeout); // Para o timer dos balões
        });
    }

    // Ativa o som no Safari Mobile
    if (playButton) {
        playButton.addEventListener('click', (event) => {
            event.stopPropagation();
            videoFrame.src = videoFrame.src.replace("&mute=1", "&mute=0"); // Ativa som
            playButton.style.display = 'none';
        });
    }
});
