import fetch from 'node-fetch';

export default {
    getAllThings(userId) {
        return fetch('http://127.0.0.1:8080/api/things', { method: 'GET', headers: { 'set-cookie': `userId=${userId}` } }).then(res => res.json());
    },

    deleteProduct(userId, itemId) {
        return fetch(`http://127.0.0.1:8080/api/things/${itemId}`, { method: 'DELETE', headers: { 'set-cookie': `userId=${userId}` } }).then(res => res.json());
    },

    getName(userId) {
        return fetch(`http://127.0.0.1:8080/api/users/${userId}`, { method: 'GET' }).then(res => res.json());
    },

    logIn(login, password) {
        let body = {
            login: login,
            password: password
        };
        return fetch('http://127.0.0.1:8080/api/users/auth', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(body)
        }).then(res => {
            if (res.ok) return res.json();
            throw Error(res.statusText);
        });
    },

    toRegister(login, password) {
        let body = {
            login: login,
            password: password
        };
        return fetch('http://127.0.0.1:8080/api/users/reg', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(body)
        }).then(res => {
            if (res.ok) return res.json();
            throw Error(res.statusText);
        });
    },
}

