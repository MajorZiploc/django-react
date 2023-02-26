{% if "DateRange" not in imports %}
{% add_js_import imports "DateRange" %}
{% include "js/useOnClickOutside.js" %}
{% include "js/Button.js" %}
{% verbatim %}

function DateRange({
  values,
  onChange,
  label,
  style,
  includeOptions,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const clickOutsideRef = useOnClickOutside(() => setIsOpen(false));

  const start = values[0] || "";
  const end = values[1] || "";
  const toggleOpen = () => setIsOpen(!isOpen);
  
  const selectedOption = DateRange.getOption([start, end]);

  const listStyle = {
    margin: 0,
    padding: 0,
    background: "white",
    border: "1px solid #e7e7e7",
    listStyle: "none",
    position: "absolute",
    top: "100%",
    maxHeight: "30rem",
    overflow: "auto",
    zIndex: 10,
  };

  const handleChange = ([start, end]) => {
    const newOption = DateRange.getOption([start, end]);
    if (DateRange.predefinedOptions.includes(newOption)) {
      onChange(newOption.values, newOption.label);
    } else {
      onChange(newOption.values);
    }
  }

  return html`
    <div
      class="form-group"
      style=${{ position: "relative", ...style }}
      ref=${clickOutsideRef}
    >
      <label>${label}</label>
      <button class="form-control" style=${{ textAlign: "start" }} onClick=${toggleOpen}>
        ${selectedOption.label}
      </button>
      ${isOpen && html`<ul style=${listStyle}>
        ${DateRange.predefinedOptions.filter(option => !includeOptions || includeOptions.includes(option.label)).map(option => html`<li style=${{ margin: "0.5rem" }}>
          <${Button}
            onClick=${() => handleChange(option.values)}
            primary=${option === selectedOption}
            style=${{ width: "100%" }}
          >
            ${option.label}
          <//>
        </li>`)}
        <li style=${{ margin: "0.5rem" }}>
          <strong>Custom Range</strong>
          <input
            type="date"
            class="form-control"
            value=${start}
            max=${end}
            onInput=${e => handleChange([e.target.value, end || e.target.value])}
          />
          <input
            type="date"
            class="form-control"
            value=${end}
            min=${start}
            onInput=${e => handleChange([start || e.target.value, e.target.value])}
          />
        </li>
      </ul>`}
    </div>
  `;
}

DateRange.predefinedOptions =[{
  label: "Anytime",
  values: ["", ""],
}, {
  label: "Today",
  values: [
    moment().format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ],
}, {
  label: "Yesterday",
  values: [
    moment().clone().date(moment().date() - 1).format("YYYY-MM-DD"),
    moment().clone().date(moment().date() - 1).format("YYYY-MM-DD"),
  ],
}, {
  label: "Past 7 Days",
  values: [
    moment().clone().date(moment().date() - 7).format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ],
}, {
  label: "This Month",
  values: [
    moment().clone().date(1).format("YYYY-MM-DD"),
    moment().clone().month(moment().month() + 1).date(0).format("YYYY-MM-DD"),
  ],
}, {
  label: "Last Month",
  values: [
    moment().clone().month(moment().month() - 1).date(1).format("YYYY-MM-DD"),
    moment().clone().date(0).format("YYYY-MM-DD"),
  ],
}, {
  label: "This Year",
  values: [
    moment().startOf('year').format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ],
}];

DateRange.getOption = (dateRangeOrPredefinedOption) => {
  if (!dateRangeOrPredefinedOption) {
    return DateRange.predefinedOptions[0];
  } if (typeof dateRangeOrPredefinedOption === "string") {
    const predefinedOptionLabel = dateRangeOrPredefinedOption;
    return DateRange.predefinedOptions.find(option => option.label === predefinedOptionLabel) || DateRange.predefinedOptions[0];
  } else {
    const [start, end] = dateRangeOrPredefinedOption;
    return DateRange.predefinedOptions.find(option => option.values[0] === start && option.values[1] === end) || {
      label: `${moment(start).format("M/D/YYYY")} - ${moment(end).format("M/D/YYYY")}`,
      values: [start, end],
    };
  }
};

{% endverbatim %}
{% endif %}
