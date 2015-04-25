import Vue from 'vue';
import APIService from 'services/api';
import Router from 'director';
import template from 'templates/pages/register.html!';

export default Vue.extend({
    template: template,
    data: function() { return {
        user: {
            username: null,
            password: null,
            fname: null,
            lname: null
        }
    }},
    methods: {
        register: function(e) {
            e.preventDefault();
            alert(this.user.username);
            APIService.user.register(this.user)
                .then(() => {

                });
        }
    }
});
