import Vue from 'vue';
import * as AuthService from 'services/auth';
import template from 'templates/components/login-dialog.html!';

Vue.component('login-dialog', {
    template: template,
    data() { return {
        show: false,
        message: null,
        username: null,
        password: null,
        formMode: 'login'
    }},
    methods: {
        open(message = null) {
            this.message = message;
            this.show = true;
            this.openPromise = new Promise((resolve) => {
                this.openPromiseResolve = resolve;
            });
            return this.openPromise;
        },
        close(loginStatus) {
            this.show = false;
            this.openPromiseResolve(loginStatus);
            this.username = null;
            this.password = null;
        },
        setFormMode(newFormMode) {
            this.formMode = newFormMode;
        },
        submit(e) {
            e.preventDefault();

            if(this.formMode == 'login') {
                AuthService.login(this.username, this.password)
                  .then(user => this.close(true))
                  .catch(err => {
                      alert('Nope!');
                      console.error(err);
                  });
            } else if (this.formMode == 'register') {
                AuthService.register(this.email, this.username, this.password)
                  .then(user => this.close(true))
                  .catch(err => {
                      alert('Nope!');
                      console.error(err);
                  });
            }
        }
    }
});
