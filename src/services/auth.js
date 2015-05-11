import APIService from 'services/api';
import {setAuthHeaders} from 'services/api';
import * as Main from 'main';

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
    return new Promise((resolve,reject) => {
        APIService.login(username, password)
          .then(
            resp => {
              let user = resp.data.user;
              storage.setItem('user', JSON.stringify(user));
              this.user = Main.vm.user = user;
              storage.setItem('token', JSON.stringify(resp.data.token));
              this.token = resp.data.token;
              resolve(user);
          },
            err => reject(err)
        );
    })
}

export function logout() {
    if (!user) return Promise.resolve();
    let username = user.username;
    storage.removeItem('user');
    this.user = Main.vm.user = null;
    storage.removeItem('token');
    this.token = null;
    return APIService.logout(username);
}
