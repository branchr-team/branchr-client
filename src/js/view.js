import Vue from 'vue';
import http from 'http';

export default class View {
    constructor(templateURL, vueConfig) {
        this.templateURL = templateURL;
        this.vueConfig = vueConfig;
    }

    load() {
        return http.get(this.templateURL)
            .then(resp => {
                this.vueConfig.template = resp.data;
                return Vue.extend(this.vueConfig);
            });
    }
}
