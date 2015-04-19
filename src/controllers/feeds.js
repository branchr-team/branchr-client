import Vue from 'vue';
import APIService from 'services/api-service';
import template from 'templates/pages/feeds.html!';

export default Vue.extend({
	template: template,
    data: function() {
        return {
			loading: true,
            feeds: []
        }
    },
    created: function() {
		setTimeout(() => {if (this.loading == null) this.loading = true}, 1000);
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
					self.loading = false;
                })
                .catch(err => alert(err));
        }
	}
});
