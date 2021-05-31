export const createSession = () => {
    document.cookie = "isSessionActive=true"
}

export const getCookie = () => document.cookie