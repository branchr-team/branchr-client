import Vue from 'vue';
import APIService from 'services/api-service';
import template from 'templates/home.html!';

export default Vue.extend({
	template: template,
    data: function() { return {
        foo: 'bar'
    }},
    created: function() {
        console.log("Home created");
    },
    destroyed: function() {
        console.log("Home destroyed");
    },
    methods: {
    }
});

