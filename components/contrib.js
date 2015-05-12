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
                        <script type="text/javascript">
                            var $params = ${JSON.stringify(params)};
                            var $done = window.parent._done[${JSON.stringify(hash)}];
                            console = {};
                            console.log = window.parent._consoleLog[${JSON.stringify(hash)}]
                            window.parent = parent = null;
                            window.alert = alert = null;
                        </script>
                        <style type="text/css">${this.engine.css}</style>
                        <script type="text/javascript">${this.engine.js}</script>
                    </head>
                    <body style="padding:0;margin:0;position:relative;">
                    ${this.engine.html}
                    </body>
                    </html>`;
            let self = this;
            window._done = window._done || {};
            window._done[hash] = function(requestedHeight) {
                if (requestedHeight) {
                    requestedHeight = Math.min(requestedHeight, 500);
                } else {
                    requestedHeight = self.$$.iframe.contentWindow.document.body.offsetHeight;
                }
                self.$$.iframe.style.height = requestedHeight + 'px';
                self.loadState = true;
            };
            window._consoleLog = window._consoleLog || {};
            window._consoleLog[hash] = function(msg) {
                if( window._contribConsoleEnabled )
                    console.log("contrib log: " + msg);
            };
        }
    },
    ready: function() {
        let p = null;
        if (this.contribId)
            p = APIService.contrib.get(this.contribId)
                .then(resp => {
                    this.contrib = resp.data;
                    return APIService.engine.get(resp.data.engine)
                });
        else if (this.contrib)
            p = APIService.engine.get(this.contrib.engine);
        if (p)
            p.then(resp => {
                this.engine = resp.data;
                this.updateSrcdoc(this.contrib.params);
            });
    }
});
