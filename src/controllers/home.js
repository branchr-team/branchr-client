import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/pages/home.html!';

export default Vue.extend({
	template: template,
    data: function() { return {
        foo: 'bar',
		loading: true
    }},
    created: function() {
        console.log("Home created");
		let self = this;
		setTimeout(() => {
			self.loading = false;
		}, 5000);
    },
    destroyed: function() {
        console.log("Home destroyed");
    }
});

