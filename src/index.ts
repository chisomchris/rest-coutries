type CountryData = {
    name: { common: string }, flags: { png: string }, population: number, region: string, capital: string
}

type Filter = 'all' | 'africa' | 'americas' | 'asia' | 'europe' | 'oceania'
let search_term: string = ''
let filterTerm: Filter = 'all'
let countryList: any[]
const search_input = document.querySelector('input[type="search"]') as HTMLInputElement

function countryCard(strings: TemplateStringsArray, ...texts: (string | number)[]) {
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

function filter(list: any[], region: string) {
    const regions = ['all', 'africa', 'americas', 'asia', 'europe', 'oceania']
    if (list && Array.isArray(list) && typeof region === 'string') {
        if (!regions.includes(region.toLowerCase())) throw new Error(`Invalid argument: Expects ${regions.join(' or ')} as argument.`)
        return list.filter(country => {
            return country.region.toLowerCase().trim() === region.toLowerCase().trim()
        })
    } else {
        throw new Error('Invalid Input types')
    }
}

function validate(term: string, regions: string[]): term is Filter {
    if (term && regions.includes(term)) return true
    return false
}

const filterBtns = document.querySelectorAll('.filter ul button') as NodeListOf<HTMLButtonElement>

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const region = btn.textContent?.toLowerCase().trim()
        if (region) {
            const listElem: HTMLElement = document.querySelector('section.countries')!
            sessionStorage.setItem('region', region)
            filterTerm = region as Filter
            if (region === 'all') renderList(countryList, listElem)
            else renderList(filter(countryList, region), listElem)
        }
        filterBtns.forEach(btn => btn.classList.remove('active'))
        btn.classList.add('active')
    })
})

function renderList(list: any[], elem: HTMLElement) {
    let listString = ''
    if(list.length === 0){
        console.log('first')
        return elem.innerHTML = '<p>No country match...</p>'
    }

    list.forEach((element: CountryData) => {
        listString += countryCard`
        <div class="card">
        <div class="card_img"><img src="${element.flags.png}" alt="flag of ${element.name.common}"></div>
        <div class="details">
        <h2>${element.name.common}</h2>
        <p>Population: ${element.population}</p>
        <p>Region: ${element.region}</p>
        <p>Capital: ${element.capital}</p>
        </div>
        </div>`
    });

    if (elem && elem instanceof HTMLElement) {
        elem.innerHTML = listString
    }
    const cards: NodeListOf<HTMLDivElement> = elem.querySelectorAll('.card')
    cards.forEach(card => {
        card.addEventListener('click', (evt: Event) => {
            evt.stopPropagation()
            const nameElem = card.querySelector('.details h2') as HTMLHeadingElement
            const name = nameElem.innerText
            window.location.href = `./country.html?country=${name}`
        })
    })
}

function callAPI(elem: HTMLElement, filterFn?: typeof filter) {
    fetch(`${REST_API_URL}all`).then(response => response.json()).then(data => {
        // save data to memory
        countryList = data
        if (elem && elem instanceof HTMLElement) {
            if (filterTerm === 'all') {
                return renderList(countryList, elem)
            }
            if (filterFn && typeof filterFn === 'function') {
                renderList(filterFn(countryList, filterTerm), elem)
                // add active class to active region button 
                filterBtns.forEach(btn => {
                    btn.classList.remove('active')
                })
                const activeBtn = [...filterBtns].find(btn => btn.textContent?.toLowerCase().trim() === filterTerm
                )
                activeBtn?.classList.add('active')
            }
        }
    }).catch(error => {
        throw new Error(error.message)
    })
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const listElem = document.querySelector('section.countries') as HTMLElement
        if (typeof (Storage)) {
            const regions = ['all', 'africa', 'americas', 'asia', 'europe', 'oceania']
            const term = sessionStorage.getItem('region')
            if (term && validate(term, regions)) {
                filterTerm = term
                callAPI(listElem, filter)
            } else {
                callAPI(listElem)
            }
        } else {
            callAPI(listElem)
        }
    } catch (error) {
        console.error(error)
    }
})

search_input.addEventListener('keyup', function () {
    const listElem = document.querySelector('section.countries') as HTMLElement
    if (this.value.toLowerCase().trim() !== search_term) {
        search_term = this.value.toLowerCase().trim()
        if (filterTerm === 'all') return renderList(search(countryList, search_term), listElem)
        renderList(filter(search(countryList, search_term), filterTerm), listElem)
    }
})

function search(list: (CountryData & { cca3: string })[], term: string) {
    return list.filter(item => {
        if (term.toLowerCase().trim().includes('code ') && term.toLowerCase().trim().startsWith('code')) {
            const raw = term.toLowerCase().trim()
            let code = raw.slice(4).trim().toLowerCase()
            return item.cca3.toLowerCase() === code
        }
        return item.name.common.toLowerCase().trim().includes(term)
    })
}