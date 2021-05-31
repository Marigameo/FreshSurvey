// importing common util methods & constants
import { PAYLOAD_URL, BUTTON_TYPE } from './constants.js'
import { initLocalStoarge, isDataAvailable, setQuestionsPayload, getQuestionsPayload, setPrevTab, getPrevTab } from './utils/LocalStorageUtils.js';
import { formTabsUI } from './utils/UIUtils.js'
import { getCookie, createSession } from './utils/CookieUtils.js'

let currentTab
if (getPrevTab() && getCookie()) {
    currentTab = getPrevTab()
} else {
    currentTab = 0
}

// fetching dom references for tabs, buttons
const tab = document.getElementsByClassName('tab')
const nextBtn = document.getElementById('nextBtn')
const backBtn = document.getElementById('backBtn')

// method to fetch question data from hosted json 
const fetchData = async () => {
    const payload = await fetch(PAYLOAD_URL)
    const response = await payload.json()
    setQuestionsPayload(response)
    formTabsUI(response, showTab, currentTab)
    !isDataAvailable() && initLocalStoarge(response)
}

// method to reveal tab UI
const showTab = (tabNumber) => {
    console.log('entering into', tabNumber)
    // make the tab matching the tabNumber visible
    tab[tabNumber].style.display = 'block'
    console.log(getPrevTab())
    if (getPrevTab() == 4) {
        setPrevTab(0)
    }
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
    if (tabPosition === 1) {
        setPrevTab(currentTab - 1)
    } else if (tabPosition === -1) {
        setPrevTab(currentTab + 1)
    }
    // submit state reach - submit form values and take to success screen
    if (currentTab >= tab.length) {
        // submit form values
    }
    showTab(currentTab)
}

if (!getCookie()) {
    createSession()
    currentTab = 0
    setPrevTab(currentTab)
    // fetch questions payload
    fetchData()
} else {
    console.log('entering into else case', getPrevTab())
    formTabsUI(getQuestionsPayload(), showTab, getPrevTab())
}


backBtn.addEventListener('click', () => switchTab(- 1))
nextBtn.addEventListener('click', () => switchTab(1))

