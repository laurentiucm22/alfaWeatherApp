import { useEffect, useState } from "react";

export const useFetch = (url, options) => {
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    setState({ data: null, loading: true });

    fetch(url, options)
      .then((x) => x.json())
      .then((y) => setState({ data: y, loading: false }));
  }, [url, options]);

  return state;
};
