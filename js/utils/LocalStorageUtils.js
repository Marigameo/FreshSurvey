// method to initialize default values for questions
export const initLocalStoarge = (payload) => {
    console.log('called')
    let data = [], answer = ''

    payload.questions.map((question) => {
        if (question.type !== 'text') {
            answer = question.options[0].text
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