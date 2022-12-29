"use strict";
let search_term;
let filterTerm;
let countryList;
fetch(`${REST_API_URL}all`).then(response => response.json()).then(data => {
    countryList = data;
    const listElem = document.querySelector('section.countries');
    if (listElem) {
        renderList(countryList, listElem);
    }
});
function countryCard(strings, ...texts) {
    return `
    ${strings[0]}
    ${texts[0]}
    ${strings[1]}
    ${texts[1]}
    ${strings[2]}
    ${texts[2]}
    ${strings[3]}
    ${texts[3]}
    ${strings[4]}
    ${texts[4]}
    ${strings[5]}
    ${texts[5]}
    ${strings[6]}
    `;
}
function filter(list, region) {
    const regions = ['africa', 'americas', 'asia', 'europe', 'oceania'];
    if (list && Array.isArray(list) && typeof region === 'string') {
        if (!regions.includes(region.toLowerCase()))
            throw new Error(`Invalid argument: Expects ${regions.join(' or ')} as argument.`);
        return list.filter(country => {
            return country.region.toLowerCase().trim() === region.toLowerCase().trim();
        });
    }
    else {
        throw new Error('Invalid Input types');
    }
}
const filterBtns = document.querySelectorAll('.filter ul button');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        var _a;
        let list;
        const region = (_a = btn.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().trim();
        if (region) {
            const listElem = document.querySelector('section.countries');
            if (region === 'all') {
                return renderList(countryList, listElem);
            }
            const filteredList = filter(countryList, region);
            renderList(filteredList, listElem);
        }
    });
});
function renderList(list, elem) {
    let listString = '';
    list.forEach((element) => {
        listString += countryCard `
        <div class="card">
        <div class="card_img"><img src="${element.flags.png}" alt="flag of ${element.name.common}"></div>
        <div class="details">
        <h2>${element.name.common}</h2>
        <p>Population: ${element.population}</p>
        <p>Region: ${element.region}</p>
        <p>Capital: ${element.capital}</p>
        </div>
        </div>`;
    });
    if (elem && elem instanceof HTMLElement) {
        elem.innerHTML = listString;
    }
    const cards = elem.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (evt) => {
            evt.stopPropagation();
            const nameElem = card.querySelector('.details h2');
            const name = nameElem.innerText;
            window.location.href = `./country.html?country=${name}`;
        });
    });
}
