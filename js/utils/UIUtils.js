import { createButton, createRadioButton, createTextArea, createQuestionWrapper } from './ComponentUtils.js'
import { QUESTION_TYPES, ADD_COMMENT } from '../constants.js'
import { removeHighlights, getMatchedQuestion } from './CommonUtils.js'
import { isDataAvailable, updateQuestions } from './LocalStorageUtils.js'

export const surveyQuestions = document.getElementById('survey-questions')

// swap active/inactive states in button group
export const swapButton = (event, questionObj) => {

    if (isDataAvailable()) {
        updateQuestions(questionObj, event.currentTarget.innerText)
    }
    const activeButtonGroup = document.getElementsByClassName(event.target.parentNode.className)[0]
    const buttons = activeButtonGroup.getElementsByTagName('button')
    // remove active states from all button
    removeHighlights(buttons)
    // make the current clicked button as active
    event.currentTarget.className += " btn-active";
}

// method to build buttonGroups UI
export const buttonGroupsUI = (index, questionObj) => {

    const questionWrapper = createQuestionWrapper(questionObj)
    let matchedQuestion

    // create button wrapper
    const buttonWrapper = document.createElement('span')
    buttonWrapper.classList.add('group')
    buttonWrapper.classList.add(`button-group-${index}`)

    if (isDataAvailable()) {
        matchedQuestion = getMatchedQuestion(questionObj)
    }
    //create buttons
    questionObj.options.map((option, index) => {
        let btn = createButton()
        btn.innerHTML = option.text
        /* if data is present in localstorage make the matching btn active
            else make the first btn active
        */
        if ((matchedQuestion && (questionObj.question === matchedQuestion[0].question) && (option.text === matchedQuestion[0].answer)) || (index === 0 && !isDataAvailable())) {
            btn.className += " btn-active";
        }
        btn.addEventListener('click', (event) => swapButton(event, questionObj))
        buttonWrapper.appendChild(btn)
    })

    questionWrapper.appendChild(buttonWrapper)
    surveyQuestions.appendChild(questionWrapper)
}


// method to build radiogroup UI
export const radioGroupUI = (groupindex, questionObj) => {
    // question wrapper
    const questionWrapper = createQuestionWrapper(questionObj)
    let matchedQuestion

    if (isDataAvailable()) {
        matchedQuestion = getMatchedQuestion(questionObj)
    }

    questionObj.options.map((option, index) => {
        const radioInputWrapper = document.createElement('div')
        const radio = createRadioButton()
        radio.setAttribute('value', option.value)
        radio.setAttribute('name', `$radio-group${groupindex}`)
        radio.classList.add('radio-btn')
        radio.addEventListener('change', () => updateQuestions(questionObj, option.value))

        const radioText = document.createElement('span')
        radioText.innerHTML = option.text
        radioInputWrapper.appendChild(radio)
        radioInputWrapper.appendChild(radioText)
        questionWrapper.appendChild(radioInputWrapper)

        if ((matchedQuestion && (questionObj.question === matchedQuestion[0].question) && (option.value === matchedQuestion[0].answer))) {
            questionWrapper.getElementsByTagName('input')[index].checked = true
        } else {
            // making the first radio option checked by default
            questionWrapper.getElementsByTagName('input')[0].checked = true
        }
    })

    surveyQuestions.appendChild(questionWrapper)
}


// method to build the textarea UI
export const textAreaUI = (index, questionObj) => {
    let matchedQuestion

    if (isDataAvailable()) {
        matchedQuestion = getMatchedQuestion(questionObj)
    }
    // question wrapper
    const questionWrapper = createQuestionWrapper(questionObj)
    const textArea = createTextArea()
    textArea.setAttribute('placeholder', ADD_COMMENT)
    // updating state in localstorage as user types
    textArea.addEventListener('change', (event) => setTimeout(updateQuestions(questionObj, event.target.value), 3000))

    if (matchedQuestion && (questionObj.question === matchedQuestion[0].question)) {
        textArea.value = matchedQuestion[0].answer
    }
    questionWrapper.appendChild(textArea)
    surveyQuestions.appendChild(questionWrapper)
}

// method to build tab UI
export const formTabsUI = (response, callback, currentTab) => {

    console.log('response', response)

    response.questions.forEach((question, index) => {
        switch (question.type) {
            case QUESTION_TYPES.rating:
                // form ratings button group UI
                buttonGroupsUI(index, question)
                break
            case QUESTION_TYPES.boolean:
                //form radio button UI
                radioGroupUI(index, question)
                break
            case QUESTION_TYPES.text:
                // form textarea UI
                textAreaUI(index, question)
                break
        }
    });
    // display the current tab 
    callback(currentTab)
}
