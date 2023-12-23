{% if "PipelineStage" not in imports %}
{% add_js_import imports "PipelineStage" %}
{% include "js/useCSS.js" %}
{% verbatim %}
function PipelineStage({ children }) {
  useCSS("PipelineStageCSS", `
    .pipeline-stage {
      display: flex;
      flex-flow: column nowrap;
    }
    .pipeline-stage > .pipeline-node {
      margin-bottom: 1rem;
    }
  `);
  return html`<div class="pipeline-stage">
    ${children}
  </div>`
}
{% endverbatim %}
{% endif %}
