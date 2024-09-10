// Declaración de variables y constantes
let totalsum = 0; // Variable para almacenar la suma total de los resultados de los dados
let rocketCell = null; // Variable para guardar la celda actual del cohete en el tablero
let previousRocketPosition = 0; // Variable que registra la posición anterior del cohete
const miAudio = document.getElementById('miAudio'); // Constante que obtiene el elemento de audio con el id 'miAudio'
let passedPositions = []; // Array para almacenar las posiciones por donde ha pasado el cohete

// Función que suma los dígitos de un número
function sumDigits(number) {
    return number.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}

// Función que simula el lanzamiento de dados y controla el avance del cohete en el tablero
function rollDice() {
    let diceResults = [];
    for (let i = 0; i < 3; i++) {
        let randomNumber = Math.floor(Math.random() * 9) + 1; // Lanzar los 3 dados de 9 caras
        diceResults.push(randomNumber);
    }

    let sum = diceResults.reduce((acc, curr) => acc + curr, 0);

    if (rocketCell) {
        rocketCell.innerHTML = '';
    }

    totalsum += sum;

    displayDiceResults(diceResults);

    if (totalsum === 31) {
        totalsum = 13;
        alert('Te encuentras con extraterrestres. Retrocedes a la casilla 13.');
    } else if (totalsum === 33) {
        alert('Caíste en un agujero negro. Has perdido el juego. Puedes reiniciar el juego.');
        totalsum = 0;
        return;
    }

    if (totalsum === 42){
        alert('Felicidades, te has pasado el juego')
    }
    if (totalsum > 42) {
        alert('Has sobrepasado la galaxia, reinicia el juego');
        miAudio2.src = 'gameover.mp3';
        miAudio2.play();
        return;
    }

    let newPosition = totalsum;

    rocketCell = document.querySelector(`.row:nth-child(${Math.ceil(newPosition / 7)}) .celda:nth-child(${newPosition % 7 || 7})`);
    rocketCell.innerHTML = '<img src="cohete.png" alt="Cohete" style="width: 50px; height: 50px;">';

    previousRocketPosition = newPosition;

    // Agregar la posición actual a las posiciones pasadas
    passedPositions.push(previousRocketPosition);
}

// Función para mostrar los resultados de los dados en la interfaz
function displayDiceResults(results) {
    const diceSimulation = document.getElementById('dice-simulation');
    diceSimulation.innerHTML = `Resultados: ${results.map(result => `[${result}]`).join(' ')} <br> Suma Total: ${totalsum}`;
}

// Función para reiniciar la reproducción del audio
function restartAudio() {
    miAudio.currentTime = 0; // Reiniciar el tiempo de reproducción a cero
    miAudio.src = 'common_fight.mp3'; // Establecer la música principal
    miAudio.play(); // Iniciar la reproducción del audio
}

// Función para reiniciar el juego a su estado inicial
function restartGame() {
    totalsum = 0;
    previousRocketPosition = 0;
    rocketCell.innerHTML = ''; // Eliminar el cohete de la celda actual
    rocketCell = null; // Restablecer la referencia de la celda del cohete
    displayDiceResults([0, 0, 0]); // Mostrar resultados iniciales de los dados

    // Recorrer las posiciones pasadas y actualizar las celdas con los números
    passedPositions.forEach(position => {
        const cell = document.querySelector(`.row:nth-child(${Math.ceil(position / 7)}) .celda:nth-child(${position % 7 || 7})`);
        cell.innerHTML = position;
    });
}

// Event Listeners para los botones de lanzar dados y reiniciar juego
document.getElementById('roll-dice-btn').addEventListener('click', rollDice);
document.getElementById('restart').addEventListener('click', restartGame);