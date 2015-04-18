import Vue from 'vue';
import 'components/loading-spinner';

const showDelay = 500;

Vue.component('loading-content', {
	template: '<div class="loading-content"><loading-spinner v-show="loadState && !init" v-transition="fade"></loading-spinner><div v-show="!loadState" v-transition="fade"><content></div></div>',
	data: function() { return {
		init: true
	}},
	created: function() {
		let self = this;
		setTimeout(() => {
			if (self.init == true)
				self.init = false;
		}, showDelay);
	}
});
