import Vue from 'vue';
import APIService from 'services/api-service';
import template from 'templates/components/login-dialog.html!';

Vue.component('login-dialog', {
    template: template,
    data() { return {
        show: false,
        username: null,
        password: null
    }},
    methods: {
        open() {
            this.show = true;
            this.openPromise = new Promise((resolve) => {
                this.openPromiseResolve = resolve;
            });
            return this.openPromise;
        },
        close() {
            this.show = false;
            this.openPromiseResolve(this.username);
            this.username = null;
            this.password = null;
        },
        submit(e) {
            e.preventDefault();
            console.log(`AUTH REQUEST HERE FOR ${this.username}`);
        }
    }
});
