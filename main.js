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
let modalShow = document.createElement('div');

/* toogle dark/light mode */
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
                
                /* define flag image as button, on click open modal element */
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

/* search for country */
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
	const { currencies, languages, borders, flags, name, population, region, capital, subregion, startOfWeek } = element;

	const currencyObj = Object.keys(currencies);
	const currenceList = currencyObj.map(cur => currencies[cur].name);
	const langs = Object.values(languages);
	const borderState = typeof borders !== "undefined";
	modalShow.classList.add("modal-container");
	const borderBool = modal.classList.contains("darkMode");  //check this code snippet

    modalShow.innerHTML = `					
        
		<div class="country-details">		
			<img class="country-details__image" src= ${flags.svg} alt="the flag of ${name.common} " tabindex=0>
			<div class="primary-secondary">
				<div class="primary">           
           			 <h3 class="primary__title">${name.common}</h3>
					 <div class="primary__divider">
            	 	 	 <p class="primary-message">
						   <span class="highLight">Official name:</span>${name.official}
						</p>
            	 		<p class="primary-message">
						  <span class="highLight">Population:</span> ${population.toLocaleString()}
						</p>
           				 <p class="primary-message">
							<span class="highLight">Region:</span> ${region}
						</p>
            	 	 	 <p class="primary-message">
						   <span class="highLight">Sub region:</span> ${subregion}
						</p>
            	 	 	 <p class="primary-message">
						   <span class="highLight">Capital:</span> ${capital}
						 </p>
					  </div>
			    </div>
			

          		<div class="secondary">
					<p class="secondary-message">
						<span class="highLight">Start of Week:</span> ${startOfWeek}
					</p>

					<div class="secondary-message">
						<span class="highLight">Currencies:</span>
						<ul class="currency-list>	
							${currenceList.map(cur => `<li class="currency-list__item">
								<span class="secondary-currency">${cur}</span>
							</li>`)}
						</ul>							
					</div>

					<p class="secondary-message">
					   <span class="highLight">Languages:</span> 
					   <ul class="languages">
						${langs.map(lang => `<li>
						   		<span class="secondary-language">${lang}</span>
						   </li>
						`).join(" ")}
						</ul>
					</p>
		 		 </div>
  
		 		 <div class="bordering-city">
		  			<p class="bordering-content">
					  <span class="highLight">Border countries:</span>
					</p>
		  			<ul class="bordering">					 
					  ${borderState ?
			borderArray.map(border => `<li>
										<button class="border btn ${borderBool ? "theme-light" : ""}"> ${border}</button></li>`).join("")
			: `<li><span>No bordering countries</span></li>`} 						
		   			</ul>
				 </div>		 
			</div> 
	</div>     
	`

}
