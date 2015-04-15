import Vue from 'vue';
import APIService from 'services/api-service';
import * as PostFields from 'components/post-fields';
import template from 'templates/feed.html!';

export default Vue.extend({
	template: template,
	data: function() {
		return {
			params: null,
			feed: null,
			feedJson: null,
			postFieldJson: null,
			postFields: null,
		}
	},
	created: function() {
		this.$watch('postFields', function(f) {
			this.postFieldJson = JSON.stringify(f, null, 4);
		}, true);
	},
	methods: {
		updateFeed: function() {
			APIService.feed.get(this.id).then(resp => {
				this.feed = resp.data;
				this.postFields = [];
				for (var p in this.feed.postParams) {
					this.postFields.push({
						component: PostFields.getComponentFromCode(this.feed.postParams[p]),
						name: p,
						model: null
					});
				}
				this.feedJson = JSON.stringify(this.feed, null, 4);
			});
		},
		createPost: function(e) {
			e.preventDefault()
			console.log("Creating post from fields: ", this.postFields.map(f => f.model));
		}
	},
	watch: {
		params: function(p) {
			this.id = p[0];
			this.updateFeed();
		}
	}
});
