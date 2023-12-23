{% if "useOnClickOutside" not in imports %}
{% add_js_import imports "useOnClickOutside" %}
{% verbatim %}
/**
 * Calls the callback when there a click happens outside of the returned ref
 * Does not call the callback if the ref has no current value
 * 
 * @param {function} onClickOutside 
 * @returns {object} ref
 */
function useOnClickOutside(onClickOutside) {
  const ref = useRef()
  useEffect(() => {
    const listener = event => {
      if (!ref.current) {
        return;
      }
      if (ref.current.contains(event.target)) {
        return;
      }
      onClickOutside(event);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  });
  return ref;
}
{% endverbatim %}
{% endif %}
