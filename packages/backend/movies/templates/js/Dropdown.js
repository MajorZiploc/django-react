{% if "Dropdown" not in imports %}
{% add_js_import imports "Dropdown" %}
{% verbatim %}
function Dropdown({
    children,
    primary,
    small,
    style,
    disabled,
    title,
    additionalClass = "",
    items,
}) {
  return html`<span class="dropdown ${additionalClass}" style=${style}>
    <button
      class="btn ${primary ? "btn-primary" : ""} ${small ? "btn-sm" : ""} dropdown-toggle"
      type="button"
      data-toggle="dropdown"
      disabled=${disabled}
      title=${title}
    >
      ${children}
    </button>
    <ul class="dropdown-menu">
      ${items.map(item => html`<li key=${item.key}>
        <a href="#" onClick=${item.onClick}>${item.label}</a>
      </li>`)}
    </ul>
  </span>`;
}
{% endverbatim %}
{% endif %}
