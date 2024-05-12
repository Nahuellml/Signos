const btn1 = document.getElementById('btn-twister1');
const btn2 = document.getElementById('btn-twister2');
const btn3 = document.getElementById('btn-twister3');
const btn4 = document.getElementById('btn-twister4');
const displayLevel = document.querySelector('.level');
const message = document.querySelector('.message');
const btnAceptar = document.getElementById('btn-aceptar');

class Twister {
  constructor() {
    this.level = 1;
    this.colors = ['green', 'red', 'blue', 'yellow'];
    this.playingSequence = false;
    this.sequence = [];
    this.playerSequence = [];
    this.waitingForUserInput = false; 
    btn1.addEventListener('click', () => this.handleButtonClick('green'));
    btn2.addEventListener('click', () => this.handleButtonClick('red'));
    btn3.addEventListener('click', () => this.handleButtonClick('blue'));
    btn4.addEventListener('click', () => this.handleButtonClick('yellow'));
    btnAceptar.addEventListener('click', () => this.startGame())
  }

  startGame() {
    this.generateSequence(); // Genera la secuencia al inicio del juego
    this.showSequence();
    displayLevel.textContent = this.level;
    btnAceptar.disabled = true;
    console.log(this.sequence)
  }

  generateSequence() {
    for (let i = 0; i < this.level; i++) {
      const randomColor = this.getRandomColor();
      this.sequence.push(randomColor);
    }
  }

  handleButtonClick(color) {
    this.getPlayerInput(color);
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  async showSequence() {
    // Mostrar la secuencia solo si no se ha mostrado antes en este nivel
    if (!this.playingSequence) {
        this.playingSequence = true; // Establecer el estado playingSequence
        for (let i = 0; i < this.sequence.length; i++) {
            const color = this.sequence[i];
            await this.lightUpButton(color);
            await this.sleep(700);
            this.resetButtons();
            //await this.sleep(500);
        }
        this.playingSequence = false; // Restablecer el estado playingSequence después de mostrar la secuencia
        this.waitingForUserInput = true; // Esperar la entrada del usuario después de mostrar la secuencia
    }
}



async lightUpButton(color) {
  this.resetButtons();

  switch (color) {
    case 'green':
        btn1.style.opacity = 1;
        break;
    case 'red':
        btn2.style.opacity = 1;
        break;
    case 'blue':
        btn3.style.opacity = 1;
        break;
    case 'yellow':
        btn4.style.opacity = 1;
        break;
  }
  
  // Después de un breve período de tiempo, restaurar la opacidad original
  await this.sleep(500); // Puedes ajustar el tiempo según lo desees
  this.resetButtons();
}


  resetButtons() {
    btn1.style.opacity = 0.5;
    btn2.style.opacity = 0.5;
    btn3.style.opacity = 0.5;
    btn4.style.opacity = 0.5;
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getPlayerInput(color) {
    if (!this.playingSequence && this.waitingForUserInput) { // Permitir la entrada del jugador solo si no estamos mostrando la secuencia y estamos esperando su entrada
      this.lightUpButton(color); // Iluminar el botón al hacer clic
      const expectedColor = this.sequence[this.playerSequence.length];
      if (color === expectedColor) {
        this.playerSequence.push(color);
        if (this.playerSequence.length === this.sequence.length) {
          this.waitingForUserInput = false; // Después de completar la secuencia, esperar a mostrar la siguiente secuencia
          this.levelUp();
          displayLevel.textContent = this.level;
        }
      } else {
        message.textContent = '¡Seleccionaste un color incorrecto! El juego se reiniciará.';
        setTimeout(() => {
          message.textContent = '';
           // Mostrar la nueva secuencia después de un breve retraso
      }, 1000);
        this.restartGame();
      }
    } else {
      if (this.playerSequence.length > 0 && !this.playingSequence) {
        message.textContent = 'Espera tu turno. Ahora está jugando el juego.';
        
      }
    }
    console.log(this.playerSequence);
  }


  levelUp() {
    message.textContent = '¡Nivel completado! Subiendo al siguiente nivel.';
    setTimeout(() => {
      message.textContent = '';
       // Mostrar la nueva secuencia después de un breve retraso
  }, 2000);
    this.level++;
    this.playerSequence = [];
    const newColor = this.getRandomColor(); // Generar un nuevo color para agregar a la secuencia
    this.sequence.push(newColor); // Agregar el nuevo color a la secuencia existente
    setTimeout(() => {
        this.showSequence(); // Mostrar la nueva secuencia después de un breve retraso
    }, 1000); // Retraso de 1 segundo antes de mostrar la secuencia
    this.waitingForUserInput = true;
    console.log(this.sequence)
  }


  restartGame() {
    message.textContent ='Fallaste, el juego se reinicia.';
    setTimeout(() => {
      // Mostrar la nueva secuencia después de un breve retraso
      message.textContent = '';
  }, 2700);
    this.level = 1;
    this.sequence = [];
    this.playerSequence = [];
    setTimeout(() => {
        this.startGame(); // Reiniciar el juego después de un breve retraso
    }, 2700); // Retraso de 1 segundo antes de reiniciar el juego
}

}

const twisterMemoGame = new Twister();
console.log(btnAceptar);
