import React, { useMemo, useState } from "react";
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

const normalizeId = (_id) =>
  typeof _id === "string" ? _id : _id?.$oid ?? _id?.toString?.() ?? "";

const statusBadgeClass = (status) => {
  switch ((status || "").toLowerCase()) {
    case "resolved":
      return "badge-success";
    case "in-progress":
      return "badge-warning";
    case "ongoing":
    default:
      return "badge-info";
  }
};

export default function IssuesTableCard({ issue, onAskDelete }) {
  const { _id, title, category, location, amount, image, status } = issue || {};
  const idStr = useMemo(() => normalizeId(_id), [_id]);
  const [pending] = useState(false);

  return (
    <tr className="hover">
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt={title} />
            </div>
          </div>
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-sm opacity-70">{location}</div>
          </div>
        </div>
      </td>

      <td><span className="badge badge-outline">{category || "—"}</span></td>
      <td className="font-medium">{safeAmount(amount)}</td>
      <td><span className={`badge ${statusBadgeClass(status)}`}>{status || "ongoing"}</span></td>

      <td className="flex items-center gap-2">
        <Link to={`/update-issues/${idStr}`} state={{ issue }} className="btn btn-update btn-sm" disabled={pending}>
          Update
        </Link>

        <button
          type="button"
          className="btn btn-error btn-sm"
          onClick={() => onAskDelete?.(issue)}
          disabled={pending}
        >
          Delete
        </button>

        <Link to={`/issues-details/${idStr}`} className="btn btn-ghost btn-sm">
          View
        </Link>
      </td>
    </tr>
  );
}
