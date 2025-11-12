// src/Components/CategorySection.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CATS = [
  {
    key: "Garbage",
    label: "Garbage",
    desc: "Overflowing bins, littering, illegal dumping of waste.",
    emoji: "🗑️",
    ring: "ring-success",
    bg: "bg-success/10",
  },
  {
    key: "Illegal Construction",
    label: "Illegal Construction",
    desc: "Unapproved structures blocking roads/footpaths & public spaces.",
    emoji: "🚧",
    ring: "ring-warning",
    bg: "bg-warning/10",
  },
  {
    key: "Broken Public Property",
    label: "Broken Public Property",
    desc: "Damaged lights, benches, signs, bus stops or public utilities.",
    emoji: "🛠️",
    ring: "ring-info",
    bg: "bg-info/10",
  },
  {
    key: "Road Damage",
    label: "Road Damage",
    desc: "Potholes, cracks, waterlogging damage, unsafe road surfaces.",
    emoji: "🛣️",
    ring: "ring-error",
    bg: "bg-error/10",
  },
];

export default function CategorySection({ onSelect }) {
  const navigate = useNavigate();

  const handleView = (cat) => {
    if (onSelect) return onSelect(cat);
    navigate(`/all-issues?category=${encodeURIComponent(cat)}`);
  };

  return (
    <section className="py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold">Report by Category</h2>
        <p className="text-base-content/70 mt-2">
          Pick a category to view related reports or file a new one in seconds.
        </p>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {CATS.map(({ key, label, desc, emoji, ring, bg }) => (
          <div key={key} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className={`avatar placeholder ${ring}`}>
                  <div className={`w-12 rounded-full ${bg} ring-2`}>
                    <span className="text-xl select-none">{emoji}</span>
                  </div>
                </div>
                <h3 className="card-title text-xl">{label}</h3>
              </div>

              <p className="mt-2 text-sm text-base-content/80">{desc}</p>

              <div className="card-actions mt-4 justify-between">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => handleView(key)}
                  aria-label={`View ${label} issues`}
                >
                  View issues
                </button>

                <Link
                  to={`/add-issues?category=${encodeURIComponent(key)}`}
                  className="btn btn-sm bg-[#36B864] text-white border border-[#1a6a3d] hover:bg-[#2da258]"
                  aria-label={`Report ${label} issue`}
                >
                  Report
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
