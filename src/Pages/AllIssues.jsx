import React, { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import IssuesCard from "../Components/IssuesCard";
import Container from "../Components/Container";

const norm = (v) => (v ?? "").toString().trim().toLowerCase();

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "in-progress", label: "In-Progress" },
  { value: "resolved", label: "Resolved" },
];

export default function AllIssues() {
  const data = useLoaderData() || [];

  // Build a case-insensitive unique category list
  const categories = useMemo(() => {
    const map = new Map(); // key: lower, val: original for display
    for (const it of data) {
      const c = it?.category;
      if (!c) continue;
      const lower = norm(c);
      if (!map.has(lower)) map.set(lower, c);
    }
    return [
      { value: "all", label: "All" },
      ...Array.from(map.entries())
        .sort((a, b) => a[1].localeCompare(b[1]))
        .map(([value, label]) => ({ value, label })),
    ];
  }, [data]);

  // UI filter state (now includes search)
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    search: "",
  });

  const filtered = useMemo(() => {
    const q = norm(filters.search);

    return data.filter((it) => {
      const catOk =
        filters.category === "all" || norm(it?.category) === filters.category;

      const st = norm(it?.status || "ongoing");
      const statusOk = filters.status === "all" || st === filters.status;

      // search across multiple fields
      const haystack = [
        it?.title,
        it?.location,
        it?.description,
        it?.category,
        it?.status,
      ]
        .map(norm)
        .join(" ");

      const searchOk = !q || haystack.includes(q);

      return catOk && statusOk && searchOk;
    });
  }, [data, filters]);

  const resetFilters = () =>
    setFilters({ category: "all", status: "all", search: "" });

  return (
    <Container>
      <div>
        <div className="text-2xl text-center font-bold">All Issues</div>
        <p className="text-center mb-6">Browse, filter, and search issues.</p>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered"
                value={filters.category}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, category: e.target.value }))
                }
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered"
                value={filters.status}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, status: e.target.value }))
                }
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Search</span>
              </label>
              <div className="join w-full">
                <input
                  type="search"
                  className="input input-bordered join-item w-full"
                  placeholder="Search title, location, description…"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, search: e.target.value }))
                  }
                />
                {filters.search ? (
                  <button
                    type="button"
                    className="btn join-item"
                    onClick={() =>
                      setFilters((f) => ({ ...f, search: "" }))
                    }
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                ) : (
                  <button className="btn join-item" disabled>
                    🔎
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn btn-ghost" onClick={resetFilters}>
              Reset
            </button>
            <span className="text-sm opacity-70">
              Showing {filtered.length} of {data.length}
            </span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((issue) => (
              <IssuesCard key={issue._id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 opacity-70">
            No issues match the selected filters or search.
          </div>
        )}
      </div>
    </Container>
  );
}
