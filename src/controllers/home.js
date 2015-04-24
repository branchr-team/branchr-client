import Vue from 'vue';
import APIService from 'services/api-service';
import template from 'templates/pages/home.html!';

export default Vue.extend({
    template: template,
    data: function() { return {
        foo: 'bar',
        loading: true
    }},
    created: function() {
        console.log("Home created");
        setTimeout(() => {
            this.loading = false;
        }, 2000);
    },
    destroyed: function() {
        console.log("Home destroyed");
    }
});

