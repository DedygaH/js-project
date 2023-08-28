const gameContainer = document.getElementById("game-container"); // Получаем элемент контейнера игры из DOM
const difficultySelect = document.getElementById("difficulty"); // Получаем элемент выбора сложности из DOM
const speedSelect = document.getElementById("speed"); // Получаем элемент выбора скорости из DOM
const livesSelect = document.getElementById("lives"); // Получаем элемент выбора количества жизней из DOM
const scoreDisplay = document.getElementById("score");
let score = 0; // Инициализируем переменную для счета очков
let lives = parseInt(livesSelect.value); // Инициализируем переменную для количества жизней, преобразовав строковое значение в число

function createTarget() {   // Функция для создания новой мишени
  const target = document.createElement("div"); // Создаем новый элемент для мишени
  target.classList.add("target"); // Добавляем класс 'target' к элементу мишени
  target.style.top = `${Math.floor(
    Math.random() * (gameContainer.offsetHeight - target.offsetHeight)
  )}px`; // Задаем случайное значение для вертикальной координаты мишени
  target.style.left = `${Math.floor(
    Math.random() * (gameContainer.offsetWidth - target.offsetWidth)
  )}px`; // Задаем случайное значение для горизонтальной координаты мишени
  target.addEventListener("click", hitTarget); // Добавляем обработчик события клика на мишень
  gameContainer.appendChild(target); // Добавляем мишень в контейнер игры

  const speed = getSpeed(); // Получаем скорость создания новой мишени
  setTimeout(() => { // Устанавливаем таймер на удаление мишени через определенное время  

    gameContainer.removeChild(target); // Удаляем мишень из контейнера игры 
    if (lives > 0) { // Если остались жизни, то создаем новую мишень и уменьшаем количество жизней на 1
      createTarget();
      lives--;
      livesSelect.value = lives;
    } else {  // Если жизней не осталось, то выводим сообщение об окончании игры и сбрасываем все настройки игры
      alert(`Game over! Your score is ${score}`);
      resetGame();
      score = 0; // Сбрасываем количество очков
    }
  }, speed);
}
 
function getSpeed() {
  // Функция для получения скорости создания новой мишени в зависимости от выбранной пользователем скорости
  const speed = speedSelect.value; // Получаем значение выбранной скорости из DOM
  switch (
    speed // Определяем скорость в зависимости от значения выбранной скорости
  ) {
    case "slow":
      return 3000;
    case "medium":
      return 2000;
    case "fast":
      return 1000;
  }
}

function hitTarget() {  // Функция для обработки попадания в мишень и проигрывания звука выстрела
  score++; // Увеличиваем количество очков на 1
  scoreDisplay.textContent = `${score}`; // обновления отображения текущего счета !!!!!!
  this.removeEventListener("click", hitTarget); // Удаляем обработчик события клика на мишень
  const target = this;
  target.classList.add("explode");
  const audio = new Audio("gunshot.mp3"); // Создаем новый объект аудио для проигрывания звука выстрела
  audio.play(); // Проигрываем звук выстрела
  setTimeout(() => {
    gameContainer.removeChild(target); // Удаляем мишень из контейнера игры
  }, 200);
}

function resetGame() { // Функция для сброса настроек игры
  lives = parseInt(livesSelect.value); // Сбрасываем количество жизней, преобразовав строковое значение в число
  livesSelect.disabled = false; // Разблокируем выбор количества жизней
}

function startGame() {    // Функция для начала игры
  resetGame(); // Сбрасываем все настройки игры
  livesSelect.disabled = true; // Блокируем выбор количества жизней
  createTarget(); // Создаем первую мишень
}

document.addEventListener("DOMContentLoaded", () => {  // Добавляем обработчик события загрузки страницы
  document.getElementById("startButton")
    .addEventListener("click", startGame); // Добавляем обработчик события клика на кнопку начала игры
});
