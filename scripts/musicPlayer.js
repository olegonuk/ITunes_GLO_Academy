import { addZero } from './supScript.js';//Импорт функции с отдельного файла

export const musicPlayerInit = () => {

   //Объявление переменных
   const audio = document.querySelector('.audio'),
      audioImg = document.querySelector('.audio-img'),
      audioHeader = document.querySelector('.audio-header'),
      audioPlayer = document.querySelector('.audio-player'),
      audioNavigation = document.querySelector('.audio-navigation'),
      audioButtonPlay = document.querySelector('.audio-button__play'),
      audioProgress = document.querySelector('.audio-progress'),
      audioProgressTiming = document.querySelector('.audio-progress__timing'),
      audioTimePassed = document.querySelector('.audio-time__passed'),
      audioTimeTotal = document.querySelector('.audio-time__total');

   //Создаем масив с треками
   const playList = ['hello', 'flow', 'speed'];

   //Индекс трэка
   let trackIndex = 0;

   //Функция добавления  трэка/имэдж/тайтл в проигрывание
   const loadTrack = () => {
      const isPlayed = audioPlayer.paused;//Статус паузы
      const track = playList[trackIndex];//Индекс текущего трэка

      audioImg.src = `./audio/${track}.jpg`;//Путь к картинке
      audioHeader.textContent = track.toUpperCase();//Путь к Заголовку
      audioPlayer.src = `./audio/${track}.mp3`;//Путь к трэку

      if (isPlayed) {
         audioPlayer.pause();
      } else {
         audioPlayer.play();
      }
   };

   //Функция переключения трэка назад
   const prevTrack = () => {
      if (trackIndex !== 0) {
         trackIndex--;
      } else {
         trackIndex = playList.length - 1;
      }
      loadTrack();
   };

   //Функция переключения трэка вперед
   const nextTrack = () => {
      if (trackIndex === playList.length - 1) {
         trackIndex = 0;
      } else {
         trackIndex++;
      }
      loadTrack();
   };

   //Событие кнопок плеера
   audioNavigation.addEventListener('click', event => {
      const target = event.target;

      //Клик на кнопку плэй
      if (target.classList.contains('audio-button__play')) {
         audio.classList.toggle('play');//Запуск музыки
         audioButtonPlay.classList.toggle('fa-play');//Смена иконки кнопки
         audioButtonPlay.classList.toggle('fa-pause');//Смена иконки кнопки

         if (audioPlayer.paused) {
            audioPlayer.play();
         } else {
            audioPlayer.pause();
         }

         const track = playList[trackIndex];//Индекс текущего трэка
         audioHeader.textContent = track.toUpperCase();//Путь к Заголовку
      }

      //Клик на кнопку предыдущий трэк
      if (target.classList.contains('audio-button__prev')) {
         prevTrack();
      }

      // Клик на кнопку следующий трэк
      if (target.classList.contains('audio-button__next')) {
         nextTrack();
      }

   });

   //Событие на окончание времени трэка
   audioPlayer.addEventListener('ended', () => {
      nextTrack();//Запуск следующего трэка
      audioPlayer.play();//Запуск проигрывания
   });

   // Счетчики времени
   audioPlayer.addEventListener('timeupdate', () => {
      const currentTime = audioPlayer.currentTime;//Текущее время
      const durationTime = audioPlayer.duration;//Общее время 
      const progress = (currentTime / durationTime) * 100;//Установка прогресса

      audioProgressTiming.style.width = progress + '%';

      const minutesPassed = Math.floor(currentTime / 60) || '0';//Секунды в минуты
      const secondsPassed = Math.floor(currentTime % 60) || '0';//Остаток от минут - секунды

      const minutesTotal = Math.floor(durationTime / 60) || '0';//Секунды в минуты
      const secondsTotal = Math.floor(durationTime % 60) || '0';//Остаток от минут - секунды

      audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;//выводим текущее время на странице
      audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;//выводим общее время на странице
   });

   // Событие изменения прогресса времени трэка "клик в прогресс ленте"
   audioProgress.addEventListener('click', event => {
      const x = event.offsetX;//Значение при изменении прогрес времени трэка - клик на прогресс ленте
      const allWidth = audioProgress.clientWidth;//Ширина прогресс ленты
      const progress = (x / allWidth) * audioPlayer.duration;//Получаем время трэка где был клик в прогресс ленте
      audioPlayer.currentTime = progress;//Устанавливаем время трэка на то месо где был клик в прогресс ленте
   });

}