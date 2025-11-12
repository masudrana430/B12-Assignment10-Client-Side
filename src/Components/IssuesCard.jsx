import React from "react";
import { Link } from "react-router-dom";

const safeAmount = (amount) => {
  try {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  } catch {
    return `৳ ${amount ?? 0}`;
  }
};

const IssuesCard = ({ issue }) => {
  const { _id, title, category, location, amount, image } = issue || {};

  return (
    <div className="card bg-base-100 border rounded-xl overflow-hidden hover:shadow-md transition">
      {/* Image */}
      <figure className="aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placehold.co/800x520?text=No+Image";
          }}
        />
      </figure>

      {/* Body */}
      <div className="card-body p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-snug line-clamp-2">
            {title}
          </h3>
          <span className="shrink-0 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 border border-emerald-200">
            {category}
          </span>
        </div>

        <p className="text-sm text-slate-500 mt-1">📍 {location}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-bold text-slate-900">
            {safeAmount(amount)}
          </span>

          <Link
            to={`/issues-details/${_id}`}
            className="btn btn-sm bg-[#36B864] text-white border border-[#1a6a3d] hover:bg-[#2da258]"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssuesCard;
