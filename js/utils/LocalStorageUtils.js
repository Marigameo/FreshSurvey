import { getMatchedQuestion } from './CommonUtils.js'
// method to initialize default values for questions
export const initLocalStoarge = (payload) => {
    let data = [], answer = ''

    payload.questions.map((question) => {
        if (question.type === 'boolean') {
            answer = question.options[0].value
        } else if (question.type !== 'text') {
            answer = question.options[0].text
        } else {
            answer = ''
        }
        const obj = {
            question: question.question,
            answer: answer,
        }
        data.push(obj)
    })
    localStorage.setItem('questions', JSON.stringify(data))
}

// method to check if some data is already set on local storage
export const isDataAvailable = () => {
    return localStorage.getItem('questions') ? true : false
}

export const getQuestions = () => {
    return JSON.parse(localStorage.getItem('questions'))
}

export const setQuestions = (questions) => {
    localStorage.setItem('questions', JSON.stringify(questions))
}

export const updateQuestions = (questionObj, answer) => {

    const questions = getQuestions()
    const matchedQuestion = getMatchedQuestion(questionObj)

    matchedQuestion[0].answer = answer

    const updatedQuestions = questions.map(p =>
        p.question === matchedQuestion[0].question
            ? { ...p, answer: matchedQuestion[0].answer }
            : p
    );
    setQuestions(updatedQuestions)
}

export const setQuestionsPayload = (payload) => {
    localStorage.setItem('payload', JSON.stringify(payload))
}

export const getQuestionsPayload = () => {
    return JSON.parse(localStorage.getItem('payload'))
}

export const setPrevTab = (tabNumber) => {
    console.log('tabN0', tabNumber)
    localStorage.setItem('prevTab', tabNumber)
}

export const getPrevTab = () => {
    return parseInt(localStorage.getItem('prevTab'))
}