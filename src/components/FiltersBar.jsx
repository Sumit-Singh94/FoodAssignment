import React, { useState, useEffect } from "react";

function FiltersBar({ mode, onApply, categories, categoryLoading }) {
  const [localMode, setLocalMode] = useState(mode || "name");
  const [search, setSearch] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setLocalMode(mode);
  }, [mode]);

  function submit(e) {
    e.preventDefault();
    onApply({
      mode: localMode,
      search,
      barcode,
      category,
      sortField,
      sortOrder
    });
  }

  return (
    <section className="filters">
      <div className="filters-mode-toggle">
        <button
          type="button"
          className={localMode === "name" ? "toggle-btn active" : "toggle-btn"}
          onClick={() => setLocalMode("name")}
        >
          Search by name
        </button>
        <button
          type="button"
          className={localMode === "barcode" ? "toggle-btn active" : "toggle-btn"}
          onClick={() => setLocalMode("barcode")}
        >
          Search by barcode
        </button>
      </div>

      <form className="filters-form" onSubmit={submit}>
        {localMode === "name" && (
          <div className="form-row">
            <div className="form-group grow">
              <label className="label">Product name</label>
              <input
                type="text"
                className="input"
                placeholder="Search by product name"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="label">Category</label>
              <select
                className="input"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">All categories</option>
                {categoryLoading && <option>Loading...</option>}
                {!categoryLoading &&
                  categories.map(cat => (
                    <option key={cat.id || cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label className="label">Sort by</label>
              <select
                className="input"
                value={sortField}
                onChange={e => setSortField(e.target.value)}
              >
                <option value="">Relevance</option>
                <option value="name">Product name</option>
                <option value="nutrition">Nutrition grade</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label">Order</label>
              <select
                className="input"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        )}

        {localMode === "barcode" && (
          <div className="form-row">
            <div className="form-group grow">
              <label className="label">Barcode</label>
              <input
                type="text"
                className="input"
                placeholder="Enter barcode, for example 737628064502"
                value={barcode}
                onChange={e => setBarcode(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="form-row submit-row">
          <button type="submit" className="btn-primary">
            Apply
          </button>
        </div>
      </form>
    </section>
  );
}

export default FiltersBar;


