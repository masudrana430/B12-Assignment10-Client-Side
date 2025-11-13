// src/Pages/MyContribution.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import Container from "../Components/Container";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import LoadingSpinnercopy from "../Components/LoadingSpinnercopy";

import Lottie from "lottie-react";
import NoData from "./../animation/no data found.json";

const API =
  import.meta.env.VITE_API_BASE || "https://b12-a10-copy-server.vercel.app";

const currency = (n) => {
  const v = Number(n) || 0;
  try {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(v);
  } catch {
    return `৳ ${v}`;
  }
};

export default function MyContribution() {
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // Load current user's contributions
  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();

    (async () => {
      try {
        const token = user.getIdToken
          ? await user.getIdToken()
          : user.accessToken || user?.stsTokenManager?.accessToken;

        const email = user.email;

        const res = await fetch(
          `${API}/my-contribution?email=${encodeURIComponent(email)}`,
          {
            headers: { Authorization: `Bearer ${token ?? ""}` },
            signal: controller.signal,
          }
        );

        if (res.status === 401 || res.status === 403) {
          toast.info("Please log in again");
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        const normalized = (Array.isArray(data) ? data : []).map((d) => {
          const id =
            typeof d._id === "string"
              ? d._id
              : d._id?.$oid ?? d._id?.toString?.() ?? "";

          const title = d.issueTitle || d.title || "Untitled Issue";
          const category = d.category || "—";
          const paid = Number(d.amount) || 0;
          const when = d.date || d.createdAt || Date.now();

          return { ...d, _id: id, title, category, paid, when };
        });

        setRows(normalized);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error(e);
          toast.error("Failed to load your contributions.");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [user]);

  const totalPaid = useMemo(
    () => rows.reduce((s, r) => s + (Number(r.paid) || 0), 0),
    [rows]
  );

  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleString("en-GB", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  // Single receipt for a row
  const downloadReceipt = async (row) => {
    try {
      setDownloading(true);

      const jsPDFModule = await import("jspdf");
      const jsPDF = jsPDFModule.default;

      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text("Clean-Up Contribution Receipt", 14, 16);
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);

      const email = user?.email || "—";
      const lines = [
        `Contributor: ${
          row.contributorName || user?.displayName || "Anonymous"
        }`,
        `Email: ${email}`,
        `Issue: ${row.title}`,
        `Category: ${row.category}`,
        `Contribution ID: ${row._id}`,
        `Date: ${fmtDate(row.when)}`,
        `Amount: ${currency(row.paid)}`,
      ];
      let y = 32;
      lines.forEach((t) => {
        doc.text(t, 14, y);
        y += 6;
      });

      y += 6;
      doc.setFontSize(9);
      doc.text("Thank you for helping keep our community clean!", 14, y);

      const safeEmail = (email || "user").replace(/[^a-zA-Z0-9_-]/g, "_");
      doc.save(`receipt_${safeEmail}_${row._id}.pdf`);
    } catch (e) {
      console.error("Receipt PDF error:", e);
      toast.error("Failed to create receipt PDF.");
    } finally {
      setDownloading(false);
    }
  };

  // Full report for all rows
  const downloadAllReport = async () => {
    if (!rows.length) return toast.info("No contributions to export.");
    try {
      setDownloading(true);

      const jsPDFModule = await import("jspdf");
      const autoTableModule = await import("jspdf-autotable");

      const jsPDF = jsPDFModule.default;
      const autoTable = autoTableModule.default || autoTableModule.autoTable; // support both styles

      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text("My Clean-Up Contributions", 14, 16);
      doc.setFontSize(10);
      doc.text(`User: ${user?.email || "—"}`, 14, 22);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
      doc.text(
        `Total Paid: ${currency(totalPaid)} | Records: ${rows.length}`,
        14,
        34
      );

      const body = rows.map((r, idx) => [
        idx + 1,
        r.title,
        r.category,
        currency(r.paid),
        fmtDate(r.when),
      ]);

      // ✅ use autoTable(doc, options) instead of doc.autoTable(...)
      autoTable(doc, {
        head: [["#", "Issue Title", "Category", "Paid Amount", "Date"]],
        body,
        startY: 40,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [54, 184, 100] },
      });

      const safeEmail = (user?.email || "user").replace(/[^a-zA-Z0-9_-]/g, "_");
      doc.save(`my_contributions_${safeEmail}.pdf`);
    } catch (e) {
      console.error("Download all PDF error:", e);
      toast.error("Failed to export PDF.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinnercopy />
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-5xl mx-auto py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">My Contributions</h2>
            <p className="text-sm opacity-70">
              Total paid:{" "}
              <span className="font-semibold">{currency(totalPaid)}</span>
            </p>
          </div>
          <button
            className="
    btn btn-sm
    border border-[#1a6a3d]
    bg-gradient-to-r from-[#36B864] to-[#1A6A3D]
    text-white font-semibold
    transition-colors duration-300
    hover:from-[#48D978] hover:to-[#2B8C4A]
    disabled:opacity-60 disabled:cursor-not-allowed
  "
            disabled={downloading || !rows.length}
            onClick={downloadAllReport}
          >
            {downloading ? "Preparing…" : "Download All (PDF)"}
          </button>
        </div>

        {rows.length ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Issue Title</th>
                  <th>Category</th>
                  <th>Paid Amount</th>
                  <th>Date</th>
                  <th className="w-40">Download</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r._id}>
                    <td>{i + 1}</td>
                    <td className="max-w-[280px] truncate">{r.title}</td>
                    <td>{r.category}</td>
                    <td className="font-semibold">{currency(r.paid)}</td>
                    <td>{fmtDate(r.when)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => downloadReceipt(r)}
                        disabled={downloading}
                      >
                        Receipt (PDF)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-12">
            <Lottie
              animationData={NoData}
              loop={true}
              style={{
                width: "400px",
                height: "400px",
                margin: "0 auto",
              }}
            />
            <p className="text-center text-lg mt-4">
              You haven’t made any contributions yet.
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}
