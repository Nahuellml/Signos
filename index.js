const btn1 = document.getElementById('btn-twister1');
const btn2 = document.getElementById('btn-twister2');
const btn3 = document.getElementById('btn-twister3');
const btn4 = document.getElementById('btn-twister4');

class Twister {
  constructor() {
    this.level = 1;
    this.sequence = [];
    this.playerSequence = [];
    this.colors = ['green', 'red', 'yellow', 'purple'];
    this.playingSequence = false;
    btn1.addEventListener('click', () => this.handleButtonClick('green'));
    btn2.addEventListener('click', () => this.handleButtonClick('red'));
    btn3.addEventListener('click', () => this.handleButtonClick('yellow'));
    btn4.addEventListener('click', () => this.handleButtonClick('purple'));
  }

  startGame() {
    this.generateSequence();
    this.showSequence();
  }

  generateSequence() {
    const randomColor = this.getRandomColor();
    this.sequence.push(randomColor);
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
      case 'yellow':
        btn3.style.opacity = 1;
        break;
      case 'purple':
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

      // Compara el color clickeado con el próximo color en la secuencia
      const expectedColor = this.sequence[this.playerSequence.length];

      if (color === expectedColor) {
        // El jugador hizo clic en el color correcto
        this.playerSequence.push(color);

        if (this.playerSequence.length === this.sequence.length) {
          // El jugador completó la secuencia actual
          this.levelUp();
        }
      } else {
        // El jugador hizo clic en el color incorrecto
        alert('¡Seleccionaste un color incorrecto! El juego se reiniciará.');
        this.restartGame();
      }
    }
  }

  levelUp() {
    alert('¡Nivel completado! Subiendo al siguiente nivel.');
    this.level++;
    this.playerSequence = [];
    this.generateSequence();
    this.showSequence();
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
twisterMemoGame.startGame();
