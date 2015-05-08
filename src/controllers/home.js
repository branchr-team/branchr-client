import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/pages/home.html!';

import 'components/loading-content';
import 'components/contrib-summary';

export default Vue.extend({
    template: template,
    data: function() { return {
        loadState: false,
        contribs: null
    }},
    methods: {
        updateFeed() {
            return APIService.contrib.list()
                .then(resp => {
                    this.contribs = resp.data;
                    this.loadState = true;
                });
        }
    },
    attached: function() {
        this.updateFeed();
    }
});

