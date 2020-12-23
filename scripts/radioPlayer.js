export const radioPlayerInit = () => {

   //Объявление переменных
   const radio = document.querySelector('.radio'),
      radioCoverImg = document.querySelector('.radio-cover__img'),
      radioNavigation = document.querySelector('.radio-navigation'),
      radioHeaderBig = document.querySelector('.radio-header__big'),
      radioItem = document.querySelectorAll('.radio-item'),
      radioStop = document.querySelector('.radio-stop');

   //Создание объекта Аудио
   const audio = new Audio();
   audio.type = 'audio/aac'; //Формат аудио

   radioStop.disabled = true; //Отключение кнопки плэй

   //Функция смены иконки плэй/пауза
   const changeIconPlay = () => {
      if (audio.paused) {
         radio.classList.remove('play');
         radioStop.classList.add('fa-play');
         radioStop.classList.remove('fa-pause');
      } else {
         radio.classList.add('play');
         radioStop.classList.add('fa-pause');
         radioStop.classList.remove('fa-play');
      }
   }

   //Функция выбора радиостпнции
   const selectItem = elem => {
      radioItem.forEach(item => item.classList.remove('select'));
      elem.classList.add('select');
   }

   //Обработчик события на переключение между радиостанциями
   radioNavigation.addEventListener('change', event => {
      const target = event.target;
      const parrent = target.closest('.radio-item');
      selectItem(parrent);

      //Заголовок радиостанции
      const title = parrent.querySelector('.radio-name').textContent;
      radioHeaderBig.textContent = title;

      //Смена картинки радиостанции
      const urlImg = parrent.querySelector('.radio-img').src;
      radioCoverImg.src = urlImg;

      radioStop.disabled = false;
      audio.src = target.dataset.radioStantion; //Адресс радиостанции
      audio.play();
      changeIconPlay();
   });

   //Событие по клику остановка/запуск радиосанции
   radioStop.addEventListener('click', () => {
      if (audio.paused) {
         audio.play();
      } else {
         audio.pause();
      }
      changeIconPlay();
   });
}