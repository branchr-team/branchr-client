import Router from 'director';
import Vue from 'vue';

import 'components/post-fields';
import 'components/contrib';

// @TODO Move code elsewhere
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

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

page('/', 'home', 'controllers/home', true);
page('/users', 'users', 'controllers/users', true);
page('/feeds', 'feeds', 'controllers/feeds', true);
page('/feed/:id', 'feed', 'controllers/feed');

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var vm = new Vue({
    el: '#main',
    data: {
        ctrlName: '',
        nav: navPages
    }
});

// @TODO Move code elsewhere
var routes = {};
pages.forEach((c) => routes[c.url] = function(...params) {
	c.loadComponent().then(comp => {
		Vue.component(c.name, comp.default);
		vm.ctrlName = c.name;
		setTimeout(function() {
			// @TODO Find a better way to do this
			vm.$.ctrl.params = params;
		}, 0);
	});
});
Router(routes).init('/');
