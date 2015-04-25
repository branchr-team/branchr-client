import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/components/contrib.html!';

Vue.component('b-contrib', {
    template: template,
    paramAttributes: ['contrib-id'],
    data: function() { return {
		loading: true,
        srcdoc: '',
        contrib: null,
        engine: null
    }},
    attached: function() {
		let self = this;
        APIService.contrib.get(this.contribId)
            .then(resp => {
                this.contrib = resp.data;
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
                setTimeout(function() {
                    iframe.style.height = iframe.contentWindow.document.body.offsetHeight+'px';
					self.loading = false;
                }, 1000);
            });
        if (!window.els) window.els = [];
        window.els.push(this.$el);
    }
});
