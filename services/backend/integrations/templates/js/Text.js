{% if "Text" not in imports %}
{% add_js_import imports "Text" %}
{% verbatim %}
function Text({
  onChange,
  value,
  label,
  id,
  style = {},
  type = "text",
  inputClass = "",
  prepend = null,
}) {
  return html`
    <div class="form-group" style=${style}>
      <label for=${id}>${label}</label>
      <div class="input-group">
        ${prepend && html`<div class="input-group-addon">${prepend}</div>`}
        <input
          id=${id}
          class="form-control ${inputClass}"
          type=${type}
          value=${value || ""}
          onInput=${e => onChange(e.target.value)}
        />
      </div>
    </div>
  `;
}
{% endverbatim %}
{% endif %}
