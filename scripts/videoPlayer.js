import { addZero } from './supScript.js';

export const videoPlayerInit = () => {

   //Объявление переменных
   const videoPlayer = document.querySelector('.video-player'),
      videoButtonPlay = document.querySelector('.video-button__play'),
      videoButtonStop = document.querySelector('.video-button__stop'),
      videoTimePassed = document.querySelector('.video-time__passed'),
      videoProgress = document.querySelector('.video-progress'),
      videoTimeTotal = document.querySelector('.video-time__total'),
      videoVolume = document.querySelector('.video-volume'),
      videoFullscreen = document.querySelector('.video-fullscreen'),
      volumeOff = document.querySelector('.fa-volume-off');

   // Функция смены иконки плэй/пауза
   const toggleIcon = () => {
      if (videoPlayer.paused) {
         videoButtonPlay.classList.remove('fa-pause');
         videoButtonPlay.classList.add('fa-play');
      } else {
         videoButtonPlay.classList.add('fa-pause');
         videoButtonPlay.classList.remove('fa-play');
      }
   }

   // Функция запуска видео
   const togglePlay = event => {
      event.preventDefault();
      if (videoPlayer.paused) {
         videoPlayer.play();
      } else {
         videoPlayer.pause();
      }
   }

   //Функция останвки видео
   const stopPlay = () => {
      videoPlayer.pause();
      videoPlayer.currentTime = 0; // Сброс время видео
   }

   // Функция регулировки громкости 
   let levelVolume = videoVolume.value;//Переменна для сохранения изменения уровня громкости
   const changeVolume = () => {
      const valueVolume = videoVolume.value;
      videoPlayer.volume = valueVolume / 100;
      levelVolume = videoPlayer.volume;// Сохраняем изменения уровня громкости в глобальную переменную
   }

   // Навешиваем обработчик события
   videoPlayer.addEventListener('click', togglePlay);
   videoButtonPlay.addEventListener('click', togglePlay);
   videoButtonStop.addEventListener('click', stopPlay);

   // События плэера
   videoPlayer.addEventListener('play', toggleIcon);
   videoPlayer.addEventListener('pause', toggleIcon);

   // Счетчики времени
   videoPlayer.addEventListener('timeupdate', () => {
      const currentTime = videoPlayer.currentTime; // Текущее время видео
      const durationTime = videoPlayer.duration; // Общее время видео

      videoProgress.value = (currentTime / durationTime) * 100; //Установка прогресса видео

      let minutePassed = Math.floor(currentTime / 60); //Секунды в минуты
      let secondPassed = Math.floor(currentTime % 60); //Остаток от минут - секунды

      let minuteTotal = Math.floor(durationTime / 60); //Секунды в минуты
      let secondTotal = Math.floor(durationTime % 60); //Остаток от минут - секунды

      videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`; //выводим время на странице
      videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`; //выводим время на странице
   });

   // Событие изменения прогресса видео "клик в прогресс ленте"
   videoProgress.addEventListener('input', () => {
      const durationTime = videoPlayer.duration; // Общее время видео
      const value = videoProgress.value; // Значение при изменении прогрес видео - клик на прогресс ленте

      videoPlayer.currentTime = (value * durationTime) / 100; //Устанавливаем время видео на то месо где был клик в прогресс ленте
   });

   // Событие изменения уровня громкости
   videoVolume.addEventListener('input', changeVolume);

   //Открывание видео на весь экран
   videoFullscreen.addEventListener('click', () => {
      videoPlayer.requestFullscreen();
   });

   // Событие добавления панели управления видео в FireFox
   videoPlayer.addEventListener('fullscreenchange', () => {
      if (document.fullscreen) {
         videoPlayer.controls = true;
      } else {
         videoPlayer.controls = false;
      }
   });

   //Регулировка громкости в режиме fullScreen
   videoPlayer.addEventListener('volumechange', () => {
      videoVolume.value = Math.round(videoPlayer.volume * 100);
   });

   //Выключение звука
   volumeOff.addEventListener('click', () => {

      if (videoPlayer.muted) {
         videoPlayer.volume = `${levelVolume}`; //Возвращяем уровень громкости до отключения
         videoPlayer.muted = false;
      } else {
         videoPlayer.muted = true;
         videoPlayer.volume = 0;
      }
   });

   //Вызов функции регулировки громкости
   changeVolume();

   //Остановка видео при переключении табов
   videoPlayerInit.stop = () => {
      videoPlayer.pause();
      toggleIcon();
   }
}