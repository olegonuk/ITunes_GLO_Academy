// Импорт функций с других файлов js
import { videoPlayerInit } from './videoPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';


//Объявление переменных
const playerBtn = document.querySelectorAll('.player-btn'),
   playerBlock = document.querySelectorAll('.player-block'),
   temp = document.querySelector('.temp');

// Функция удаления класса активности у элементов
const deactivationPlayer = () => {
   temp.style.display = 'none';
   playerBtn.forEach(item => item.classList.remove('active'));
   playerBlock.forEach(item => item.classList.remove('active'));
}

//Добавляем класс активности на элементы
playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
   deactivationPlayer();//удаляем классы активности у элементов
   btn.classList.add('active'); //Добавляем класс "эктив" элементу по которому был клик
   playerBlock[i].classList.add('active'); //Добавляем класс "эктив" элементу используя индекс элемента по которому был клик
}));

videoPlayerInit();
radioPlayerInit();
musicPlayerInit();
