import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/pages/home.html!';

import 'components/loading-content';

export default Vue.extend({
    template: template,
    data: function() { return {
        loadState: false,
        foo: 'bar'
    }},
    created: function() {
        console.log("Home created");
        setTimeout(() => {
          this.loadState = true;
        }, 5000);
    },
    destroyed: function() {
        console.log("Home destroyed");
    }
});

