let currentTab = 0;

// fetching dom references for tabs, buttons
const tab = document.getElementsByClassName('tab')
const nextBtn = document.getElementById('nextBtn')
const backBtn = document.getElementById('backBtn')
const surveyQuestions = document.getElementById('survey-questions')

// question wrapper component
const createQuestionWrapper = (questionObj) => {
    // question wrapper
    const questionWrapper = document.createElement('div')
    questionWrapper.classList.add('tab')

    // draft question
    const questionText = document.createElement('p')
    questionText.innerHTML = questionObj.question
    questionWrapper.appendChild(questionText)

    return questionWrapper
}
// method to build buttonGroups UI
const buttonGroupsUI = (index, questionObj) => {

    const questionWrapper = createQuestionWrapper(questionObj)

    // create button wrapper
    const buttonWrapper = document.createElement('div')
    buttonWrapper.classList.add(`button-group-${index}`)

    //create buttons
    questionObj.options.map((option) => {
        let btn = createButton()
        btn.innerHTML = option.text
        btn.addEventListener('click', (event) => swapButton(event))
        buttonWrapper.appendChild(btn)
    })
    questionWrapper.appendChild(buttonWrapper)
    surveyQuestions.appendChild(questionWrapper)
}

// button component
const createButton = () => {
    const btn = document.createElement('button')
    btn.setAttribute('type', 'button')
    return btn
}

// radio button component
const createRadioButton = () => {
    const radio = document.createElement('input')
    radio.setAttribute('type', 'radio')
    return radio
}

// method to build radiogroup UI
const radioGroupUI = (index, questionObj) => {
    // question wrapper
    const questionWrapper = createQuestionWrapper(questionObj)

    questionObj.options.map((option) => {
        const radio = createRadioButton()
        radio.setAttribute('value', option.value)
        radio.setAttribute('name', `$radio-group${index}`)
        const radioText = document.createElement('span')
        radioText.innerHTML = option.text
        questionWrapper.appendChild(radio)
        questionWrapper.appendChild(radioText)
    })

    surveyQuestions.appendChild(questionWrapper)
}

// textarea component
const createTextArea = () => {
    const textArea = document.createElement('textarea')
    textArea.setAttribute('rows', 4)
    textArea.setAttribute('cols', 50)
    return textArea
}

// method to build the textarea UI
const textAreaUI = (index, questionObj) => {
    // question wrapper
    const questionWrapper = createQuestionWrapper(questionObj)
    const textArea = createTextArea()
    questionWrapper.appendChild(textArea)
    surveyQuestions.appendChild(questionWrapper)
}

// method to build tab UI
const formTabsUI = (response) => {
    response.questions.forEach((question, index) => {
        switch (question.type) {
            case 'rating':
                // form ratings button group UI
                buttonGroupsUI(index, question)
                break
            case 'boolean':
                //form radio button UI
                radioGroupUI(index, question)
                break
            case 'text':
                // form textarea UI
                textAreaUI(index, question)
                break
        }
    });
}

// method to fetch question data from hosted json 
const fetchData = async () => {
    const payload = await fetch('https://marigameo.github.io/FreshSurvey/data/payload.json')
    const response = await payload.json()
    formTabsUI(response)
}

fetchData()

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