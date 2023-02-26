
{% if "Button" not in imports %}
{% add_js_import imports "Button" %}
{% verbatim %}
function Button({
    children,
    onClick,
    primary,
    small,
    style,
    disabled,
    title,
    additionalClass = "",
}) {
  return html`<button
    onClick=${onClick}
    class="btn ${primary ? "btn-primary" : ""} ${small ? "btn-sm" : ""} ${additionalClass}"
    style=${style}
    disabled=${disabled}
    title=${title}
  >
    ${children}
  </button>`
}
{% endverbatim %}
{% endif %}
