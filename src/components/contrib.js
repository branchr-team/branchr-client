import Vue from 'vue';
import APIService from 'services/api-service';
import template from 'templates/contrib.html!';

Vue.component('b-contrib', {
    template: template,
    paramAttributes: ['contrib-id'],
    data: function() { return {
        srcdoc: '',
        contrib: null,
        engine: null
    }},
    methods: {
    },
    attached: function() {
        console.log(this.contribId);
        APIService.contrib.get(this.contribId)
            .then(resp => {
                this.contrib = resp.data;
                console.log(resp.data.engine);
                return APIService.engine.get(resp.data.engineId)
            })
            .then(resp => {
                this.engine = resp.data;
                this.srcdoc = `<html>
                    <head>
                        <style type="text/css">${this.engine.css}</style>
                        <script type="text/javascript">
                            var params = ${JSON.stringify(this.contrib.params)};
                            ${this.engine.js}
                        </script>
                    </head>
                    <body>${this.engine.html}</body>
                    </html>`;

                var iframe = this.$el.getElementsByTagName('iframe')[0];
                window.setTimeout(function() {
                    iframe.style.height = iframe.contentWindow.document.body.offsetHeight+'px';
                }, 1000);
            });
        if (!window.els) window.els = [];
        window.els.push(this.$el);
    }
});
