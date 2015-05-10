import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/components/contrib-summary.html!';

import 'components/contrib';

Vue.component('contrib-summary', {
    template: template,
    paramAttributes: ['contrib-id'],
    data: function() { return {
        loadState: false,
        feed: null,
        engine: null,
        contrib: null
    }},
    methods: {
        init(contrib) {
            this.contrib = contrib;
            this.feed = contrib.feed;
            this.loadState = true;
        }
    },
    //compiled: function() {
    //    if( this.contrib.compiled$el ) {
    //        this.contrib.precompiled = true;
    //        this.$el = this.contrib.compiled$el;
    //    } else {
    //        this.contrib.precompiled = false;
    //        this.contrib.compiled$el = this.$el;
    //    }
    //},
    ready: function() {
        if (this.contrib)
            this.init(this.contrib);
        else if (this.contribId)
            APIService.contrib.get(this.contribId)
                .then(resp => this.init(resp.data));
    }
});
