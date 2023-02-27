{% if "Pipeline" not in imports %}
{% add_js_import imports "Pipeline" %}
// include dependencies here
{% include "js/useCSS.js" %}
{% verbatim %}
function Pipeline({ children }) {
  useCSS("PipelineCSS", `
    .pipeline {
      display: flex;
      flex-flow: row nowrap;
    }
    .pipeline > .pipeline-stage:not(:last-child) {
      margin-right: 4rem;
    }
  `);
  return html`<div class="pipeline">
    ${children}
  </div>`;
}
{% endverbatim %}
{% endif %}
