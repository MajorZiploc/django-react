{% if "Checkbox" not in imports %}
{% add_js_import imports "Checkbox" %}
// include dependencies here
{% verbatim %}
function Checkbox({
  id,
  checked = false,
  label,
  style = {},
  onChange,
  useId = false
}) {
  return html`<div className="checkbox" style=${style}>
    <label
      class="form-check-label"
      for=${id}
      style=${{ width: "100%" }}
    >
      <input
        type="checkbox"
        id=${id}
        onInput=${(e) => {
          e.preventDefault();
          onChange(useId ? id : !checked)
        }}
        checked=${checked}
      />
      ${label}
    </label>
  </div>`;
}
{% endverbatim %}
{% endif %}
