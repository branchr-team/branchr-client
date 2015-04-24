import Vue from 'vue';
import APIService from 'services/api-service';
import template from 'templates/developer-tools.html!';
import CodeMirror from 'lib/CodeMirror/lib/codemirror';
import 'lib/CodeMirror/mode/javascript/javascript';
import 'lib/CodeMirror/keymap/sublime';

import 'lib/CodeMirror/theme/monokai.css!';
import 'lib/CodeMirror/lib/codemirror.css!';

export default Vue.extend({
    template: template,
    data: function() {
        return {
        }
    },
    methods: {
    },
    attached: function() {
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
