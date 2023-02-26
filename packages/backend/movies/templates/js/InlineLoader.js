{% if "InlineLoader" not in imports %}
{% add_js_import imports "InlineLoader" %}
// include dependencies here
{% include "js/useCSS.js" %}
{% verbatim %}
function InlineLoader() {
  useCSS("InlineLoaderCSS", `
    .inline-loader {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      margin: -0.25rem 0;
      border: 2px currentColor dotted;
      border-radius: 50%;
      animation-name: inline-loader;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    @keyframes inline-loader {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `);
  return html`<span class="inline-loader" title="Loading" />`;
}
{% endverbatim %}
{% endif %}
