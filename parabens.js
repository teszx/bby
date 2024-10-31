document.addEventListener('DOMContentLoaded', () => {
    const bilhete = document.querySelector('.bilhete');
    const dentro = document.querySelector('.dentro');
    const frente = document.querySelector('.frente');
    const baloesContainer = document.querySelector('.baloes-container');
    let balloonTimeout;

    function startBalloons() {
        balloonTimeout = setTimeout(() => {
            for (let i = 0; i < 5; i++) { // Número de balões
                const balao = document.createElement('div');
                balao.className = 'balao';
                baloesContainer.appendChild(balao);
                balao.style.left = `${Math.random() * 100}vw`;

                // Animação de subida
                balao.animate([
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-100vh)', opacity: 0 }
                ], {
                    duration: 5000 + Math.random() * 3000,
                    easing: 'linear',
                    fill: 'forwards'
                });

                balao.addEventListener('animationend', () => {
                    baloesContainer.removeChild(balao);
                });
            }
        }, 22000); // 22 segundos de atraso
    }

    if (window.innerWidth > 768) {
        setTimeout(() => {
            frente.style.display = 'none';
            dentro.style.display = 'block';
        }, 2000);

        bilhete.addEventListener('mouseenter', () => {
            frente.style.display = 'none';
            dentro.style.display = 'block';
            startBalloons();
        });

        bilhete.addEventListener('mouseleave', () => {
            dentro.style.display = 'none';
            frente.style.display = 'block';
            clearTimeout(balloonTimeout);
        });
    } else {
        bilhete.addEventListener('click', (event) => {
            if (frente.style.display === 'block') {
                frente.style.display = 'none';
                dentro.style.display = 'block';
                startBalloons();
            } else {
                dentro.style.display = 'none';
                frente.style.display = 'block';
                clearTimeout(balloonTimeout);
            }
        });
    }
});
