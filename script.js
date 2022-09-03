class Game {
  constructor() {
    this.secretWord = randomWord();
    this.splited = this.secretWord.split("");
    this.trys = 0;
    this.letters = [];
    this.foundeds = 0;
    this.print();
  }

  attempt(letter) {
    if (this.letters.includes(letter)) {
      return false;
    }
    this.letters.push(letter);
    if (!this.secretWord.includes(letter)) {
      this.trys++;
      hangmanMutate(this.trys);
      const $trieds = document.querySelector(".already-tried");
      $trieds.textContent += letter + " ";
    } else {
      this.founded(letter);
      const $letters = document.querySelectorAll(`#l-${letter}`);
      $letters.forEach((letter) => {
        letter.classList.remove("occult");
      });
    }

    if (this.trys === 10) {
      this.gameOver();
    }
  }

  founded(letter) {
    this.foundeds += howMany(this.secretWord, letter);
    if (this.foundeds === this.secretWord.length) {
      this.congrats();
    }
    const $letters = document.querySelectorAll(`#l-${letter}`);
    $letters.forEach((letter) => {
      letter.classList.remove("occult");
    });
  }

  gameOver() {
    const $panel = document.querySelector(".panel");
    $panel.innerHTML = `
    <div class="menu">
      <span>PERDISTE! 😭</span>
      <br>
      <span class="reveal">La palabra secreta era:</span>
      <button class="panel-button" onclick="resetGame()">Volver a Intentar</button>
    </div>
    `;
    const $reveal = document.querySelector(".reveal");
    $reveal.textContent += " " + this.secretWord.toUpperCase();
    $panel.classList.remove("occult");
  }

  congrats() {
    const $panel = document.querySelector(".panel");
    $panel.innerHTML = `
    <div class="menu">
      <span>Felicidades ganaste! 😎</span>
      <br>
      <button class="panel-button" onclick="resetGame()">Volver a Jugar</button>
    </div>
    `;
    $panel.classList.remove("occult");
  }

  print() {
    const $sc = document.querySelector(".secret-word");
    for (const x of this.splited) {
      $sc.innerHTML += `
        <div class="secret-letter">
            <span id="l-${x}" class="occult">${x}</span>
        </div>
        `;
    }
  }
}

function howMany(str, char) {
  let indices = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i].toLowerCase() === char) indices.push(i);
  }
  return indices.length;
}

function randomWord() {
  return colection[rollDice()];
}

function rollDice() {
  return Math.floor(Math.random() * colection.length);
}

function disableMe(l) {
  const $key_btns = document.querySelectorAll(".keyboard-button");
  $key_btns.forEach((key) => {
    if (key.textContent === l.toUpperCase()) {
      key.classList.add("disabled");
    }
  });
}

function startGame() {
  const $startPanel = document.querySelector(".menu-start");
  $startPanel.classList.add("occult");
  resetKeyboard();
  hangmanMutate(0);
}

function resetGame() {
  const $panels = document.querySelectorAll(".panel");
  if ($panels != null) {
    $panels.forEach((panel) => {
      if (!panel.classList.contains("occult")) {
        panel.classList.add("occult");
      }
    });
  }
  resetKeyboard();
  p = null;
  p = new Game();
  const $sc = document.querySelector(".secret-word");
  $sc.innerHTML = "";
  p.print();
  const $trieds = document.querySelector(".already-tried");
  $trieds.textContent = " ";
  hangmanMutate(0);
}

function newWord() {
  const $startPanel = document.querySelector(".panel-start");
  $startPanel.innerHTML = `
    <span>Nueva palabra:</span><br>    
    <input type="text" class="new-word"><br>
    <span class="alert"><i class="bi bi-exclamation-diamond-fill"></i> Máx. 8 letras y letras de A-Z</span><br>
    <button class="ingame-button filled" onclick="confirm()">
    Guardar y empezar
    </button>
    <button class="ingame-button blank" onclick="cancel()">Cancelar</button>
  `;
}

function cancel() {
  const $startPanel = document.querySelector(".panel-start");
  $startPanel.innerHTML = `
  <div class="panel-start">
    <button class="ingame-button filled" onclick="startGame()">
      Nuevo Juego
    </button>
    <button class="ingame-button blank" onclick="newWord()">Agregar Palabra</button>
  </div>
  `;
}

function confirm() {
  const $newInput = document.querySelector(".new-word");
  if ($newInput.value.length > 8) {
    const $alert = document.querySelector(".alert");
    $alert.classList.add("red");
    setTimeout(resetAlert, 1500);
    return false;
  }
  let regex = /^[a-zA-Z]+$/;
  if (!regex.test($newInput.value)) {
    const $alert = document.querySelector(".alert");
    $alert.classList.add("red");
    setTimeout(resetAlert, 1500);
    return false;
  }
  colection.push($newInput.value.toLowerCase());
  startGame();
}

function resetKeyboard() {
  const $key_btns = document.querySelectorAll(".keyboard-button");
  $key_btns.forEach((key) => {
    key.classList.remove("disabled");
  });
}

function resetAlert() {
  const $alert = document.querySelector(".alert");
  $alert.classList.remove("red");
}

function hangmanMutate(n) {
  $image = document.querySelector(".hangman");
  if (n === 0) {
    $image.src = "./assets/0.png";
  } else {
    $image.src = `./assets/${n}.svg`;
  }
}

let colection = [
  "abeja",
  "araña",
  "burro",
  "cabra",
  "cebra",
  "cerdo",
  "cisne",
  "erizo",
  "gallo",
  "mosca",
  "perro",
  "pulpo",
  "raton",
  "zorro",
  "aguila",
  "avispa",
  "buitre",
  "ciervo",
  "delfin",
  "jabali",
  "buho",
  "foca",
  "lobo",
  "pato",
  "rana",
  "sapo",
  "topo",
  "toro",
  "vaca",
];

let p = new Game();
