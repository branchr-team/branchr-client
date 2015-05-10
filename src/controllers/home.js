import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/pages/home.html!';

import 'components/loading-content';
import 'components/contrib-summary';

export default Vue.extend({
    template: template,
    data: function() { return {
        loadState: false,
        contribs: null,
        order: {
            mode: 'recent',
            field: '',
            reverse: -1
        }
    }},
    methods: {
        updateFeed() {
            return APIService.contrib.list()
                .then(resp => {
                    this.contribs = resp.data.map(function(c){
                        c.created_date = new Date(c.created);
                        return c;
                    });
                    this.loadState = true;
                    this.order = {
                        mode: 'recent',
                        field: 'created_date',
                        reverse: -1
                    };
                });
        },
        sortBy(newSortMode) {
            switch(newSortMode) {
                case 'recent':
                    this.order.mode = 'recent';
                    this.order.field = 'created_date';
                    this.order.reverse = -1; // Most recent first
                    break;
                case 'popular':
                    this.order.mode = 'popular';
                    this.order.field = 'score';
                    this.order.reverse = -1; // Largest score first
                    break;
                case 'random':
                    this.contribs.forEach(function(c){
                        c.random_sort = Math.random();
                    });
                    this.order.mode = 'random';
                    this.order.field = 'random_sort';
                    // This forces Vue to refresh the orderBy, otherwise it doesn't re-sort the items
                    this.order.reverse *= -1;
                    break;
                default:
                    console.log("Invalid sort mode: " + newSortMode);
                    break;
            }
        }
    },
    attached: function() {
        this.updateFeed();
    }
});

