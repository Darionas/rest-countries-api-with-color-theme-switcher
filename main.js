//'Use strict'

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
let codeArray = []; // an array to hold all countries code
let countryArray = []; //an array to hold the names of the countries


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


/* code of https://github.com/ChamuMutezva/rest-countries-api-javascript */
const fetchCountry = async(event) => {
    const apiEndpoint = `https://restcountries.com/v3.1/all`;
    const countries = document.querySelector(".countries-container");

    await fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            data.forEach(element => {
                const {cca3, borders, flags, name, population, region, capital} = element;

                let country = document.createElement('div');
                let imageBtn = document.createElement('button');
                let countryDetails = document.createElement('div');
                let img = document.createElement('img');

                //create an array to hold all countries code
                codeArray.push(cca3);
                //console.log(codeArray);
                //create an array to hold all countries name
                countryArray.push(name.common);
                //console.log(countryArray);

                country.classList.add("allCountries");

				img.classList.add("flags");
				img.alt = `${name.common}'s flag`;
				imageBtn.appendChild(img)
				imageBtn.classList.add("image-btn")

				countries.appendChild(country);
				country.appendChild(imageBtn)
				country.appendChild(countryDetails);

                countryDetails.innerHTML = `
                <div class="country">
                    <h2 class="country__title">${name.common}</h2>
                    <div class="country__details">
                        <p class="country__population">
                            <span class="country__population-label">Population:</span>
                            <span class="country__population-data">${population}</span>
                        </p>
                        <p class="country__region">
							<span class="country__region-label">Region:</span>
							<span class="country__region-data">${region}</span>
						</p>
				        <p class="country__capital">
							<span class="country__capital-label">Capital:</span>
							<span class="country__capital-data">${capital}</span>
						</p>
                    </div>
                </div>`

                img.src = `${flags.svg}`;
				imageBtn.addEventListener("click", function () {					
					modal.classList.remove("hide-modal")
					mainWrapper.classList.add("hide-main-wrapper")					
					borderArray = [];
					if (typeof borders != "undefined") {
						borders.map(country => {
							codeArray.forEach((elm, index) => {
								if (country == elm) {
									borderArray.push(countryArray[index]);
								}
							})
						})
					}
					modal.appendChild(modalWrapper);
					modalTemplate(element)
				})

            });
        })
}

fetchCountry();