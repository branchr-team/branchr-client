import Router from 'director';
import Vue from 'vue';

import 'components/post-fields';

var pages = [];
var navPages = [];
function page(url, name, componentUrl, nav = false) {
	let o = {
		url: url, 
		name: name, 
		loadComponent: function() {
			return System.import(componentUrl)
		}
	};
	pages.push(o);
	if (nav) navPages.push(o);
}

page('/', 'home', 'controllers/home', true);
page('/login', 'login', 'controllers/login', true);
page('/feeds', 'feeds', 'controllers/feeds', true);
page('/feed/:id', 'feed', 'controllers/feed');

var vm = new Vue({
    el: '#main',
    data: {
        ctrlName: '',
        nav: navPages
    }
});

var routes = {};
pages.forEach((c) => routes[c.url] = function(...params) {
	c.loadComponent().then(comp => {
		Vue.component(c.name, comp.default);
		vm.ctrlName = c.name;
		setTimeout(function() {
			vm.$.ctrl.params = params;
		}, 0);
	});
});
Router(routes).init('/');
