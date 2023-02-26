{% if "ExpandableTableRow" not in imports %}
{% add_js_import imports "ExpandableTableRow" %}
// include dependencies here
{% include "js/useCSS.js" %}
{% verbatim %}

function ExpandableTableRow({
  row,
  columns,
  data,
  keysWithoutDropdownLink=["button"],
}) {
  useCSS("ExpandableTableRowCSS", `
    .expand-link {
      color: inherit;
      text-decoration: inherit;
      margin: 0em;
      padding: 1em;
      display: block;
    }
    .expand-link:hover {
      color: inherit;
      text-decoration: none;
    }
  `);
  const formatCell = (row, column) => {
    try {
      return column.format(row[column.key], row);
    } catch {
      return row[column.key];
    }
  };
  const columnCanExpandRow = (column) => {
    return !keysWithoutDropdownLink.some(el => el === column.key)
  }
  const [expandRow, setExpandRow] = useState(false);
  useEffect(() => {
    setExpandRow(false);
  }, [data]);

  return html`
    <tr style=${{ padding: "0px" }}>
      ${columns.map(column => html`
        <td key=${column.key} style=${{ padding: "0px", margin: "0em" }}>
          <a
            class="expand-link"
            onclick=${() => columnCanExpandRow(column) && setExpandRow(!expandRow)}
          >
            ${formatCell(row, column)}
          </a>
        </td>`)}
    </tr>
    ${expandRow && html`
      <tr>
        <td colspan=${ columns.length } style=${{ paddingLeft: "4rem" }}>
          ${Object.keys(row).filter(
            el => !columns.some(columnData => columnData.key === el) && el !== 'seenByAdmin'
          ).sort().map(el => html`
            <p><b>${el}:</b> ${String(row[el])}</p>
          `)}
        </td>
      </tr>
    `}
  `
}

{% endverbatim %}
{% endif %}
