import Vue from 'vue';
import APIService from 'services/api-service';
import * as PostFields from 'components/post-fields';
import template from 'templates/feed.html!';

export default Vue.extend({
	template: template,
	data: function() {
		return {
            params: null,
            feedId: null,
			feed: null,
            feedJson: null,
            engine: null,
            engineJson: null,
			fields: null,
            fieldsJson: null,
            contribs: null,
            contribsJson: null
		}
	},
	created: function() {
		this.$watch('fields', function(f) {
			this.fieldsJson = JSON.stringify(f, null, 4);
		}, true);
	},
	methods: {
		updateFeed: function() {
			APIService.feed.get(this.feedId)
                .then(resp => {
                    this.feed = resp.data;
                    this.feedJson = JSON.stringify(this.feed, null, 4);
                    APIService.contrib.getByFeed(this.feed._id).then(resp => {
                        console.log(resp.data);
                        this.contribs = resp.data.map(c => c._id);
                        this.contribsJson = JSON.stringify(this.contribs, null, 4);
                    });
                    return APIService.engine.get(resp.data.engineId);
                })
                .then(resp => {
                    this.engine = resp.data;
                    this.engineJson = JSON.stringify(this.engine, null, 4);
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
            this.feedId = p;
			this.updateFeed();
		}
	}
});
