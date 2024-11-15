document.addEventListener('DOMContentLoaded', () => { 
    const bilhete = document.querySelector('.bilhete');
    const dentro = document.querySelector('.dentro');
    const frente = document.querySelector('.frente');
    const baloesContainer = document.querySelector('.baloes-container');
    const confetesContainer = document.createElement('div');
    confetesContainer.className = 'confetes-container';
    dentro.appendChild(confetesContainer); 
    const videoPlayer = document.getElementById('videoPlayer');
    let balloonTimeout;
    let confettiPlayed = false;
    let balloonsPlayed = false;


    let isOpen = false;


    frente.style.display = 'block';
    dentro.style.display = 'none';

    function startBalloons() {
        if (balloonsPlayed) return;  
        balloonsPlayed = true;  
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
        }, 14000);  
    }

    function startConfetti() {
        if (confettiPlayed) return;  
        confettiPlayed = true;

        for (let i = 0; i < 50; i++) {
            const confete = document.createElement('div');
            confete.className = 'confete';
            confete.style.left = `${Math.random() * 100}vw`;
            confete.style.animationDuration = `${Math.random() * 2 + 3}s`;
            confetesContainer.appendChild(confete);

            confete.addEventListener('animationend', () => {
                confete.remove();
            });
        }
    }

    function openBilhete() {
        frente.style.display = 'none';
        dentro.style.display = 'block';

        startBalloons();  
        setTimeout(startConfetti, 15000);  

        videoPlayer.muted = false;  
        videoPlayer.play().catch(error => {
            console.log("Autoplay falhou:", error);
            videoPlayer.muted = true; 
            videoPlayer.play();
        });

        isOpen = true;
    }

    function closeBilhete() {
        dentro.style.display = 'none';
        frente.style.display = 'block';

        baloesContainer.innerHTML = '';
        confetesContainer.innerHTML = '';

        clearTimeout(balloonTimeout);  
        videoPlayer.pause();  

        isOpen = false;
    }

    function toggleBilhete() {
        if (isOpen) {
            closeBilhete();
        } else {
            openBilhete();
        }
    }


    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    if (isMobile) {
        bilhete.addEventListener('click', toggleBilhete);
    } else {
    
        bilhete.addEventListener('mouseenter', openBilhete);
        bilhete.addEventListener('mouseleave', closeBilhete);
    }
});
