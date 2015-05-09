import Vue from 'vue';
import APIService from 'services/api';
import * as AuthService from 'services/auth';
import template from 'templates/pages/feed.html!';
import {stateParams} from 'lib/router';

import 'components/loading-content';
import 'components/contrib';
import 'components/contrib-post';

export default Vue.extend({
    template: template,
    data() {
        return {
            stateParams: null,
            owner: false,
            loadState: false,
            feedId: null,
            feed: null,
            contribs: null
        }
    },
    methods: {
        updateFeed() {
            APIService.feed.get(this.feedId)
                .then(resp => {
                    this.feed = resp.data;
                    try {
                        this.owner = resp.data.owners.map(o => o._id).indexOf(AuthService.user._id) != -1;
                    } catch (e) {}
                    return APIService.contrib.listByFeedId(this.feedId);
                }).then(resp => {
                    this.contribs = resp.data.map(c => {
                        try {
                            c.owner = resp.data.owners.map(o => o._id).indexOf(AuthService.user._id) != -1;
                        } catch (e) {}
                        return c;
                    });
                    this.loadState = true;
                });
        },
        deleteContrib: function(contribId) {
            APIService.contrib.delete(contribId).then(this.updateFeed);
        }
    },
    watch: {
        stateParams(stateParams) {
            this.feedId = stateParams[0];
            this.updateFeed();
        }
    }
});