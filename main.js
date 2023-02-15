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
const modal = document.querySelector('.modal');
const main_container = document.querySelector('.main__container');
const btn_back = document.getElementsByClassName('btn__back')[0];
const searchCountry = document.querySelector("input[type='search']");

let svg = document.querySelector('.ionicon');
let codeArray = []; // an array to hold all countries code
let countryArray = []; //an array to hold the names of the countries
let borderArray = []; // an array to hold countries bordering a country
let country_container, country_title, country_population, country_region, country_capital;

/* toogle theme mode */
toggleMode.addEventListener('click', () => {
    if(mode_label.innerHTML == 'Dark Mode') {
        mode_label.innerHTML = 'Light Mode'
        mode_label.classList.add('darkMode--text');/* */
        moon.classList.add('moon--white');
        nav_title.classList.add('darkMode--text'); /* */
        search_icon.classList.add('darkMode--searchIcon');
    } else {
        mode_label.innerHTML = 'Dark Mode';
        mode_label.classList.remove('darkMode--text'); /** */
        moon.classList.remove('moon--white');
        nav_title.classList.remove('darkMode--text'); /** */
        search_icon.classList.remove('darkMode--searchIcon');
    }

    nav.classList.toggle('darkMode--elements');
    grid_container.classList.toggle('darkMode--background');
    main_container.classList.toggle('darkMode--background');
    search_input.classList.toggle('darkMode--elements');
    /* Change placeholder text color */
    /* https://stackoverflow.com/questions/30117939/how-to-change-the-colour-of-placeholder-using-javascript#30117998 */
    search_input.classList.toggle('darkMode--placeholder');
    /*----------------------------------------------------------*/
    filter_regions.classList.toggle('darkMode--elements');
    /*modal.classList.toggle('darkMode--elements');*/

    for(let i=0; i < country_container.length; i++) {
        country_container[i].classList.toggle('darkMode--elements');
    }
    for(let i=0; i < country_title.length; i++) {
        country_title[i].classList.toggle('darkMode--text');
    }    
    for(let x=0; x < country_population.length; x++) {
        let nodes = country_population[x].childNodes;
        for(let y=0; y < nodes.length; y++) {
            if(nodes[y].nodeName.toLowerCase() == 'span') {
                nodes[y].classList.toggle('darkMode--text');
            }
        }
    }
    for(let x=0; x < country_region.length; x++) {
        let nodes = country_region[x].childNodes;
        for(let y=0; y < nodes.length; y++) {
            if(nodes[y].nodeName.toLowerCase() == 'span') {
                nodes[y].classList.toggle('darkMode--text');
            }
        }
    }
    for(let x=0; x < country_capital.length; x++) {
        let nodes = country_capital[x].childNodes;
        for(let y=0; y < nodes.length; y++) {
            if(nodes[y].nodeName.toLowerCase() == 'span') {
                nodes[y].classList.toggle('darkMode--text');
            }
        }
    }

})


/* hide & show search icon on enter input field */
/*search.addEventListener('input', () => {
    search_icon.style.visibility = 'hidden';
    let search_input = document.getElementsByClassName('search__input')[0].value;
    if(search_input.length == 0) {
        search_icon.style.visibility = 'visible';
    }   
})*/


/* updated code snippet of https://github.com/ChamuMutezva/rest-countries-api-javascript */
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
                //console.log(element);

               
                country.classList.add("allCountries");
				img.classList.add("flags");
				img.alt = `${name.common}'s flag`;
				imageBtn.appendChild(img)
				imageBtn.classList.add("image__btn")

				countries.appendChild(country);
				country.appendChild(imageBtn)
				country.appendChild(countryDetails);
                //console.log(country);

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

                country_container = document.getElementsByClassName('country');
                country_title = document.getElementsByClassName('country__title');
                country_population = document.getElementsByClassName('country__population');
                country_region = document.getElementsByClassName('country__region');
                country_capital = document.getElementsByClassName('country__capital');           

                img.src = `${flags.svg}`;
				imageBtn.addEventListener("click", function () {					
					modal.classList.remove("modal--hide");
					main_container.classList.add("main__container--hide");					
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
					modal.appendChild(modalShow);
					modalTemplate(element)
				})

            });
        })
        .catch(error => console.log("Error :", error));
};

btn_back.addEventListener('click', () => {
    main_container.classList.remove('main__container--hide');
    modal.classList.add('modal--hide');
})

fetchCountry();

searchCountry.addEventListener('input', (e) => {
    const resultCountry = e.target.value; console.log(resultCountry);
    const availableCountries = Array.from(document.querySelectorAll('.country__title'));
    //console.log(availableCountries);
    availableCountries.forEach(country => {
        const myCountry = country.innerHTML.toLowerCase().trim();
        if(myCountry === resultCountry.toLowerCase().trim()) {
            country.closest('.allCountries').classList.remove('hide--card');
        } else if(myCountry.includes(resultCountry.toLowerCase().trim())) {
            country.closest('allCountires').classList.remove('hide--card');
        } else {
            country.closest('.allCountries').classList.add('hide--card');
        }
    })
})

const continentSelect = document.querySelector('select');
console.log(continentSelect);
continentSelect.onchange = (evt) => {
    const availableCountries = Array.from(document.querySelectorAll('.country__region span'));
    availableCountries.forEach(country => {
        const myCountry = country.innerHTML.toLocaleLowerCase().trim();
        if(myCountry == continentSelect.value || continentSelect.value === 'all') {
            country.closest('.allCountries').classList.remove('hide--card');
        } else {
            country.closest('.allCountries').classList.add('hide--card');
        }
    })
}