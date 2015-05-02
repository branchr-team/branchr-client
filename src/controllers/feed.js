import Vue from 'vue';
import APIService from 'services/api';
import * as AuthService from 'services/auth';
import * as PostFields from 'components/post-fields';
import template from 'templates/pages/feed.html!';
import {stateParams} from 'lib/router';

import 'components/loading-content';
import 'components/contrib';
import 'components/post-fields';

export default Vue.extend({
	template: template,
	data() {
		return {
            stateParams: null,
            owner: false,
			loadState: false,
            feedId: null,
			feed: null,
            engine: null,
			fields: null,
            contribs: null
		}
	},
	methods: {
		updateFeed() {
			APIService.feed.get(this.feedId)
                .then(resp => {
                    this.feed = resp.data;
                    try {
                        this.owner = resp.data.permissions.owners.indexOf(AuthService.user._id) != -1;
                    } catch (e) {}
                    APIService.contrib.listByFeedId(this.feedId).then(resp => {
                        this.contribs = resp.data.map(c => c._id);
                        this.loadState = true;
                    });
                    return APIService.engine.get(resp.data.engineId);
                })
                .then(resp => {
                    this.engine = resp.data;
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
