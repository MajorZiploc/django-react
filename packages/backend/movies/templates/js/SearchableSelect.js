{% if "SearchableSelect" not in imports %}
{% add_js_import imports "SearchableSelect" %}
// include dependencies here
{% include "js/useOnClickOutside.js" %}
{% include "js/useCSS.js" %}
{% include "js/Button.js" %}
{% verbatim %}
function SearchableSelect({
  label,
  items,
  value,
  onChange,
  style = {},
}) {
  useCSS("SearchableSelectCSS", `
    .searchable-select {
      position: relative;
    }
    .searchable-select__toggle {
      text-align: start;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;
    }
    .searchable-select__toggle::after {
      position: absolute;
      content: "▼";
      color: "#333";
      bottom: 0.5rem;
      right: 0.5rem;
    }
    .searchable-select__list {
      margin: 0;
      padding: 1rem;
      background: white;
      border: 1px solid #e7e7e7;
      list-style: none;
      position: absolute;
      top: 100%;
      max-height: 30rem;
      overflow: auto;
      z-index: 10;
      min-width: 100%;
    }
    .searchable-select__list__item {
      width: 100%;
      margin-top: 0.5rem;
      text-align: start;
    }
  `);

  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const searchRef = useRef()
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [isOpen])
  const clickOutsideRef = useOnClickOutside(() => setIsOpen(false));

  const filteredItems = items.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));

  const toggleOpen = () => {
    setSearch("");
    setIsOpen(!isOpen);
  }

  const displayValue = (items.find(i => i.value === value) || { value, label: value }).label;

  return html`<div
    class="form-group searchable-select"
    style=${style}
    ref=${clickOutsideRef}
  >
    <label>${label}</label>
    <button
      class="form-control searchable-select__toggle"
      onClick=${toggleOpen}
      title=${displayValue}
    >
      ${displayValue}
    </button>
    ${isOpen && html`<ul class="searchable-select__list">
      <li>
        <input
          ref=${searchRef}
          class="form-control form-control-sm"
          placeholder="Search"
          type="text"
          onInput=${(e) => setSearch(e.target.value)}
        />
      </li>
      ${filteredItems.map(i => html`<li key=${i.value}>
        <${Button}
          onClick=${() => {
            onChange(i.value);
            setIsOpen(false);
          }}
          primary=${i.value === value}
          additionalClass="searchable-select__list__item"
        >
          ${i.label}
        <//>
      </li>`)}
    </ul>`}
  </div>`;
}
{% endverbatim %}
{% endif %}
