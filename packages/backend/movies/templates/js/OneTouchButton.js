{% if "OneTouchButton" not in imports %}
{% add_js_import imports "OneTouchButton" %}
{% include "js/Button.js" %}
{% verbatim %}
function OneTouchButton({
    children,
    clickedChildren,
    onClick,
    primary,
    small,
    style,
    title,
    additionalClass = "",
}) {
    const [disabled, setDisabled] = useState(false);
    const modifiedOnClick = () => {
      onClick();
      setDisabled(true);
    };
    return html`<button
      onClick=${modifiedOnClick}
      class="btn ${primary ? "btn-primary" : ""} ${small ? "btn-sm" : ""} ${additionalClass}"
      style=${style}
      disabled=${disabled}
      title=${title}
    >
      ${disabled ? clickedChildren || children : children}
    </button>`
}
{% endverbatim %}
{% endif %}
