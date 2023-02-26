{% if "PipelineNode" not in imports %}
{% add_js_import imports "PipelineNode" %}
{% include "js/useCSS.js" %}
{% include "js/PipelineArrow.js" %}
{% verbatim %}
function PipelineNode({
  selected,
  onClick,
  children,
  color="primary",
  id,
  connectsTo=[],
  tooltip,
}) {
  useCSS("PipelineNodeCSS", `
    .pipeline-node {
      border: 1px solid currentColor;
      border-radius: 2rem;
      padding: 1rem;
      line-height: 1;
      background: white;
      position: relative;
      text-align: start;
    }
    .pipeline-node:focus {
      outline: none;
      box-shadow: 0 0 2px 3px rgba(102, 175, 233, .6);
    }
    .pipeline-node--selected {
      background: currentColor;
    }
    .pipeline-node--selected > span {
      color: white;
    }
    .pipeline-node[data-tooltip]:hover:before {
      position: absolute;
      content: attr(data-tooltip);
      display: block;
      background: #333;
      color: white;
      top: 0;
      left: 50%;
      width: 20rem;
      transform: translate(-50%, -100%) translateY(-0.75rem);
      padding: 0.75rem;
      border-radius: 0.5rem;
      pointer-events: none;
      white-space: pre-line;
      line-height: 1.25;
      z-index: 10;
    }
    .pipeline-node[data-tooltip]:hover:after {
      position: absolute;
      content: "";
      display: block;
      border-top: 0.8rem solid #333;
      border-left: 0.5rem solid transparent;
      border-right: 0.5rem solid transparent;
      top: 0;
      left: 50%;
      transform: translate(-50%, -100%);
      pointer-events: none;
    }
  `)
  return html`<button
    id=${id}
    class="text-${color} pipeline-node ${selected ? 'pipeline-node--selected' : ''}"
    onClick=${onClick}
    data-tooltip=${tooltip || false}
  >
    <span>${children}</span>
    ${connectsTo.map(to => html`<${PipelineArrow} from=${id} to=${to} />`)}
  </button>`;
}
{% endverbatim %}
{% endif %}