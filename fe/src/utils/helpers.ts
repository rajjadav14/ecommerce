import { LOGIN_API, SIGNUP_API } from "./constants";

export const validateEmail = (email: string) => {
    // Simple email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};


export const callSignUp = async (name: string, email: string, password: string) => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
    }
    return await fetch(SIGNUP_API, options).then(res => res.json());
}

export const callLogin = async (email: string, password: string) => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }
    return await fetch(LOGIN_API, options).then(res => res.json());
}