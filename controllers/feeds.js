import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/pages/feeds.html!';

import 'components/loading-content';

export default Vue.extend({
	template: template,
    data: function() {
        return {
			loadState: false,
            feeds: []
        }
    },
    ready: function() {
		setTimeout(() => {if (this.loading == null) this.loading = true}, 1000);
        this.updateFeeds();
    },
    methods: {
        updateFeeds: function() {
            APIService.feed.list()
                .then(res => {
					this.feeds = res.data.map((o) => {
						o.id = o._id;
						return o;
					});
					this.loadState = true;
                    console.log(this.feeds);
                })
                .catch(err => alert(err));
        }
	}
});
