/**
 * Created by alex on 4/29/15.
 */
import Vue from 'vue';
import * as AuthService from 'services/auth';
import template from 'templates/components/register-dialog.html!';

Vue.component('register-dialog', {
    template: template,
    data() { return {
        show: false,
        username: null,
        password: null,
        fname: null,
        lname: null
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
            this.openPromiseResolve();
            this.username = null;
            this.password = null;
            this.fname = null;
            this.lname = null;
        },
        submit(e) {
            e.preventDefault();
            AuthService.register(this.username, this.password,this.fname,this.lname)
                .then(user => this.close())
                .catch(err => {
                    alert('Nope!');
                    console.error(err)
                });
        }
    }
});
