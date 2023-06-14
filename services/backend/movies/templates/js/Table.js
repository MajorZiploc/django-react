{% if "Table" not in imports %}
{% add_js_import imports "Table" %}
// include dependencies here
{% include "js/Button.js" %}
{% include "js/useCSS.js" %}
{% verbatim %}

function DefaultTableRow({ children }) {
  return html`<tr>
    ${children}
  </tr>`
}

function Table({
  data,
  idKey,
  loading,
  columns,
  page,
  pageSize,
  numPages,
  onNextPage,
  onPrevPage,
  onSort,
  sort,
  condensed,
  blocky,
  tableRowComponent=DefaultTableRow,
}) {
    useCSS("TableCSS", `
    .table-loading {
      position: relative;
    }
    .table-loading:before {
      display: block;
      content: "Loading...";
      position: absolute;
      top: 37px;
      left: 0;
      width: 100%;
      height: calc(100% - 88px);
      background: rgba(200, 200, 200, 0.5);
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      padding-top: 2rem;
      filter: blur(1);
    }
    .table-loading > tbody {
      filter: blur(2px);
    }
  `);

  const cycleSort = (column) => {
    if (column.sort) {
      if (sort === column.sort) {
        onSort(`-${column.sort}`);
      } else {
        onSort(column.sort);
      }
    }
  };

  const formatCell = (row, column) => {
    try {
      return column.format(row[column.key], row);
    } catch {
      return row[column.key];
    }
  };

  return html`
    <table class="table ${loading ? "table-loading" : ""} ${condensed ? "table-condensed" : ""} ${blocky ? "table-striped table-bordered table-hover": ""}">
      <thead>
        <tr>
          ${columns.map(column => html`<th
            key=${column.key}
            onClick=${() => cycleSort(column)}
            style=${column.sort ? { cursor: 'pointer', width: column.width } : { width: column.width }}
            scope="col"
          >
            ${column.label}
            ${column.sort && sort === column.sort ? '▲' : null}
            ${column.sort && sort === `-${column.sort}` ? '▼' : null}
          </th>`)}
        </tr>
      </thead>
      <tbody>
        ${data && data.map(row => html`
          <${tableRowComponent}
            row=${row}
            columns=${columns}
            data=${data}
            idKey=${idKey}
          >
            ${columns.map(column => html`
              <td key=${column.key}>
                ${formatCell(row, column)}
              </td>
            `)}
          </>
        `)}
        <!-- Show number of empty rows equal to page size when loading if there's no data yet -->
        ${loading && (!data || !data.length) && [...Array(pageSize || 5).keys()].map(i => html`
          <tr key=${i}><td colSpan="100" style=${{ opacity: 0 }}>Loading<//><//>
        `)}
      </tbody>
      ${Boolean(numPages) && html`<tfoot>
        <tr>
          <td colSpan="100">
            <div style=${{ display: 'flex', flexFlow: 'row nowrap' }}>
              <${Button} disabled=${page <= 1} onClick=${onPrevPage}>
                Previous Page
              <//>
              <span style=${{ flex: '1 1 0', textAlign: 'center' }}>
                Page ${page} / ${numPages}
              </span>
              <${Button} disabled=${page >= numPages} onClick=${onNextPage}>
                Next Page
              <//>
            </div>
          </td>
        </tr>
      </tfoot>`}
    </table>
  `;
}
{% endverbatim %}
{% endif %}
