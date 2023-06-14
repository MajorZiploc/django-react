{% if "useCSS" not in imports %}
{% add_js_import imports "useCSS" %}
{% verbatim %}
/**
 * Inserts a new <style> element into the DOM with the elementId and css if a node with that ID doesn't exist
 * Does not change the CSS once added and does not remove the <style> element when the component unmounts
 * Does not prefix or otherwise scope the CSS added -- the rules will apply globally
 * This is meant to be a way stupid simple way for components to include their own styles for cases when
 * inline styles won't work (eg you need to use pseudo-classes like :hover or other complex selectors)
 * 
 * @param {string} elementId 
 * @param {string} css 
 */
function useCSS(elementId, css) {
  useLayoutEffect(() => {
    if (!document.getElementById(elementId)) {
      const styleElement = document.createElement("style");
      styleElement.id = elementId;
      styleElement.innerText = css;
      document.head.append(styleElement);
    }
  }, []);
}
{% endverbatim %}
{% endif %}