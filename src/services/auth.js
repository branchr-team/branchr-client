import APIService from 'services/api';

var storage = window.localStorage;

export var user = null;
export var token = null;

try {
    user = JSON.parse(storage.getItem('user'));
} catch (e) {
    console.log("No valid user found in sessionStorage.");
}

try {
    token = JSON.parse(storage.getItem('token'));
} catch (e) {
    console.log("No valid token found in sessionStorage.");
}

export function login(username, password) {
    return new Promise((resolve, reject) => {
        console.log(`AUTH REQUEST HERE FOR ${username}`);
        let u = {username: username};
        storage.setItem('user', JSON.stringify(u));
        storage.setItem('token', 'foo');
        user = u;
        resolve(user);
    })
}

export function logout() {
    return new Promise((resolve, reject) => {
        console.log(`AUTH LOGOUT REQUEST HERE FOR ${user.username}`);
        storage.removeItem('user');
        user = null;
        storage.removeItem('token');
        token = null;
        resolve();
    })
}
