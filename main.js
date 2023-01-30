'Use strict'

const toggleMode = document.querySelector('.nav__container');
const search_icon = document.querySelector('.search__icon');
const search = document.querySelector('.search');
const search_input = document.querySelector('.search__input');
const filter_regions = document.querySelector('.filter__regions');
const mode_label = document.getElementsByClassName('mode__label')[0];
const nav = document.querySelector('.nav');
const moon = document.querySelector('.moon');
const nav_title = document.querySelector('.nav__title');
const grid_container = document.querySelector('.grid__container');
const main = document.querySelector('.main');
let svg = document.querySelector('.ionicon');


/* toogle theme mode */
toggleMode.addEventListener('click', () => {
    if(mode_label.innerHTML == 'Dark Mode') {
        mode_label.innerHTML = 'Light Mode'
        mode_label.classList.add('darkMode');
        moon.classList.add('moon--white');
        nav_title.classList.add('darkMode');
        search_icon.classList.add('darkMode__searchIcon');
    } else {
        mode_label.innerHTML = 'Dark Mode';
        mode_label.classList.remove('darkMode');
        moon.classList.remove('moon--white');
        nav_title.classList.remove('darkMode');
        search_icon.classList.remove('darkMode__searchIcon');
    }

    nav.classList.toggle('darkMode__elements');
    grid_container.classList.toggle('darkMode__background');
    main.classList.toggle('darkMode__background');
    search_input.classList.toggle('darkMode__elements');
    /* Change placeholder text color */
    /* https://stackoverflow.com/questions/30117939/how-to-change-the-colour-of-placeholder-using-javascript#30117998 */
    search_input.classList.toggle('darkMode__placeholder');
    /*----------------------------------------------------------*/
    filter_regions.classList.toggle('darkMode__elements');

})


/* hide & show search icon on enter input field */
search.addEventListener('input', () => {
    search_icon.style.visibility = 'hidden';
    let search_input = document.getElementsByClassName('search__input')[0].value;
    if(search_input.length == 0) {
        search_icon.style.visibility = 'visible';
    }   
})
