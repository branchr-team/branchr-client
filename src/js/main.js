import Vue from 'vue';
import LoginView from 'branchr/views/pages/login';

var vm = new Vue({
    el: '#main',
    data: {
        currentView: ''
    }
});

LoginView.load().then(l => {
    Vue.component('login', l);
    vm.currentView = 'login';
});
