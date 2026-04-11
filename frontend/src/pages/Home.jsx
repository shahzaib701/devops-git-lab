import { useEffect, useState } from "react";

const initialState = {
  loading: true,
  error: null,
  health: null,
  message: null,
};

export default function Home() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState((s) => ({ ...s, loading: true, error: null }));

      try {
        const [healthRes, messageRes] = await Promise.all([
          fetch("/api/health"),
          fetch("/api/message"),
        ]);

        if (!healthRes.ok) {
          throw new Error(`Health check failed (${healthRes.status})`);
        }
        if (!messageRes.ok) {
          throw new Error(`Message request failed (${messageRes.status})`);
        }

        const healthText = await healthRes.text();
        const messageData = await messageRes.json();

        if (!cancelled) {
          setState({
            loading: false,
            error: null,
            health: healthText,
            message: messageData?.message ?? null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            loading: false,
            error: err instanceof Error ? err.message : "Something went wrong",
            health: null,
            message: null,
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">API Dashboard</h1>
        <p className="subtitle">Data from the Express backend</p>

        {state.loading && (
          <div className="status loading" role="status">
            <span className="spinner" aria-hidden="true" />
            Loading from backend…
          </div>
        )}

        {!state.loading && state.error && (
          <div className="status error" role="alert">
            <strong>Could not load data.</strong>
            <span>{state.error}</span>
            <p className="hint">
              Start the API on port 5000, then refresh. Proxy sends{" "}
              <code>/api</code> to the backend.
            </p>
          </div>
        )}

        {!state.loading && !state.error && (
          <dl className="data">
            <div className="row">
              <dt>GET /api/health</dt>
              <dd>{state.health}</dd>
            </div>
            <div className="row">
              <dt>GET /api/message</dt>
              <dd>{state.message}</dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
}
