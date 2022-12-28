type CountryData = {
    name: {common : string} ,flags: { png : string}, population : number, region : string, capital: string
}
const REST_API_URL = `https://restcountries.com/v3.1/`

fetch(`${REST_API_URL}all`).then(response => response.json()).then(data => {
    let listString = ''
    data.forEach((element: CountryData) => {
        listString += countryCard`<a href = "./country.html">
        <div class="card">
        <div class="card_img"><img src="${element.flags.png}" alt="flag of ${element.name.common}"></div>
        <div class="details">
        <h2>${element.name.common}</h2>
        <p>Population: ${element.population}</p>
        <p>Region: ${element.region}</p>
        <p>Capital: ${element.capital}</p>
        </div>
        </div>
        </a>`
    });
    
    const list = document.querySelector('section.countries') as HTMLDivElement
    if(list){
        list.innerHTML = listString
    }
})

const template = countryCard

function countryCard( strings : TemplateStringsArray, ...texts: (string | number)[]){
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
    `
}