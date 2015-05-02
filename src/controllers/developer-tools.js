import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/pages/developer-tools.html!';
import {user} from 'services/auth';

import 'components/loading-content';
import 'components/code-editor';
import 'components/engine-form-builder';

export default Vue.extend({
    template: template,
    data() {return {
        stateParams: null,
        loadState: false,
        feed: null,
        fields: null,
        js: '',
        html: '',
        css: ''
    }},
    methods: {
        save() {
            APIService.engine.create({
                js: this.js,
                html: this.html,
                css: this.css,
                fields: this.fields,
                feedId: this.feed._id
            }).then(resp => {
                this.feed.engineId = resp.data._id;
                return APIService.feed.update(this.feed._id, this.feed);
            }).then(resp => {
                alert("Saved!");
            }).catch(resp => {
                alert("Something went wrong!");
                console.error(resp);
            });
        }
    },
    watch: {
        stateParams(stateParams) {
            APIService.feed.get(stateParams[0])
                .then(resp => {
                    this.feed = resp.data;
                    return APIService.engine.get(resp.data.engineId);
                })
                .then(resp => {
                    this.fields = resp.data.fields;
                    this.js = resp.data.js;
                    this.html = resp.data.html;
                    this.css = resp.data.css;
                    this.loadState = true;
                });
        }
    }
});
