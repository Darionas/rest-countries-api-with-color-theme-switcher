//'Use strict'

const toggleMode = document.querySelector('.nav__container');
const search_icon = document.querySelector('.search__icon');
const search = document.querySelector('.search');
const search_input = document.querySelector('.search__input');
const filter_regions = document.querySelector('.filter__regions');
const nav = document.querySelector('.nav');
const moon = document.querySelector('.moon');
const nav_title = document.querySelector('.nav__title');
const grid_container = document.querySelector('.grid__container');
const main = document.querySelector('.main');
const modal = document.querySelector('.modal');
const main_container = document.querySelector('.main__container');
const btn_back = document.getElementsByClassName('btn__back')[0];
const searchCountry = document.querySelector("input[type='search']");

let mode_label = document.getElementsByClassName('mode__label')[0];
let svg = document.querySelector('.ionicon');
let codeArray = []; // an array to hold all countries code
let countryArray = []; //an array to hold the names of the countries
let borderArray = []; // an array to hold countries bordering a country
let country_container, country_title, country_population, country_region, country_capital,
country_detailsData, highLight, details, imageBtn;
let modalShow = document.createElement('div');
let flag1 = false;
let flag2 = false;
let flag3 = false;


/* toogle dark/light mode */
toggleMode.addEventListener('click', () => {
    if(mode_label.innerHTML == 'Dark Mode') {
        flag2 = true;
        mode_label.innerHTML = 'Light Mode'
        mode_label.classList.add('darkMode--text');/* */
        moon.classList.add('moon--white');
        nav_title.classList.add('darkMode--text'); /* */
        search_icon.classList.add('darkMode--searchIcon');

    } else {
        flag3 = true;
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
    for(let x=0; x < country_detailsData.length; x++) {
        let nodes = country_detailsData[x].childNodes;
        for(let y=0; y < nodes.length; y++) {
            if(nodes[y].nodeName.toLowerCase() == 'span') {
                nodes[y].classList.toggle('darkMode--text');
            }
        }
    }
    
})


/* updated code snippet of https://github.com/ChamuMutezva/rest-countries-api-javascript */
/* fetch data from https://restcountries.com/ */
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
                imageBtn = document.createElement('button');
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
				imageBtn.appendChild(img);
				imageBtn.classList.add("image__btn");
                imageBtn.classList.add('mode__label--change');

				countries.appendChild(country);
				country.appendChild(imageBtn)
				country.appendChild(countryDetails);
                //console.log(country);

                countryDetails.innerHTML =
                `<div class="country">
                    <h2 class="country__title">${name.common}</h2>
                    <div class="country__details">
                        <p class="country__population country__details--data">
                            <span class="country__population-label">Population:</span>
                            <span class="country__population-data">${population}</span>
                        </p>
                        <p class="country__region country__details--data">
							<span class="country__region-label">Region:</span>
							<span class="country__region-data">${region}</span>
						</p>
				        <p class="country__capital country__details--data">
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
                country_detailsData = document.getElementsByClassName('country__details--data');

                /* define flag image as button, on click open modal element */
                img.src = `${flags.svg}`;
				imageBtn.addEventListener("click", function () {
                    flag1 = true;
                    mode_label = document.getElementsByClassName('mode__label')[0];
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
                    /*if(mode_label.innerHTML == 'Dark Mode') {
                       highLight.classList.remove('darkMode--text');
                    } else {
                        highLight.classList.add('darkMode--text');
                    }*/
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


/* search for country */
searchCountry.addEventListener('input', (e) => {
    const resultCountry = e.target.value;
    const availableCountries = Array.from(document.querySelectorAll('.country__title'));
    //console.log(availableCountries);
    availableCountries.forEach(country => {
        const myCountry = country.innerHTML.toLowerCase().trim();
        if(myCountry === resultCountry.toLowerCase().trim()) {
            country.closest('.allCountries').classList.remove('hide--card');
        } else if(myCountry.includes(resultCountry.toLowerCase().trim())) {
            country.closest('.allCountries').classList.remove('hide--card');
        } else {
            country.closest('.allCountries').classList.add('hide--card');
        }
    })
})

/* filter by region */
const continentSelect = document.querySelector('select');
//console.log(continentSelect);
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

const modalTemplate = (element) => {
	const { currencies, tld, languages, borders, flags, name, population, region, capital, subregion} = element;

	const currencyObj = Object.keys(currencies);
	const currenceList = currencyObj.map(cur => currencies[cur].name);
	const langs = Object.values(languages);
	const borderState = typeof borders !== "undefined";
	modalShow.classList.add("modal-container");
	const borderBool = modal.classList.contains("darkMode--text");  //check this code snippet

    modalShow.innerHTML = 					
		`<div class="country-details">		
			<img class="country-details__image" src= ${flags.svg} alt="the flag of ${name.common} " tabindex=0>
			<div class="primary-secondary">
				<div class="primary">           
           			<h3 class="primary__title highLight">${name.common}</h3>
					<div class="primary__divider">
            	 	 	<p class="primary__message">
						    <span class="highLight">Native Name: </span><span class="details">${Object.values(name.nativeName)[0].common}</span>
						</p>
            	 		<p class="primary__message">
						    <span class="highLight">Population: </span><span class="details">${population.toLocaleString()}</span>
						</p>
           				<p class="primary__message">
							<span class="highLight">Region: </span><span class="details">${region}</span>
						</p>
            	 	 	<p class="primary__message">
						    <span class="highLight">Sub Region: </span><span class="details">${subregion}</span>
						</p>
            	 	 	<p class="primary__message">
						    <span class="highLight">Capital: </span><span class="details">${capital}</span>
						</p>
					</div>
			    </div>
          		<div class="secondary">
					<p class="secondary__message">
						<span class="highLight">Top Level Domain: </span><span class="details">${tld[0]}</span>
					</p>
					<div class="secondary__message">
						<span class="highLight">Currencies:</span>
						<span class="currency-list>	
							${currenceList.map(cur => `<span class="currency-list__item">
								<span class="currency__secondary details">${cur}</span>
							</span>`)}
						</span>							
					</div>
					<p class="secondary__message">
					   <span class="highLight">Languages:</span> 
					   <span class="languages">
						    ${langs.map(lang => `<span>
						   	    <span class="language__secondary details">${lang}</span>
						    </span>`).join(" ")}
						</span>
					</p>
		 		</div>
                <div class="bordering-city">
		  			<p class="bordering-content">
					    <span class="highLight">Border Countries:</span>
					</p>
		  			<span class="bordering">					 
					    ${borderState ? borderArray.map(border => `<span>
							<button class="borders btn ${borderBool ? "theme-light" : ""}"> ${border}</button></span>`).join("")
			            : `<span>No bordering countries</span>`} 					
		   			</span>
				</div>		 
			</div> 
	    </div>`
        highLight = document.getElementsByClassName('highLight');
        details = document.getElementsByClassName('details');

        document.querySelectorAll('.mode__label--change').forEach(item => {
            item.addEventListener('click', event => {
                mode_label = document.getElementsByClassName('mode__label')[0];
                if((mode_label.innerHTML == 'Dark Mode') && (flag1 == true || flag2 == true)) {
                   for(let x=0; x < highLight.length; x++) {
                    highLight[x].classList.remove('darkMode--text');
                   }
                }
                if((mode_label.innerHTML == 'Light Mode') && (flag1 == true || flag3 == true)) {
                    for(let x=0; x < highLight.length; x++) {
                     highLight[x].classList.add('darkMode--text');
                    }
                 }
            })
          })
       
        const borderingCountries = document.querySelector(".bordering");
        //add an eventListener to bordering countries
        // when the btn of bordering country is clicked 
        // respective country should be displayed.
        borderingCountries.addEventListener("click", (evt) => {
            const apiEndpoint = `https://restcountries.com/v3.1/name/${evt.target.innerHTML.trim()}`
    
            fetch(apiEndpoint)
                .then(response => response.json())
                .then(data => {
                    //call the modalTemplate and fetched data for a particular
                    //country be applied.
                    borderArray = [];
                    data[0].borders.map(country => {
    
                        codeArray.forEach((elm, index) => {
                            if (country == elm) {
                                borderArray.push(countryArray[index]);
                            }
                        })
                    });
                    modalTemplate(data[0])
                })
        })

}
