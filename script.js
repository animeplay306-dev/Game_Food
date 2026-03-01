// Create floating food items in background
const foods = ['🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🥞', '🍩', '🍪', '🍫'];
const bgAnimation = document.getElementById('bgAnimation');

for (let i = 0; i < 20; i++) {
    const item = document.createElement('div');
    item.className = 'floating-item';
    item.textContent = foods[Math.floor(Math.random() * foods.length)];
    item.style.left = Math.random() * 100 + '%';
    item.style.animationDelay = Math.random() * 15 + 's';
    item.style.animationDuration = (10 + Math.random() * 10) + 's';
    bgAnimation.appendChild(item);
}

// Loading animation
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 2000);
}

// Coming soon alert
function showComingSoon() {
    alert('🎮 النسخة الأونلاين قريباً! حمّل التطبيق الآن للاستمتاع باللعبة');
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// PWA Install
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
            installBtn.style.display = 'none';
        });
    }
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log('Service Worker Registered');
    }).catch((err) => {
        console.log('Service Worker registration failed:', err);
    });
}

