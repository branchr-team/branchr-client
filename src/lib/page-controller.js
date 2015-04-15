import Vue from 'vue';
import http from 'http';

export default class PageController {

    constructor(config, vueConfig) {
        this.name           = config.name;
        this.templateURL    = config.template;
        this.url            = config.url || '/'+config.name;
        this.vueConfig      = vueConfig;

		this.templateCaching = true;

		this.template		= null;
        this.vueComponent   = null;
    }

	loadTemplate() {
        if (!this.template || !this.templateCaching) {
			this.template = http.get(this.templateURL).then(resp => resp.data);
		}
		return this.template;
	}

    load(params) {
		return this.loadTemplate().then((t) => {
			if (!this.vueComponent) {
				this.vueConfig.template = t;
				this.vueComponent = Vue.extend(this.vueConfig);
				console.log(this.vueConfig);
				Vue.component(this.name, this.vueComponent);
			}
			return this.vueComponent;
		});
    }

}
