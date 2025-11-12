// src/Components/CommunityStats.jsx
// import { Container } from "postcss";
import React from "react";
import { FiUsers, FiCheckCircle, FiClock } from "react-icons/fi";
import Container from "./Container";

export default function CommunityStats({
  // Pass real numbers if you have them; these are safe fallbacks
  totals = { users: 0, resolved: 0, pending: 0 },
  sinceText = "since launch",
}) {
  const cards = [
    {
      label: "Registered Users",
      value: Number(totals?.users ?? 0),
      icon: <FiUsers className="h-5 w-5" />,
      tone: "text-primary",
    },
    {
      label: "Issues Resolved",
      value: Number(totals?.resolved ?? 0),
      icon: <FiCheckCircle className="h-5 w-5" />,
      tone: "text-success",
    },
    {
      label: "Issues Pending",
      value: Number(totals?.pending ?? 0),
      icon: <FiClock className="h-5 w-5" />,
      tone: "text-warning",
    },
  ];

  return (
    <Container>
    <section className="my-10">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h3 className="text-2xl font-extrabold">Community Stats</h3>
          <p className="text-sm text-base-content/60">Updated {sinceText}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((c) => (
            <div
              key={c.label}
              className="card bg-base-100 border border-base-200 shadow-sm"
            >
              <div className="card-body flex-row items-center gap-4">
                <span className={c.tone}>{c.icon}</span>
                <div>
                  <div className="text-2xl font-extrabold leading-none">
                    {isFinite(c.value) ? c.value : 0}
                  </div>
                  <div className="text-sm text-base-content/70">{c.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Container>
  );
}
