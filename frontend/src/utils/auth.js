const baseUrl = 'http://localhost:3000';

export const register = ({password,email}) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(`Произошла ошибка: ${res.status}`);
            }
        });
};

export const login = ({password,email}) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(`Произошла ошибка: ${res.status}`);
            }
        })
        .then((data) => {
            localStorage.setItem('token', data.token);
            return data;
        })
        .catch((err) => {
            console.log(err.message);
        })
};

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(`Ошибка: ${err.status}`);
        })
};