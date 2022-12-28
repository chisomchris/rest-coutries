"use strict";
const query = decodeURIComponent(window.location.search)
const country = query.slice(query.indexOf('=') + 1)
const encodedCountry = encodeURIComponent(country)
const contents = document.querySelector('section > section')

const back_to_home = document.querySelector('.back_to_home button') as HTMLButtonElement
if(back_to_home && back_to_home instanceof HTMLButtonElement){
    back_to_home.addEventListener('click', () => {
        window.location.assign('./')
    })
}

fetch(`${REST_API_URL}name/${encodedCountry}`).then(response => response.json()).then(([data]) => {
    const languages: string[] = []
    const currencies = []

    for (let key in data.languages) {
        if (data.languages[key]) languages.push(data.languages[key])
    }

    for (let key in data.currencies) {
        if (data.currencies[key]) currencies.push(data.currencies[key])
    }

    const htmlText = Country`
    <div class="country_flag">
        <img src="${data.flags.png}" alt="flag of ${data.name.common}">
    </div>
    <div class="country_details">
        <h1>${data.name.common}</h1>
        <div>
            <div>
                <p>Native Name: <span>${data.name.common}</span></p>
                <p>Population: <span>${data.population}</span></p>
                <p>Region: <span>${data.region}</span></p>
                <p>Sub Region: <span>${data.subregion}</span></p>
                <p>Capital: <span>${data.capital}</span></p>
            </div>
            <div>
                <p>Top Level Domain: <span>${data.tld.join(', ')}</span></p>
                <p>Currencies: <span>${currencies.map(currency => currency.name).join(', ')}</span></p>
                <p>Languages: <span>${languages.join(', ')}</span></p>
            </div>
        </div>
        <div>
            <h3>Border Countries:</h3>
            <ul>
                ${'dynamic'}
            </ul>
        </div>
    </div>
    `
    if(contents){
        contents.innerHTML = htmlText
    }
})

function Country(strings: TemplateStringsArray, ...texts: string[]) {
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
    ${texts[6]}
    ${strings[7]}
    ${texts[7]}
    ${strings[8]}
    ${texts[8]}
    ${strings[9]}
    ${texts[9]}
    ${strings[10]}
    ${texts[10]}
    ${strings[11]}
    ${texts[11]}
    ${strings[12]}
    `
}
