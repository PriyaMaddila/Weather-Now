import React, { useState } from "react";

export default function SearchBar({ onSearch, recent = [], onPick }) {
  const [q, setQ] = useState("");

  function submit(e) {
    e?.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
    setQ("");
  }

  return (
    <div className="search-area">
      <form onSubmit={submit} className="search-form">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Enter city (e.g. London, Mumbai)"
          className="search-input"
          aria-label="city"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {recent.length > 0 && (
        <div className="recent">
          <small>Recent:</small>
          <div className="recent-list">
            {recent.map((r, i) => (
              <button key={i} className="recent-item" onClick={() => onPick(r)}>
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
