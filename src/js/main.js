import Router from 'director';
import Vue from 'vue';
import HomeController from 'controllers/home';
import LoginController from 'controllers/login';

var nav = [
    HomeController,
    LoginController
];

var vm = new Vue({
    el: '#main',
    data: {
        currentView: '',
        nav: nav
    }
});

var routes = {};
nav.forEach((c) => routes[c.url] = function() {c.render(vm);});
Router(routes).init(nav[0].url);
