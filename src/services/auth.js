import APIService from 'services/api';
import {setAuthHeaders} from 'services/api';

var storage = window.localStorage;

export var user;
export var token;

try {
    user = JSON.parse(storage.getItem('user'));
    token = JSON.parse(storage.getItem('token'));
    setAuthHeaders(user.username, token);
} catch (e) {
    console.log("No valid user/token found in sessionStorage.");
}

export function login(username, password) {
    return APIService.login(username, password)
        .then(resp => {
            let user = resp.data.user;
            storage.setItem('user', JSON.stringify(user));
            this.user = user;
            storage.setItem('token', JSON.stringify(resp.data.token));
            this.token = resp.data.token;
            return user;
        });
}

export function register(username, password,fname,lname) {
    return APIService.login(username, password,fname,lname)
        .then(resp => {
            let user = resp.data.user;
            storage.setItem('user', JSON.stringify(user));
            this.user = user;
            storage.setItem('token', JSON.stringify(resp.data.token));
            this.token = resp.data.token;
            return user;
        });
}

export function logout() {
    if (!user) return Promise.resolve();
    let username = user.username;
    storage.removeItem('user');
    this.user = null;
    storage.removeItem('token');
    this.token = null;
    return APIService.logout(username);
}
