let currentTab = 0;

// fetching dom references for tabs, buttons
const tab = document.getElementsByClassName('tab')
const nextBtn = document.getElementById('nextBtn')
const backBtn = document.getElementById('backBtn')

// method to reveal tab UI
const showTab = (tabNumber) => {
    // make the tab matching the tabNumber visible
    tab[tabNumber].style.display = 'block'

    /* if it's first tab - show the proceed button 
       & hide next, back buttons */
    if (tabNumber === 0) {
        nextBtn.innerHTML = 'Proceed'
        backBtn.style.display = 'none'
    } else if (tabNumber === (tab.length - 2)) { // if last tab - show submit button
        nextBtn.innerHTML = 'Submit'
    } else if (tabNumber === (tab.length - 1)) { // if last tab - hide all buttons
        nextBtn.style.display = 'none'
        backBtn.style.display = 'none'
    }
    else {
        nextBtn.innerHTML = 'Next'
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

// swap active/inactive states in button group
const swapButton = (event) => {
    const activeButtonGroup = document.getElementsByClassName(event.target.parentNode.className)[0]
    const buttons = activeButtonGroup.getElementsByTagName('button')
    // remove active states from all button
    removeHighlights(buttons)
    // make the current clicked button as active
    event.currentTarget.className += " btn-active";
}

// method to reset active states of buttongroup
const removeHighlights = (buttonGroup) => {
    for (let item of buttonGroup) {
        item.className = item.className.replace(" btn-active", "");
    }
}

// display the current tab 
showTab(currentTab)