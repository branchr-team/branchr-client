import Vue from 'vue';
import LoginComponent from 'branchr/components/pages/login';

Vue.component('login', LoginComponent);

var vm = new Vue({
    el: '#main',
    data: {
        currentView: 'login'
    }
});
