import { createButton, createRadioButton, createTextArea, createQuestionWrapper } from './ComponentUtils.js'
import { QUESTION_TYPES } from '../constants.js'
import { removeHighlights } from './CommonUtils.js'

export const surveyQuestions = document.getElementById('survey-questions')

// swap active/inactive states in button group
export const swapButton = (event) => {
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

    // create button wrapper
    const buttonWrapper = document.createElement('div')
    buttonWrapper.classList.add(`button-group-${index}`)

    //create buttons
    questionObj.options.map((option, index) => {
        let btn = createButton()
        btn.innerHTML = option.text
        if (index === 0) { // making the first option active by default
            btn.className += " btn-active";
        }
        btn.addEventListener('click', (event) => swapButton(event))
        buttonWrapper.appendChild(btn)
    })
    questionWrapper.appendChild(buttonWrapper)
    surveyQuestions.appendChild(questionWrapper)
}


// method to build radiogroup UI
export const radioGroupUI = (index, questionObj) => {
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
        // making the first radio option checked by default
        questionWrapper.getElementsByTagName('input')[0].checked = true
    })

    surveyQuestions.appendChild(questionWrapper)
}


// method to build the textarea UI
export const textAreaUI = (index, questionObj) => {
    // question wrapper
    const questionWrapper = createQuestionWrapper(questionObj)
    const textArea = createTextArea()
    questionWrapper.appendChild(textArea)
    surveyQuestions.appendChild(questionWrapper)
}

// method to build tab UI
export const formTabsUI = (response) => {
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
}
