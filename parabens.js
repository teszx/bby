document.addEventListener('DOMContentLoaded', () => {
    const bilhete = document.querySelector('.bilhete');
    const dentro = document.querySelector('.dentro');
    const frente = document.querySelector('.frente');
    const baloesContainer = document.querySelector('.baloes-container');
    let balloonTimeout;

    function startBalloons() {
        // Garante que os balões começam após o atraso desejado
        balloonTimeout = setTimeout(() => {
            for (let i = 0; i < 5; i++) { // Número de balões
                const balao = document.createElement('div');
                balao.className = 'balao';
                balao.style.left = `${Math.random() * 100}vw`;
                baloesContainer.appendChild(balao);

                // Configura a animação para cada balão
                balao.animate([
                    { transform: 'translateY(100vh)', opacity: 1 },
                    { transform: 'translateY(-100vh)', opacity: 0 }
                ], {
                    duration: 8000 + Math.random() * 2000,
                    easing: 'ease-out',
                    fill: 'forwards'
                });

                // Remove o balão após a animação
                balao.addEventListener('animationend', () => {
                    balao.remove();
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
            clearTimeout(balloonTimeout); // Interrompe o timer se o mouse sair
        });
    } else {
        bilhete.addEventListener('click', () => {
            if (frente.style.display === 'block') {
                frente.style.display = 'none';
                dentro.style.display = 'block';
                startBalloons();
            } else {
                dentro.style.display = 'none';
                frente.style.display = 'block';
                clearTimeout(balloonTimeout); // Interrompe o timer em dispositivos móveis
            }
        });
    }
});
