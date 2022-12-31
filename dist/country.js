"use strict";
const query = decodeURIComponent(window.location.search);
const country = query.slice(query.indexOf('=') + 1);
const encodedCountry = encodeURIComponent(country);
const contents = document.querySelector('section > section');
const back_to_home = document.querySelector('.back_to_home button');
if (back_to_home && back_to_home instanceof HTMLButtonElement) {
    back_to_home.addEventListener('click', () => {
        window.location.assign('./');
    });
}
fetch(`${REST_API_URL}name/${encodedCountry}`).then(response => response.json()).then(([data]) => {
    const languages = [];
    const currencies = [];
    const neighbors = [];
    const native_names = [];
    for (let key in data.languages) {
        if (data.languages[key])
            languages.push(data.languages[key]);
    }
    for (let key in data.currencies) {
        if (data.currencies[key])
            currencies.push(data.currencies[key]);
    }
    for (let key in data.borders) {
        if (data.borders[key])
            neighbors.push(data.borders[key]);
    }
    for (let key in data.name.nativeName) {
        if (data.name.nativeName[key])
            native_names.push(data.name.nativeName[key].official);
    }
    fetch(`${REST_API_URL}all`).then(res => res.json()).then(data1 => {
        const borders = data1.filter((country) => {
            return neighbors.findIndex(item => item.toLowerCase() === country.cca3.toLowerCase()) !== -1;
        }).map((item) => item.name.common);
        const htmlText = Country `
        <div class="country_flag">
            <img src="${data.flags.png}" alt="flag of ${data.name.common}">
        </div>
        <div class="country_details">
            <h1>${data.name.common}</h1>
            <div>
                <div>
                    <p>Native Name${native_names.length > 1 ? 's' : ''}: <span>${native_names.join(',  ')}</span></p>
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
                    ${borders.length ? `<li><button>${borders.join('</button></li><li><button>')}</button></li>` : '<p style="padding-left: .25rem;"> No border countries</p>'} 
                </ul>
            </div>
        </div>
        `;
        if (contents) {
            contents.innerHTML = htmlText;
            document.title = `${country} | Frontend Mentor`;
            const buttons = contents.querySelectorAll('.country_details ul button');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const name = button.innerText.toLowerCase();
                    window.location.assign(`./country.html?country=${name}`);
                });
            });
        }
    });
});
function Country(strings, ...texts) {
    return `
    ${strings[0]}${texts[0]}${strings[1]}${texts[1]}${strings[2]}${texts[2]}${strings[3]}${texts[3]}${strings[4]}${texts[4]}${strings[5]}${texts[5]}${strings[6]}${texts[6]}${strings[7]}${texts[7]}${strings[8]}${texts[8]}${strings[9]}${texts[9]}${strings[10]}${texts[10]}${strings[11]}${texts[11]}${strings[12]}${texts[12]}${strings[13]}
    `;
}
