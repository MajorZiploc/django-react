{% if "MultiSelect" not in imports %}
{% add_js_import imports "MultiSelect" %}
{% include "js/useOnClickOutside.js" %}
{% include "js/Button.js" %}
{% verbatim %}
function MultiSelect({
  label,
  items,
  values,
  onChange,
  style = {},
}) {
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
  const toggleSelected = (value) => {
    if (values.includes(value)) {
      onChange(values.filter(v => v !== value));
    } else {
      onChange([...values, value])
    }
  }
  const toggleOpen = () => {
    setSearch("");
    setIsOpen(!isOpen);
  }

  const listStyle = {
    margin: 0,
    padding: "1rem",
    background: "white",
    border: "1px solid #e7e7e7",
    listStyle: "none",
    position: "absolute",
    top: "100%",
    maxHeight: "30rem",
    overflow: "auto",
    zIndex: 10,
    minWidth: '25rem',
  };

  const displayValue = values.length === 0
    ? "None selected"
    : values.length === 1
      ? (items.find(i => i.value === values[0])?.label ?? values[0])
      : `${values.length} selected`;

  return html`<div
    class="form-group"
    style=${{ position: "relative", ...style }}
    ref=${clickOutsideRef}
  >
    <label>${label}</label>
    <button
      class="form-control"
      onClick=${toggleOpen}
      style=${{
        textAlign: "start",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
      title=${displayValue}
    >
      ${displayValue}
    </button>
    ${isOpen && html`<ul style=${listStyle}>
      <li>
        <input
          ref=${searchRef}
          class="form-control form-control-sm"
          placeholder="Search"
          type="text"
          onInput=${(e) => setSearch(e.target.value)}
        />
      </li>
      <li style=${{ marginTop: '0.5rem' }}>
        <${Button}
          onClick=${() => {
            const valuesSet = new Set(values);
            filteredItems.forEach(item => valuesSet.add(item.value));
            onChange([...valuesSet]);
          }}
          style=${{ display: 'inline-block', width: 'calc(50% - 0.25rem)', marginRight: "0.5rem" }}
        >Select All<//>
        <${Button}
          onClick=${() => {
            const valuesSet = new Set(values);
            filteredItems.forEach(item => valuesSet.delete(item.value));
            onChange([...valuesSet]);
          }}
          style=${{ display: 'inline-block', width: 'calc(50% - 0.25rem)' }}
        >Deselect All<//>
      </li>
      ${filteredItems.map(i => html`<li key=${i.value}>
        <div className="checkbox">
          <label
            class="form-check-label"
            for="multiselectoption-${i.value}"
            style=${{ width: "100%" }}
          >
            <input
              type="checkbox"
              id="multiselectoption-${i.value}"
              onInput=${(e) => {
                e.preventDefault();
                toggleSelected(i.value);
              }}
              checked=${values.includes(i.value)}
            />
            ${i.label}
          </label>
        </div>
      </li>`)}
    </ul>`}
  </div>`;
}
{% endverbatim %}
{% endif %}
