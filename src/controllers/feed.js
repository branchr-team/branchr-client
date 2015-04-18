import Vue from 'vue';
import APIService from 'services/api-service';
import * as PostFields from 'components/post-fields';
import template from 'templates/feed.html!';

export default Vue.extend({
	template: template,
	data: function() {
		return {
			loading: true,
            params: null,
            feedId: null,
			feed: null,
            engine: null,
			fields: null,
            contribs: null
		}
	},
	methods: {
		updateFeed: function() {
			APIService.feed.get(this.feedId)
                .then(resp => {
                    this.feed = resp.data;
                    APIService.contrib.getByFeed(this.feed._id).then(resp => {
                        console.log(resp.data);
                        this.contribs = resp.data.map(c => c._id);
						this.loading = false;
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
		createPost: function(e) {
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
		}
	},
	watch: {
		params: function(p) {
            this.feedId = p[0];
			this.updateFeed();
		}
	}
});
