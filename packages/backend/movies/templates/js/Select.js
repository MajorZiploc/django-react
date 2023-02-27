{% if "Select" not in imports %}
{% add_js_import imports "Select" %}
{% verbatim %}
function Select({
  items,
  value,
  onChange,
  label,
  style,
  id,
}) {
  return html`
    <div class="form-group" style=${style}>
      <label for=${id}>${label}</label>
      <select
        id=${id}
        class="form-control"
        value=${value}
        onChange=${e => onChange(e.target.value)}
      >
        ${items.map(i => html`
          <option value=${i.value}>${i.label}</option>
        `)}
      </select>
    </div>
  `;
}
{% endverbatim %}
{% endif %}
