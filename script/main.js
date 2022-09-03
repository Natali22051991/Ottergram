const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = 'hidden-detail';
const ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';
    const detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);// поменяли на увеличенное изображение
    const detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;// поменяли на увеличенное изображение
}

function imageFromThumb(thumbnail) {// принимает 1 аргумент, тк использовали getAttribute, в отличии от setAttribute
    'use strict';
    return thumbnail.getAttribute('data-image-url'); //возвращает значение картинки (строка)
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');//возвращает значение строки (строка)
}

function setDetailsFromThumb(thumbnail) { //чтобы не вызывать предыдущие функции по отдельности,
    'use strict';                        //    создаем функцию, где будет принимать ссылку на элемент миниатюры
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}
// на данном этапе мы создали весь код, для получения картинок и ссылок на них,чтобы переносить это в увеличенное изображение

// прослушиватель событий это паттерн обратного вызова те вызвана обратно

function addThumbClickHandler(thumb) { //анонимная функция, в которой можно получить элемент вне гглобальной области,
    'use strict';                    // такой метод называется замыканием;
    thumb.addEventListener('click', event => { // при клике прерываем функцию,чтобы картинка не переходила на новую страничку
        event.preventDefault();
        setDetailsFromThumb(thumb);//получаем доступ к параметру thumb

    });
}

function getThumbnailsArray() { // получаем все картинки ,преобразуем в массив
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() { // добавляем класс в тег 
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() { //прослушиваем скрытие увеличенного изображения
    'use strict';
    document.body.addEventListener('keyup', event => {
        event.preventDefault();
        console.log(event.code);
        if (event.keyCode === ESC_KEY) { //выполняем скрытие по нажатию на клавишу esc которая равно 27 по ключу
            hideDetails();
            showDetails();
        }
    })
}

function initializeEvents() { // инициализируем массив
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler); //пробегаем по всему массиву
    addKeyPressHandler();
}

initializeEvents();

