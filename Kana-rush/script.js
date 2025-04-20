const kanaPairs = [
  // A row
  { kana: "あ", romaji: "a" }, { kana: "ア", romaji: "a" },
  { kana: "い", romaji: "i" }, { kana: "イ", romaji: "i" },
  { kana: "う", romaji: "u" }, { kana: "ウ", romaji: "u" },
  { kana: "え", romaji: "e" }, { kana: "エ", romaji: "e" },
  { kana: "お", romaji: "o" }, { kana: "オ", romaji: "o" },

  // K row
  { kana: "か", romaji: "ka" }, { kana: "カ", romaji: "ka" },
  { kana: "き", romaji: "ki" }, { kana: "キ", romaji: "ki" },
  { kana: "く", romaji: "ku" }, { kana: "ク", romaji: "ku" },
  { kana: "け", romaji: "ke" }, { kana: "ケ", romaji: "ke" },
  { kana: "こ", romaji: "ko" }, { kana: "コ", romaji: "ko" },

  // S row
  { kana: "さ", romaji: "sa" }, { kana: "サ", romaji: "sa" },
  { kana: "し", romaji: "shi" }, { kana: "シ", romaji: "shi" },
  { kana: "す", romaji: "su" }, { kana: "ス", romaji: "su" },
  { kana: "せ", romaji: "se" }, { kana: "セ", romaji: "se" },
  { kana: "そ", romaji: "so" }, { kana: "ソ", romaji: "so" },

  // T row
  { kana: "た", romaji: "ta" }, { kana: "タ", romaji: "ta" },
  { kana: "ち", romaji: "chi" }, { kana: "チ", romaji: "chi" },
  { kana: "つ", romaji: "tsu" }, { kana: "ツ", romaji: "tsu" },
  { kana: "て", romaji: "te" }, { kana: "テ", romaji: "te" },
  { kana: "と", romaji: "to" }, { kana: "ト", romaji: "to" },

  // N row
  { kana: "な", romaji: "na" }, { kana: "ナ", romaji: "na" },
  { kana: "に", romaji: "ni" }, { kana: "ニ", romaji: "ni" },
  { kana: "ぬ", romaji: "nu" }, { kana: "ヌ", romaji: "nu" },
  { kana: "ね", romaji: "ne" }, { kana: "ネ", romaji: "ne" },
  { kana: "の", romaji: "no" }, { kana: "ノ", romaji: "no" },

  // H row
  { kana: "は", romaji: "ha" }, { kana: "ハ", romaji: "ha" },
  { kana: "ひ", romaji: "hi" }, { kana: "ヒ", romaji: "hi" },
  { kana: "ふ", romaji: "fu" }, { kana: "フ", romaji: "fu" },
  { kana: "へ", romaji: "he" }, { kana: "ヘ", romaji: "he" },
  { kana: "ほ", romaji: "ho" }, { kana: "ホ", romaji: "ho" },

  // M row
  { kana: "ま", romaji: "ma" }, { kana: "マ", romaji: "ma" },
  { kana: "み", romaji: "mi" }, { kana: "ミ", romaji: "mi" },
  { kana: "む", romaji: "mu" }, { kana: "ム", romaji: "mu" },
  { kana: "め", romaji: "me" }, { kana: "メ", romaji: "me" },
  { kana: "も", romaji: "mo" }, { kana: "モ", romaji: "mo" },

  // Y row
  { kana: "や", romaji: "ya" }, { kana: "ヤ", romaji: "ya" },
  { kana: "ゆ", romaji: "yu" }, { kana: "ユ", romaji: "yu" },
  { kana: "よ", romaji: "yo" }, { kana: "ヨ", romaji: "yo" },

  // R row
  { kana: "ら", romaji: "ra" }, { kana: "ラ", romaji: "ra" },
  { kana: "り", romaji: "ri" }, { kana: "リ", romaji: "ri" },
  { kana: "る", romaji: "ru" }, { kana: "ル", romaji: "ru" },
  { kana: "れ", romaji: "re" }, { kana: "レ", romaji: "re" },
  { kana: "ろ", romaji: "ro" }, { kana: "ロ", romaji: "ro" },

  // W row + N
  { kana: "わ", romaji: "wa" }, { kana: "ワ", romaji: "wa" },
  { kana: "を", romaji: "wo" }, { kana: "ヲ", romaji: "wo" },
  { kana: "ん", romaji: "n" }, { kana: "ン", romaji: "n" }
];
//import kana pairs above

let score = 0;
let lives = 3;
let highscore = 0;

let selectedKana = null;

function shuffle(array) {
    return [...array].sort(() => Math.random() -0.5);
}

function setupGame() {
    const kanaGrid = document.getElementById("kana-grid");
    const romajiGrid = document.getElementById("romaji-grid");

    kanaGrid.innerHTML = "";
    romajiGrid.innerHTML = "";

    // Get 6 random pairs
    const selectedPairs = shuffle(kanaPairs).slice(0, 6);

    // Make separate arrays for kana and romaji with references
    const kanaButtons = selectedPairs.map(pair => {
        const btn = document.createElement("button");
        btn.textContent = pair.kana;
        btn.onclick = () => handleKanaClick(pair);
        return btn;
    });

    const romajiButtons = selectedPairs.map(pair => {
        const btn = document.createElement("button");
        btn.textContent = pair.romaji;
        btn.onclick = () => handleRomajiClick(pair);
        return btn;
    });

    // Shuffle the buttons independently
    shuffle(kanaButtons).forEach(btn => kanaGrid.appendChild(btn));
    shuffle(romajiButtons).forEach(btn => romajiGrid.appendChild(btn));

    updateUI();
}


function handleKanaClick(pair) {
    selectedKana = pair;
}

function handleRomajiClick(pair) {
    if (!selectedKana) return;

    if (pair.romaji === selectedKana.romaji) {
        score++;
    }
    else {
        lives--;
    }


    selectedKana = null;


    if (lives === 0) {
        if (score > highscore) highscore = score;
        alert("Game Over! Your score: " + score);
        restartGame();
    }
    else {
        setupGame();
    }


    updateUI();
}


function updateUI() {
    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
    document.getElementById("highscore").textContent = highscore;
}


function restartGame() {
    score = 0;
    lives = 3;
    selectedKana = null;
    setupGame();
}


window.onload = setupGame;