import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';


const inputEl = document.querySelector('input');
const listEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
    const input = inputEl.value;
    listEl.innerHTML = '';
    divEl.innerHTML = '';

    if (!input) {
        return
    }
  
    fetchCountries(input)
        .then(data => {
        if (data.length > 10) {
            console.log('lalala')
            Notify.info('Too many matches found. Please enter a more specific name.');
        };
        if (data.length >= 2 && data.length <= 10) {
            createMarkupLi(data)
        };

        if (data.length === 1) {
           createMarkupCard(data)
        }
      })
    .catch(error => {
      console.log(error);
      Notify.failure('Oops, there is no country with that name')
    });
    };

function createMarkupLi(data) {
        const addLi = data.map(item => {
        const svg = item.flags.svg;
        const country = item.name.official;
    return `<li class="item">
        <img class="item-country" src="${svg}" alt="flag"/>
        <p class="name-country">${country}</p>
        </li>`;
  }).join("");
  
  listEl.innerHTML = addLi;
}

function createMarkupCard(data) {
    const element = data[0]
    const svg = element.flags.svg;
    const country = element.name.official;
    const capital = element.capital;
    const population = element.population;
    const languages = Object.values(element.languages).join(", ");
    const addCard = data.map(item =>
    `<ul>
    <img class="item-country" src="${svg}" alt="flag"/>
    <h2>${country}</h2>
    <li class="country-list"><p>Capital: ${capital}</p></li>
    <li class="country-list"><p>Population: ${population}</p></li>
    <li class="country-list"><p>Languages: ${languages}</p></li>
    </ul>`
             ).join("")
            
            divEl.insertAdjacentHTML("afterbegin", addCard);
};





