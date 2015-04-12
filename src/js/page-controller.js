import Vue from 'vue';
import http from 'http';

export default class PageController {

    constructor(config, vueConfig) {
        this.name           = config.name;
        this.templateURL    = config.template;
        this.url            = config.url || '/'+config.name;
        this.vueConfig      = vueConfig;
        this.vueComponent   = null;
    }

    load() {
        if (!this.vueComponent) {
            this.vueComponent = http.get(this.templateURL)
                .then(resp => {
                    this.vueConfig.template = resp.data;
                    let c = Vue.extend(this.vueConfig);
                    Vue.component(this.name, c);
                    return c;
                });
        }
        return this.vueComponent;
    }

    render(vm) {
        this.load().then(() => {
            vm.currentView = this.name;
        });
    }

}
