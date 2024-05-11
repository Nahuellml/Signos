const btn1 = document.getElementById('btn-twister1');
const btn2 = document.getElementById('btn-twister2');
const btn3 = document.getElementById('btn-twister3');
const btn4 = document.getElementById('btn-twister4');

class Twister {
  constructor() {
    this.level = 1;
    this.colors = ['green', 'red', 'blue', 'yellow'];
    this.playingSequence = false;
    this.sequence = [];
    this.playerSequence = [];
    btn1.addEventListener('click', () => this.handleButtonClick('green'));
    btn2.addEventListener('click', () => this.handleButtonClick('red'));
    btn3.addEventListener('click', () => this.handleButtonClick('blue'));
    btn4.addEventListener('click', () => this.handleButtonClick('yellow'));
    this.startGame();
  }

  startGame() {
    this.generateSequence(); // Genera la secuencia al inicio del juego
    this.showSequence();
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
    this.playingSequence = true;
    for (let i = 0; i < this.sequence.length; i++) {
      const color = this.sequence[i];
      await this.lightUpButton(color);
      await this.sleep(1000);
      this.resetButtons();
      await this.sleep(500);
    }
    this.playingSequence = false;
  }

  async lightUpButton(color) {
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
    if (!this.playingSequence) {
      this.lightUpButton(color); // Ilumina el botón al hacer clic
      const expectedColor = this.sequence[this.playerSequence.length];
      if (color === expectedColor) {
        this.playerSequence.push(color);
        if (this.playerSequence.length === this.sequence.length) {
          this.levelUp();
        }
      } else {
        alert('¡Seleccionaste un color incorrecto! El juego se reiniciará.');
        this.restartGame();
      }
    } else {
      if (this.playerSequence.length > 0) {
        alert('Espera tu turno. Ahora está jugando el juego.');
      }
    }
    console.log(this.playerSequence);
  }

  levelUp() {
    alert('¡Nivel completado! Subiendo al siguiente nivel.');
    this.level++;
    this.playerSequence = [];
    const newColor = this.getRandomColor(); // Generar un nuevo color para agregar a la secuencia
    this.sequence.push(newColor); // Agregar el nuevo color a la secuencia existente
    setTimeout(() => {
      this.showSequence(); // Mostrar la nueva secuencia después de un breve retraso
    }, 1000);
    console.log(this.sequence)
}


  restartGame() {
    alert('El juego se reinicia.');
    this.level = 1;
    this.sequence = [];
    this.playerSequence = [];
    this.startGame();
  }
}

const twisterMemoGame = new Twister();
