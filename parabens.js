document.addEventListener('DOMContentLoaded', () => {
    const bilhete = document.querySelector('.bilhete');
    const dentro = document.querySelector('.dentro');
    const frente = document.querySelector('.frente');
    const baloesContainer = document.querySelector('.baloes-container');
    const videoFrame = document.getElementById('videoFrame');
    const playButton = document.getElementById('playButton');
    let balloonTimeout;

    // Função para iniciar os balões com um atraso de 22 segundos
    function startBalloons() {
        balloonTimeout = setTimeout(() => {
            for (let i = 0; i < 5; i++) {
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
        }, 22000); 
    }

    // Função para trocar entre .frente e .dentro
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

    // Detecta Safari Mobile para tratamento do som
    const isSafariMobile = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && /iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Configuração de eventos para desktop e mobile
    if (window.innerWidth > 768) {
        frente.style.display = 'block';
        dentro.style.display = 'none';

        bilhete.addEventListener('mouseenter', () => {
            toggleBilhete();
        });
        bilhete.addEventListener('mouseleave', () => {
            toggleBilhete();
        });
    } else {
        bilhete.addEventListener('click', (event) => {
            toggleBilhete();
            if (!isSafariMobile) {
                videoFrame.src = videoFrame.src.replace("&mute=1", "&mute=0");
            }
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
