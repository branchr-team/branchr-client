import Vue from 'vue';
import APIService from 'services/api';
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
                    APIService.contrib.listByFeedId(this.feed._id).then(resp => {
                        this.contribs = resp.data.map(c => c._id);
                        this.loadState = true;
                    });
                    return APIService.engine.get(resp.data.engineId);
                })
                .then(resp => {
                    this.engine = resp.data;
                    this.fields = this.engine.fields.map(f => {
                        return {
                            component: PostFields.getComponentFromCode(f.type),
                            default: f.default,
                            key: f.key,
                            name: f.key,
                            model: null
                        };
                    });
                });
		},
		createPost(e) {
			e.preventDefault();
            let params = {};
            this.fields.forEach(f => {
                params[f.key] = f.model;
            });
            let contrib = {
                engineId: this.engine._id,
                feedId: this.feed._id,
                params: params
            };
            APIService.contrib.create(contrib).then(this.updateFeed);
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
