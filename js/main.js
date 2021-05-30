// importing common util methods & constants
import { PAYLOAD_URL, BUTTON_TYPE } from './constants.js'
import { initLocalStoarge, isDataAvailable } from './utils/LocalStorageUtils.js';
import { formTabsUI } from './utils/UIUtils.js'

let currentTab = 0;

// fetching dom references for tabs, buttons
const tab = document.getElementsByClassName('tab')
const nextBtn = document.getElementById('nextBtn')
const backBtn = document.getElementById('backBtn')

// method to fetch question data from hosted json 
const fetchData = async () => {
    const payload = await fetch(PAYLOAD_URL)
    const response = await payload.json()
    formTabsUI(response)
    !isDataAvailable() && initLocalStoarge(response)
}

// method to reveal tab UI
const showTab = (tabNumber) => {

    // make the tab matching the tabNumber visible
    tab[tabNumber].style.display = 'block'

    /* if it's first tab - show the proceed button 
       & hide next, back buttons */
    if (tabNumber === 0) {
        nextBtn.innerHTML = BUTTON_TYPE.proceed
        backBtn.style.display = 'none'
    } else if (tabNumber === (tab.length - 2)) { // if last tab - show submit button
        nextBtn.innerHTML = BUTTON_TYPE.submit
    } else if (tabNumber === (tab.length - 1)) { // if last tab - hide all buttons
        nextBtn.style.display = 'none'
        backBtn.style.display = 'none'
    }
    else {
        backBtn.style.display = 'inline'
        nextBtn.innerHTML = BUTTON_TYPE.next
    }
}

// method to switch between tabs
const switchTab = (tabPosition) => {
    // hide the current tab 
    tab[currentTab].style.display = 'none'

    // increment/decrement tab position based on value passed
    currentTab += tabPosition

    // submit state reach - submit form values and take to success screen
    if (currentTab >= tab.length) {
        // submit form values
    }
    showTab(currentTab)
}

// fetch questions payload
fetchData()

// display the current tab 
showTab(currentTab)


backBtn.addEventListener('click', () => switchTab(-1))
nextBtn.addEventListener('click', () => switchTab(1))