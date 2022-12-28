"use strict";
const navigateToDetailsPage = (evt, element) => {
    console.log(evt);
    console.log(element);
};
fetch(`${REST_API_URL}all`).then(response => response.json()).then(data => {
    let listString = '';
    data.forEach((element) => {
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
    const list = document.querySelector('section.countries');
    if (list) {
        list.innerHTML = listString;
    }
    const cards = list.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (evt) => {
            evt.stopPropagation();
            const nameElem = card.querySelector('.details h2');
            const name = nameElem.innerText;
            window.location.href = `./country.html?country=${name}`;
        });
    });
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
