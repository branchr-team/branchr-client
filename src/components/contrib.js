import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/components/contrib.html!';

Vue.component('b-contrib', {
    template: template,
    paramAttributes: ['contrib-id'],
    data: function() { return {
		loadState: false,
        srcdoc: '',
        contrib: null,
        engine: null
    }},
    attached: function() {
        APIService.contrib.get(this.contribId)
            .then(resp => {
                this.contrib = resp.data;
                return APIService.engine.get(resp.data.engineId)
            })
            .then(resp => {
                this.engine = resp.data;
                this.srcdoc = `
                  <html>
                    <head>
                        <style type="text/css">${this.engine.css}</style>
                    </head>
                    <body>
                        ${this.engine.html}
                        <script type="text/javascript">
                            window.onload = function() {
                                var $params = ${JSON.stringify(this.contrib.params)};
                                ${this.engine.js}
                            };
                        </script>
                    </body>
                  </html>
                  `;
                var iframe = this.$el.getElementsByTagName('iframe')[0];
                setTimeout(() => {
                    iframe.style.height = iframe.contentWindow.document.body.offsetHeight+'px';
					          this.loadState = true;
                }, 1000);
            });
        if (!window.els) window.els = [];
        window.els.push(this.$el);
    }
});
