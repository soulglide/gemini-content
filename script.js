const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

let score = 0;

// Player
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: 'white',
    speed: 5,
    dx: 0
};

// Bullets
const bullets = [];
const bullet = {
    width: 5,
    height: 15,
    color: 'white',
    speed: 10
};

// Enemies
const enemies = [];
const enemy = {
    width: 50,
    height: 50,
    color: 'red',
    speed: 2
};
let enemySpawnTimer = 0;

function drawPlayer() {
    ctx.fillStyle = 'white'; // 月の色を白に
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y + player.height / 2, player.width / 2, 0, Math.PI * 2); // 円を描画
    ctx.fill();

    // 月のクレーターを表現 (オプション)
    ctx.fillStyle = '#cccccc'; // クレーターの色
    ctx.beginPath();
    ctx.arc(player.x + player.width * 0.3, player.y + player.height * 0.4, player.width * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.x + player.width * 0.7, player.y + player.height * 0.6, player.width * 0.15, 0, Math.PI * 2);
    ctx.fill();
}

function drawBullets() {
    bullets.forEach(b => {
        ctx.fillStyle = 'white'; // Explicitly set to white
        ctx.fillRect(b.x, b.y, bullet.width, bullet.height);
    });
}

function drawEnemies() {
    enemies.forEach(e => {
        // ハエの体
        ctx.fillStyle = '#333333'; // ハエの体の色を濃い灰色に
        ctx.beginPath();
        ctx.ellipse(e.x + enemy.width / 2, e.y + enemy.height / 2, enemy.width / 3, enemy.height / 2, Math.PI / 2, 0, Math.PI * 2);
        ctx.fill();

        // ハエの羽
        ctx.fillStyle = 'rgba(200, 200, 200, 0.5)'; // 羽の色を半透明の灰色に
        ctx.beginPath();
        ctx.ellipse(e.x + enemy.width / 2 - enemy.width / 4, e.y + enemy.height / 2 - enemy.height / 3, enemy.width / 4, enemy.height / 6, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(e.x + enemy.width / 2 + enemy.width / 4, e.y + enemy.height / 2 - enemy.height / 3, enemy.width / 4, enemy.height / 6, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

function movePlayer() {
    player.x += player.dx;

    // Wall detection
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

function moveBullets() {
    bullets.forEach((b, index) => {
        b.y -= bullet.speed;
        if (b.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}

function moveEnemies() {
    enemies.forEach((e, index) => {
        e.y += enemy.speed;
        if (e.y > canvas.height) {
            enemies.splice(index, 1);
        }
    });
}

function spawnEnemy() {
    enemySpawnTimer++;
    if (enemySpawnTimer >= 60) { // Spawn every second
        const x = Math.random() * (canvas.width - enemy.width);
        const y = -enemy.height;
        enemies.push({ x, y });
        enemySpawnTimer = 0;
    }
}

function collisionDetection() {
    // Bullets and Enemies
    bullets.forEach((b, bIndex) => {
        enemies.forEach((e, eIndex) => {
            if (
                b.x < e.x + enemy.width &&
                b.x + bullet.width > e.x &&
                b.y < e.y + enemy.height &&
                b.y + bullet.height > e.y
            ) {
                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);
                score += 10; // Add score when enemy is hit
                scoreDisplay.textContent = `Score: ${score}`;
            }
        });
    });

    // Player and Enemies
    enemies.forEach(e => {
        if (
            player.x < e.x + enemy.width &&
            player.x + player.width > e.x &&
            player.y < e.y + enemy.height &&
            player.y + player.height > e.y
        ) {
            // Game Over
            alert(`Game Over! Your score: ${score}`);
            document.location.reload();
        }
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0; // Reset shadow blur
    // ctx.shadowColor = 'transparent'; // Reset shadow color

    drawPlayer();
    drawBullets();
    drawEnemies();

    movePlayer();
    moveBullets();
    moveEnemies();

    spawnEnemy();
    collisionDetection();

    requestAnimationFrame(update);
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    } else if (e.key === ' ') { // Space bar for shooting
        const x = player.x + player.width / 2 - bullet.width / 2;
        const y = player.y - 10; // Fire from just in front of the ship
        bullets.push({ x, y });
    }
}

function keyUp(e) {
    if (
        e.key === 'ArrowRight' ||
        e.key === 'Right' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Left'
    ) {
        player.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();
