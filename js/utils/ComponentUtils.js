/* this file contains util methods to create components via DOM
    which can be reused */

// button component
export const createButton = () => {
    const btn = document.createElement('button')
    btn.setAttribute('type', 'button')
    return btn
}

// radio button component
export const createRadioButton = () => {
    const radio = document.createElement('input')
    radio.setAttribute('type', 'radio')
    return radio
}

// textarea component
export const createTextArea = () => {
    const textArea = document.createElement('textarea')
    textArea.setAttribute('rows', 6)
    textArea.setAttribute('cols', 50)
    return textArea
}

// question wrapper component
export const createQuestionWrapper = (questionObj) => {
    // question wrapper
    const questionWrapper = document.createElement('div')
    questionWrapper.classList.add('tab')

    // draft question
    const questionText = document.createElement('p')
    questionText.innerHTML = questionObj.question
    questionText.classList.add('questionText')
    questionWrapper.appendChild(questionText)

    return questionWrapper
}

export const createSnack = (message, type) => {
    const snack = document.createElement('div')
    snack.setAttribute('id', type)
    snack.innerHTML = message
    document.body.appendChild(snack)
    return true
}
