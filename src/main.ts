const LOCAL_STORAGE_KEY = 'COLOR_MODE'
const REST_API_URL = `https://restcountries.com/v3.1/`

// filter btn dropdown 
const filter_btn = document.querySelector('.filter button') as HTMLButtonElement
if (filter_btn && filter_btn instanceof HTMLButtonElement) {
    if (filter_btn.parentElement instanceof HTMLDivElement) {
        filter_btn.parentElement.addEventListener('click', () => {
            const ul = document.querySelector('.filter ul') as HTMLUListElement
            ul?.classList.toggle('active')
        })
    }
}

// theme switcher
let mode = localStorage.getItem(LOCAL_STORAGE_KEY) || 'light'

function toggleTheme(mode_value: 'light' | 'dark') {
    const html = document.querySelector('html') as HTMLHtmlElement
    if (mode_value === 'light') {
        mode = 'dark'
        html.classList.remove('light')
        html.classList.add(mode)
        localStorage.setItem(LOCAL_STORAGE_KEY, mode)
    } else {
        mode = 'light'
        html.classList.remove('dark')
        html.classList.add(mode)
        localStorage.setItem(LOCAL_STORAGE_KEY, mode)
    }
}

const mode_btn = document.querySelector('header button') as HTMLButtonElement

mode_btn?.addEventListener('click', () => {
    if (mode === 'light' || mode === 'dark') toggleTheme(mode)
})

window.addEventListener('load', () => {
    const mode = localStorage.getItem(LOCAL_STORAGE_KEY) || 'light'
    if (mode === 'dark' || mode === 'light') {
        document.querySelector('html')?.classList.remove('light')
        document.querySelector('html')?.classList.remove('dark')
        document.querySelector('html')?.classList.add(mode)
    }
})