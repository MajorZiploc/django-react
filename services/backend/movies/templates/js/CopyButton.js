{% if "CopyButton" not in imports %}
{% add_js_import imports "CopyButton" %}
// include dependencies here
{% verbatim %}
function CopyButton({ text }) {
  const textRef = useRef();
  const buttonRef = useRef();
  return html`<button
    ref=${buttonRef}
    class="btn btn-sm"
    style=${{ margin: '-1rem 0'}}
    title=${text}
    onClick=${(e) => {
      textRef.current.select();
      document.execCommand("copy");
      buttonRef.current.focus();
    }}
  >
    <span style=${{ display: 'inline-block', transform: 'scale(2)', lineHeight: 1 }}>⎘</span>
    <input style=${{ pointerEvents: 'none', position: 'fixed', opacity: 0 }} ref=${textRef} value=${text} tabIndex="-1" />
  <//>`
}
{% endverbatim %}
{% endif %}
