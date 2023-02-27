{% if "useFetch" not in imports %}
{% add_js_import imports "useFetch" %}
// include dependencies here
{% verbatim %}
/**
 * Fetches data every time the url or init changes, or when the returned forceReload function is called
 * @param {string} url The url to fetch. Will reload the data every time the url changes
 * @param {Object|undefined} init The init object passed in to fetch. Will reload the data every time the init changes (with strict equality check), so if using, you probably want to useMemo
 * @returns {{ loading: boolean, data: Object|null, error: (Error|null), forceReload: Function }}
 */
function useFetch(
  url,
  init=undefined,
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  // This value is meaningless. It exists only to be passed into useEffect to trigger it to rerun when the value changes
  const [forceReloadCounter, setForceReloadCounter] = useState(0);

  const forceReload = () => setForceReloadCounter(forceReloadCounter + 1);

  useEffect(() => {
    setData(null);
    setLoading(Boolean(url));
    setError(null);

    if (url) {
      const abortController = new AbortController();
      fetch(url, { signal: abortController.signal, ...init })
        .then(response => response.json())
        .then(json => {
          setData(json);
          setLoading(false);
          setError(null);
        })
        .catch(e => {
          if (e.name !== 'AbortError') {
            setData(null);
            setLoading(false);
            setError(e);
          }
        });

      const cleanupFunc = () => abortController.abort();
      return cleanupFunc;
    }
  }, [url, init, forceReloadCounter]);

  return {
    data,
    loading,
    error,
    forceReload,
  };
}
{% endverbatim %}
{% endif %}
