import Vue from 'vue';

Vue.component('post-field-string', {
	template: '{{name}}<input type="text" v-model="model"></input>'
});

Vue.component('post-field-number', {
	template: '{{name}}<input type="number" v-model="model" number></input>'
});

Vue.component('post-field-color', {
	template: '{{name}}<input type="color" v-model="model"></input>'
});

export function getComponentFromCode(code) {
	switch (code) {
		case 0: 
			return 'post-field-string';
		case 1: 
			return 'post-field-number';
		case 2: 
			return 'post-field-color';
		default: 
			break;
	}
}
