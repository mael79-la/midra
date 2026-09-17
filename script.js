// --- CONFIGURACIÓN E INICIALIZACIÓN ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x1a052e, 0.015); // Niebla para profundidad

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(scene.fog.color);
document.body.appendChild(renderer.domElement);

// --- ILUMINACIÓN ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffaa44, 0.8);
dirLight.position.set(10, 20, 15);
scene.add(dirLight);

// --- VARIABLES DEL JUEGO ---
let dragon;
let obstacles = [];
let score = 0;
let isGameOver = false;
let gameSpeed = 0.8;
const laneWidth = 4; // Distancia entre carriles (Izquierda, Centro, Derecha)
let currentLane = 0; // -1: Izquierda, 0: Centro, 1: Derecha
let targetX = 0;
let timeoutId; // Control del generador de obstáculos

// --- CREACIÓN DEL JUGADOR (DRAGÓN EN 3D) ---
function createDragon() {
    const dragonGroup = new THREE.Group();

    // Cuerpo principal
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xdd2222, roughness: 0.4 });
    const bodyGeom = new THREE.ConeGeometry(0.7, 2.5, 5);
    bodyGeom.rotateX(Math.PI / 2); // Apuntar hacia adelante
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    dragonGroup.add(body);

    // Alas
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xff5533, side: THREE.DoubleSide });
    const wingGeom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        0, 0, 0,      2.5, 0.5, -0.5,   1.5, 0, -1.5, // Ala derecha
        0, 0, 0,     -2.5, 0.5, -0.5,  -1.5, 0, -1.5  // Ala izquierda
    ]);
    wingGeom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const wings = new THREE.Mesh(wingGeom, wingMat);
    dragonGroup.add(wings);

    // Ojos brillantes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const eyeGeom = new THREE.SphereGeometry(0.15, 8, 8);
    
    const rightEye = new THREE.Mesh(eyeGeom, eyeMat);
    rightEye.position.set(0.3, 0.3, 0.8);
    const leftEye = rightEye.clone();
    leftEye.position.x = -0.3;
    
    dragonGroup.add(rightEye, leftEye);
    dragonGroup.position.set(0, 0, 0);
    
    scene.add(dragonGroup);
    return dragonGroup;
}

dragon = createDragon();

// --- OBSTÁCULOS ---
const obstacleGeom = new THREE.CylinderGeometry(0.6, 1, 4, 4);
const obstacleMat = new THREE.MeshStandardMaterial({ color: 0x00ffcc, flatShading: true, emissive: 0x003322 });

function spawnObstacle() {
    if (isGameOver) return;

    const obs = new THREE.Mesh(obstacleGeom, obstacleMat);
    const randomLane = Math.floor(Math.random() * 3) - 1; // -1, 0, o 1
    
    obs.position.set(randomLane * laneWidth, 0, -60);
    scene.add(obs);
    obstacles.push(obs);

    // Dificultad progresiva en la frecuencia de aparición
    const nextSpawnTime = Math.max(600, 1500 - score * 10);
    timeoutId = setTimeout(spawnObstacle, nextSpawnTime);
}

// --- PARTÍCULAS DE FONDO (ESTRELLAS) ---
const starsGeom = new THREE.BufferGeometry();
const starsCount = 300;
const starPositions = new Float32Array(starsCount * 3);

for(let i = 0; i < starsCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 30;
    starPositions[i+1] = (Math.random() - 0.5) * 20;
    starPositions[i+2] = -Math.random() * 100;
}
starsGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const starsMat = new THREE.PointsMaterial({ color: 0x8844ff, size: 0.3 });
const starField = new THREE.Points(starsGeom, starsMat);
scene.add(starField);

// --- CÁMARA ---
camera.position.set(0, 3, 6);
camera.lookAt(0, 1, -3);

// --- CAPTURA DE EVENTOS Y CONTROLES ---
window.addEventListener('keydown', (e) => {
    if (isGameOver) return;
    
    if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && currentLane > -1) {
        currentLane--;
    }
    if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && currentLane < 1) {
        currentLane++;
    }
    targetX = currentLane * laneWidth;
});

window.addEventListener('touchstart', (e) => {
    if (isGameOver) return;
    const touchX = e.touches[0].clientX;
    if (touchX < window.innerWidth / 2 && currentLane > -1) {
        currentLane--;
    } else if (touchX >= window.innerWidth / 2 && currentLane < 1) {
        currentLane++;
    }
    targetX = currentLane * laneWidth;
});

document.getElementById('restart-btn').addEventListener('click', resetGame);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- BUCLE DE ANIMACIÓN ---
function animate() {
    requestAnimationFrame(animate);

    if (!isGameOver) {
        // Movimiento lateral suave e inclinación aerodinámica
        dragon.position.x += (targetX - dragon.position.x) * 0.2;
        dragon.rotation.z = -(dragon.position.x - targetX) * 0.15;
        dragon.rotation.y = (dragon.position.x - targetX) * 0.1;

        // Efecto visual de aleteo
        const time = Date.now() * 0.008;
        dragon.children[1].rotation.z = Math.sin(time) * 0.2; // Rota solo el ala

        // Efecto túnel de velocidad en las estrellas
        const positions = starField.geometry.attributes.position.array;
        for(let i = 2; i < positions.length; i += 3) {
            positions[i] += gameSpeed;
            if(positions[i] > 5) {
                positions[i] = -100;
            }
        }
        starField.geometry.attributes.position.needsUpdate = true;

        // Actualización de obstáculos
        for (let i = obstacles.length - 1; i >= 0; i--) {
            let obs = obstacles[i];
            obs.position.z += gameSpeed;
            obs.rotation.y += 0.02; // Giro sobre su eje

            // Detección matemática de impacto (Colisión por proximidad)
            let distXZ = Math.sqrt(Math.pow(dragon.position.x - obs.position.x, 2) + Math.pow(dragon.position.z - obs.position.z, 2));
            if (distXZ < 1.2) { 
                endGame();
            }

            // Puntuación al esquivar con éxito
            if (obs.position.z > 10) {
                scene.remove(obs);
                obstacles.splice(i, 1);
                score += 10;
                document.getElementById('score').innerText = score;
                
                // Incremento de velocidad gradual
                gameSpeed = 0.8 + (score * 0.002);
            }
        }
    }

    renderer.render(scene, camera);
}

// --- FLUJO DE JUEGO ---
function endGame() {
    isGameOver = true;
    clearTimeout(timeoutId);
    document.getElementById('gameover-screen').style.display = 'block';
}

function resetGame() {
    obstacles.forEach(obs => scene.remove(obs));
    obstacles = [];
    
    score = 0;
    gameSpeed = 0.8;
    currentLane = 0;
    targetX = 0;
    dragon.position.set(0, 0, 0);
    
    document.getElementById('score').innerText = score;
    document.getElementById('gameover-screen').style.display = 'none';
    
    isGameOver = false;
    spawnObstacle();
}

// Arrancar el juego automáticamente al cargar
spawnObstacle();
animate();

