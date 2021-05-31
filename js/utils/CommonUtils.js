import { getQuestions } from './LocalStorageUtils.js'

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