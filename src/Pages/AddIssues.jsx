import React, { useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://b12-a10-copy-server.vercel.app";

const CATEGORIES = ["Garbage", "Footpath", "Dumping", "Waterlogging"];

const AddIssues = () => {
  const { user } = useContext(AuthContext);

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0],
    location: "",
    description: "",
    image: "",
    amount: "",
    status: "ongoing", // default per spec
  });

  // display-only date (not an input)
  const todayDisplay = useMemo(
    () => new Date().toLocaleString(),
    [] // compute once on mount
  );

  const onChange = (key) => (e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [key]: v }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.title?.trim()) return toast.warn("Please enter issue title");
    if (!form.location?.trim()) return toast.warn("Please enter location");
    if (!form.description?.trim())
      return toast.warn("Please enter description");
    const amountNum = Number(form.amount);
    if (!amountNum || amountNum <= 0)
      return toast.warn("Please enter a valid budget amount (BDT)");

    // Build payload for MongoDB
    const payload = {
      title: form.title.trim(),
      category: form.category,
      location: form.location.trim(),
      description: form.description.trim(),
      image: form.image?.trim(), // URL; optional but recommended
      amount: amountNum,
      status: form.status || "ongoing",
      date: new Date(), // saved value (Date object → ISO in Mongo)
      email: user?.email || "", // logged-in user email
    };

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/issues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `HTTP ${res.status}`);
      }

      toast.success("Issue submitted successfully!");
      // Reset the form (or navigate to /my-issues)
      setForm({
        title: "",
        category: CATEGORIES[0],
        location: "",
        description: "",
        image: "",
        amount: "",
        status: "ongoing",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit issue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h2 className="text-3xl font-bold text-center mt-4">Add Issues</h2>
      <p className="text-center text-slate-600 mt-1">
        Report a cleanliness or public space-related issue in your area.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Issue Title</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="e.g., Garbage spilling over near Road 8"
            value={form.title}
            onChange={onChange("title")}
            required
          />
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            className="select select-bordered"
            value={form.category}
            onChange={onChange("category")}
            required
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="e.g., Mohakhali, Dhaka"
            value={form.location}
            onChange={onChange("location")}
            required
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            rows={4}
            placeholder="Describe the issue clearly"
            value={form.description}
            onChange={onChange("description")}
            required
          />
        </div>

        {/* Image (URL) + preview */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="url"
            className="input input-bordered"
            placeholder="https://…"
            value={form.image}
            onChange={onChange("image")}
          />
          {form.image ? (
            <div className="mt-3 rounded-lg overflow-hidden border">
              <img
                src={form.image}
                alt="Issue preview"
                className="w-full h-56 object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/800x520?text=Preview+Not+Available";
                }}
              />
            </div>
          ) : (
            <p className="mt-2 text-xs text-slate-500">
              Paste a direct image URL (or leave blank).
            </p>
          )}
        </div>

        {/* Amount */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Amount (Suggested Fix Budget) — BDT
            </span>
          </label>
          <input
            type="number"
            min="1"
            className="input input-bordered"
            placeholder="e.g., 200"
            value={form.amount}
            onChange={onChange("amount")}
            required
          />
        </div>

        {/* Status (default ongoing) */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            className="select select-bordered"
            value={form.status}
            onChange={onChange("status")}
          >
            <option value="ongoing">ongoing</option>
            <option value="pending">pending</option>
            <option value="in-progress">in-progress</option>
            <option value="resolved">resolved</option>
          </select>
          <p className="mt-1 text-xs text-slate-500">
            Default is <b>ongoing</b> when a user reports a new issue.
          </p>
        </div>

        {/* Email (read-only) */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered"
            value={user?.email || ""}
            readOnly
          />
        </div>

        {/* Date (display only) */}
        <div className="text-sm text-slate-600">
          <b>Date:</b> {todayDisplay}
        </div>

        {/* Submit */}
        <div className="mt-4">
          <button
            type="submit"
            className={`btn w-full bg-[#36B864] text-white border border-[#1a6a3d] hover:bg-[#2da258] ${
              submitting ? "btn-disabled" : ""
            }`}
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Submit Issue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIssues;
