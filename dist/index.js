"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let search_term;
let filterTerm = 'all';
let countryList;
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
function validate(term, regions) {
    if (term && regions.includes(term))
        return true;
    return false;
}
const filterBtns = document.querySelectorAll('.filter ul button');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        var _a, _b;
        const region = (_a = btn.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().trim();
        if (region) {
            const a_card = document.querySelector('.card');
            if (a_card && a_card instanceof HTMLDivElement) {
                const listElem = document.querySelector('section.countries');
                sessionStorage.setItem('key', region);
                if (region === 'all')
                    renderList(countryList, listElem);
                else
                    renderList(filter(countryList, region), listElem);
            }
            const parent = (_b = btn.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
            const btns = parent.querySelectorAll('li button');
            console.log(btns);
            btns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
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
window.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof (Storage)) {
            const regions = ['all', 'africa', 'americas', 'asia', 'europe', 'oceania'];
            const term = sessionStorage.getItem('key');
            if (term && validate(term, regions)) {
                filterTerm = term;
                fetch(`${REST_API_URL}all`).then(response => response.json()).then(data => {
                    countryList = data;
                    const listElem = document.querySelector('section.countries');
                    if (listElem) {
                        if (filterTerm === 'all') {
                            return renderList(countryList, listElem);
                        }
                        renderList(filter(countryList, filterTerm), listElem);
                        filterBtns.forEach(btn => {
                            btn.classList.remove('active');
                        });
                        const activeBtn = [...filterBtns].find(btn => { var _a; return ((_a = btn.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().trim()) === filterTerm; });
                        activeBtn === null || activeBtn === void 0 ? void 0 : activeBtn.classList.add('active');
                    }
                }).catch(error => {
                    throw new Error(error.message);
                });
                // filter list and render it
            }
            else {
                fetch(`${REST_API_URL}all`).then(response => response.json()).then(data => {
                    countryList = data;
                    const listElem = document.querySelector('section.countries');
                    if (listElem) {
                        if (filterTerm === 'all') {
                            renderList(countryList, listElem);
                        }
                    }
                }).catch(error => {
                    throw new Error(error.message);
                });
            }
        }
        else {
            fetch(`${REST_API_URL}all`).then(response => response.json()).then(data => {
                countryList = data;
                const listElem = document.querySelector('section.countries');
                if (listElem) {
                    if (filterTerm === 'all') {
                        renderList(countryList, listElem);
                    }
                }
            }).catch(error => {
                throw new Error(error.message);
            });
        }
    }
    catch (error) {
        console.error(error);
    }
}));
