import { getQuestions } from './LocalStorageUtils.js'
const loader = document.getElementById('hidden')
const buttonWrapper = document.getElementsByClassName('button-wrapper')[0]

// method to reset active states of buttongroup
export const removeHighlights = (buttonGroup) => {
    for (let item of buttonGroup) {
        item.className = item.className.replace(" btn-active", "");
    }
}

export const getMatchedQuestion = (questionObj) => {
    const questions = getQuestions()
    return questions.filter((data) => data.question === questionObj.question)
}

export const triggerSnack = (type) => {
    const snack = document.getElementById(type)
    snack.classList.add('show')
    setTimeout(() => {
        snack.classList.remove('show')
    }, 3000)
}

export const showLoader = () => {
    buttonWrapper.style.display = 'none'
    loader.style.display = 'block'
}

export const hideLoader = () => {
    buttonWrapper.style.display = 'block'
    loader.style.display = 'none'
}