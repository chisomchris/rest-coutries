"use strict";
const LOCAL_STORAGE_KEY = 'COLOR_MODE';
// filter btn dropdown 
const filter_btn = document.querySelector('.filter button');
if (filter_btn && filter_btn instanceof HTMLButtonElement) {
    if (filter_btn.parentElement instanceof HTMLDivElement) {
        filter_btn.parentElement.addEventListener('click', () => {
            const ul = document.querySelector('.filter ul');
            ul === null || ul === void 0 ? void 0 : ul.classList.toggle('active');
        });
    }
}
// theme switcher
let mode = localStorage.getItem(LOCAL_STORAGE_KEY) || 'light';
function toggleTheme(mode_value) {
    const html = document.querySelector('html');
    if (mode_value === 'light') {
        mode = 'dark';
        html.classList.remove('light');
        html.classList.add(mode);
        localStorage.setItem(LOCAL_STORAGE_KEY, mode);
    }
    else {
        mode = 'light';
        html.classList.remove('dark');
        html.classList.add(mode);
        localStorage.setItem(LOCAL_STORAGE_KEY, mode);
    }
}
const mode_btn = document.querySelector('header button');
mode_btn === null || mode_btn === void 0 ? void 0 : mode_btn.addEventListener('click', () => {
    if (mode === 'light' || mode === 'dark')
        toggleTheme(mode);
});
window.addEventListener('load', () => {
    var _a, _b, _c;
    const mode = localStorage.getItem(LOCAL_STORAGE_KEY) || 'light';
    if (mode === 'dark' || mode === 'light') {
        (_a = document.querySelector('html')) === null || _a === void 0 ? void 0 : _a.classList.remove('light');
        (_b = document.querySelector('html')) === null || _b === void 0 ? void 0 : _b.classList.remove('dark');
        (_c = document.querySelector('html')) === null || _c === void 0 ? void 0 : _c.classList.add(mode);
    }
});
