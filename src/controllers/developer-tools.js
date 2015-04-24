import Vue from 'vue';
import APIService from 'services/api-service';
import template from 'templates/pages/developer-tools.html!';
import CodeMirror from 'lib/CodeMirror/lib/codemirror';
import 'lib/CodeMirror/mode/javascript/javascript';
import 'lib/CodeMirror/keymap/sublime';

import 'lib/CodeMirror/theme/monokai.css!';
import 'lib/CodeMirror/lib/codemirror.css!';

export default Vue.extend({
    template: template,
    data: function() {
        return {
            loading: true
        }
    },
    methods: {
    },
    created: function() {
        console.log("Develop created");
    },
    attached: function() {
        console.log("Develop attached");
        this.loading = false;
        CodeMirror(document.getElementById("codemirror"),
          {
              value: "function myScript(){\n\treturn 100;\n}",
              lineNumbers: true,
              theme: "monokai",
              mode: "javascript"
          }
        );

    }
});
