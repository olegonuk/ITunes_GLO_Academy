export const videoPlayerInit = () => {

   //Объявление переменных
   const videoPlayer = document.querySelector('.video-player'),
      videoButtonPlay = document.querySelector('.video-button__play'),
      videoButtonStop = document.querySelector('.video-button__stop'),
      videoTimePassed = document.querySelector('.video-time__passed'),
      videoProgress = document.querySelector('.video-progress'),
      videoTimeTotal = document.querySelector('.video-time__total');

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

   // Фуекция запуска видео
   const togglePlay = () => {
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

   // Функция прибавление "ноль" к цыфрам меньше "10"
   const addZero = n => n < 10 ? '0' + n : n;

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
   videoProgress.addEventListener('change', () => {
      const durationTime = videoPlayer.duration; // Общее время видео
      const value = videoProgress.value; // Значение при изменении прогрес видео - клик на прогресс ленте

      videoPlayer.currentTime = (value * durationTime) / 100; //Устанавливаем время видео на то месо где был клик в прогресс ленте
   });
}