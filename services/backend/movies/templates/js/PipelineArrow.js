{% if "PipelineArrow" not in imports %}
{% add_js_import imports "PipelineArrow" %}
{% verbatim %}
/**
 * The arrow connecting one node to another
 * 
 * As currently implemented this makes a lot of assumptions:
 * - the from/to nodes have been mounted
 * - the from node is to the left of the to node
 * - the from/to nodes have position: relative
 * - the positions (esp vertical) of the nodes is not dynamic
 * - there is at least a few rems of horizontal space between nodes
 * - there is nothing else between the nodes that the arrows should avoid
 * So proceed with caution if trying to reuse this component outside of its original context
 */
function PipelineArrow({ from, to }) {
  const [fromBBox, setFromBBox] = useState();
  const [toBBox, setToBBox] = useState();
  useEffect(() => {
    const fromEl = document.getElementById(from);
    if (fromEl && !fromBBox) {
      setFromBBox(fromEl.getBoundingClientRect());
    }
    const toEl = document.getElementById(to);
    if (toEl && !toBBox) {
      setToBBox(toEl.getBoundingClientRect());
    }
  });

  if (!fromBBox || !toBBox) {
    return null;
  }

  const fromX = fromBBox.x + fromBBox.width;
  const fromY = fromBBox.y + fromBBox.height / 2;
  const toX = toBBox.x;
  const toY = toBBox.y + toBBox.height / 2;
  const minX = Math.min(fromX, toX);
  const maxX = Math.max(fromX, toX);
  const minY = Math.min(fromY, toY);
  const maxY = Math.max(fromY, toY);
  const width = maxX - minX;
  const height = maxY - minY;
  const radius = 16;
  const midX = minX + width / 2;
  const triangleWidth = 8;
  const triangleHeight = 8;
  return html`
    <svg
      style=${{
        position: 'absolute',
        [fromY > toY ? 'bottom' : 'top']: 'calc(50% - 5px)',
        left: 'calc(100% + 1px)',
        pointerEvents: 'none',
      }}
      viewBox="${minX} ${minY - 5} ${width} ${height + 10}"
      width=${width}
      height=${height + 10}
    >
      ${height >= radius * 2 ? html`<path
        d="
          M ${fromX} ${fromY}
          L ${midX - radius} ${fromY}
          q ${radius} 0 ${radius} ${fromY < toY ? radius : -radius}
          L ${midX} ${(fromY < toY) ? (toY - radius) : (toY + radius)}
          q 0 ${fromY < toY ? radius : -radius} ${radius} ${fromY < toY ? radius : -radius}
          L ${toX} ${toY}
        "
        stroke="#333"
        fill="transparent"
      />` : html`<path
        d="
          M ${fromX} ${fromY}
          L ${toX} ${toY}
        "
        stroke="#333"
        fill="transparent"
      />`}
      <path
        d="
          M ${toX} ${toY}
          l ${-triangleWidth} ${-triangleHeight / 2}
          l 0 ${triangleHeight}
          L ${toX} ${toY}
        "
        stroke="#333"
        fill="#333"
      />
    </svg>
  `;
}
{% endverbatim %}
{% endif %}