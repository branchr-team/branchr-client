import Vue from 'vue';
import APIService from 'services/api-service';
import template from 'templates/feeds.html!';

export default Vue.extend({
	template: template,
    data: function() {
        return {
            feeds: []
        }
    },
    created: function() {
        this.updateFeeds();
    },
    methods: {
        updateFeeds: function() {
            let self = this;
            APIService.feed.list()
                .then(res => {
					self.feeds = res.data.map((o) => {
						o.id = o._id;
						return o;
					});
                })
                .catch(err => alert(err));
        }
	}
});
