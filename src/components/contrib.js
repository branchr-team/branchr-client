import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/components/contrib.html!';

Vue.component('b-contrib', {
    template: template,
    paramAttributes: ['contrib-id'],
    data: function() { return {
		loadState: false,
        engine: null,
        contrib: null,
        srcdoc: ''
    }},
    methods: {
        updateSrcdoc(params) {
            this.loadState = true;
            let hash = ""+Date.now()+""+Math.floor(Math.random()*1000);
            this.srcdoc = `<html>
                    <head>
                        <style type="text/css">${this.engine.css}</style>
                    </head>
                    <body>
                    ${this.engine.html}
                        <script type="text/javascript">
                            window.onload = function() {
                                var $params = ${JSON.stringify(params)};
                                var $done = window.parent._done[${JSON.stringify(hash)}];
                                window.parent = null;
                                parent = null;
                                ${this.engine.js}
                            };
                        </script>
                    </body>
                    </html>`;
            let self = this;
            window._done = window._done || {};
            window._done[hash] = function() {
                self.$$.iframe.style.height = self.$$.iframe.contentWindow.document.body.offsetHeight+'px';
                self.loadState = true;
                delete window._done[hash];
            };
        }
    },
    ready: function() {
        if (this.contribId) APIService.contrib.get(this.contribId)
            .then(resp => {
                this.contrib = resp.data;
                return APIService.engine.get(resp.data.engineId)
            })
            .then(resp => {
                this.engine = resp.data;
                this.updateSrcdoc(this.contrib.params);
            });
    }
});
