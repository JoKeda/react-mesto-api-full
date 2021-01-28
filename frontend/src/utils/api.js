const baseUrl = 'http://localhost:3000';

export class Api {
    constructor(options) {
        this.baseURL = options.baseUrl;
        this.headers = options.headers;
    }

    getInitialCards() {
        const token = localStorage.getItem('token');
        return this.getAnswer(fetch(`${this.baseURL}/cards`, {headers: {
            ...this.headers,
                authorization:`Bearer ${token}`
            }}));
    }

    getUserInfo() {
        const token = localStorage.getItem('token');
        return this.getAnswer(fetch(`${this.baseURL}/users/me`, {headers: {
                ...this.headers,
                authorization:`Bearer ${token}`
            }}));
    }

    setUserInfo(name, info) {
        const token = localStorage.getItem('token');
        return this.getAnswer(fetch(`${this.baseURL}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this.headers,
                authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                about: info
            })
        }));
    }


    setCard(name, link) {
        const token = localStorage.getItem('token');
        return this.getAnswer(fetch(`${this.baseURL}/cards`, {
            method: 'POST',
            headers: {
                ...this.headers,
                authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        }));
    }

    deleteCard(cardId) {
        const token = localStorage.getItem('token');
        return this.getAnswer(fetch(`${this.baseURL}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                ...this.headers,
                authorization:`Bearer ${token}`
            }
        }));
    }

    putLikeCard(cardId) {
        const token = localStorage.getItem('token');
        return this.getAnswer(fetch(`${this.baseURL}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                ...this.headers,
                authorization:`Bearer ${token}`
            }
        }));
    }

    deleteLikeCard(cardId) {
        const token = localStorage.getItem('token');
        return this.getAnswer(fetch(`${this.baseURL}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                ...this.headers,
                authorization:`Bearer ${token}`
            }
        }));
    }

    updateUserPicture(userPictureUrl) {
        const token = localStorage.getItem('token');
        return this.getAnswer(fetch(`${this.baseURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                ...this.headers,
                authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: userPictureUrl
            })
        }));
    }

    getAnswer(promise) {
        return promise
            .then(res => {
                if (res.ok) return res.json();

                return Promise.reject(`Запрос прошел неудачно: ошибка ${res.status}`);
            });
    }
}

const api = new Api({
    baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});
export default api;