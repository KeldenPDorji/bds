const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const colors = ['#FFC107', '#FF5722', '#4CAF50', '#03A9F4', '#E91E63'];

// Confetti class
class Confetti {
    constructor(x, y, size, color, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.rotation = 0;
        this.rotationSpeed = Math.random() * 0.05 - 0.025;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.rotation += this.rotationSpeed;

        // Reset confetti when out of bounds
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

// Create confetti
for (let i = 0; i < 100; i++) {
    const size = Math.random() * 10 + 5;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const velocityX = Math.random() * 2 - 1;
    const velocityY = Math.random() * 3 + 1;

    confettiPieces.push(new Confetti(x, y, size, color, velocityX, velocityY));
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach(piece => {
        piece.update();
        piece.draw();
    });

    requestAnimationFrame(animate);
}

// Start animation
animate();

// Reveal button functionality
const revealButton = document.getElementById('revealButton');
const cakeImage = document.getElementById('cakeImage');

revealButton.addEventListener('click', () => {
    cakeImage.classList.toggle('hidden');
    revealButton.textContent = cakeImage.classList.contains('hidden')
        ? 'Press Here for the Cake!'
        : 'Hide the Cake';
});
