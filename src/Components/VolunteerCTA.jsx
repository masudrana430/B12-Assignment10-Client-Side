import React, { useRef, useState } from "react";

export default function VolunteerCTA() {
  const modalRef = useRef(null);
  const [pending, setPending] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    area: "",
    date: "",
    notes: "",
  });

  const open = () => modalRef.current?.showModal();
  const close = () => modalRef.current?.close();
  const onChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    // No backend yet — just log it (replace with fetch later)
    setTimeout(() => {
      console.log("Volunteer sign-up:", values);
      setPending(false);
      close();
      // toast.success('Thanks for volunteering!') // optional
    }, 600);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-base-200 bg-gradient-to-br from-[#E8F7EE] to-[#F8F5FF] dark:from-base-200 dark:to-base-300 py-10 md:py-14 mb-12 md:mb-16">
      <div className="px-6 md:px-10 py-10 md:py-14 grid gap-8 md:grid-cols-2 items-center">
        {/* Left: copy */}
        <div>
          <p className="badge badge-success">Volunteer</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
            Join a <span className="text-[#36B864]">Clean Drive</span> in your area
          </h2>
          <p className="mt-3 text-base-content/80">
            Spend a couple of hours to help remove litter, clear blocked drains,
            and make your neighborhood safer and cleaner.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-base-content/70">
            <li>• Tools & gloves provided</li>
            <li>• Safe, family-friendly groups</li>
            <li>• Certificates for volunteers</li>
          </ul>

          <div className="mt-6 flex gap-3">
            <button onClick={open} className="btn btn-sm bg-[#36B864] text-white border border-[#1a6a3d] hover:bg-[#2da258]">Join now</button>
            <a href="/all-issues" className="btn btn-ghost">See local issues</a>
          </div>
        </div>

        {/* Right: simple preview box */}
        <div className="md:justify-self-end">
          <div className="mockup-window border bg-base-100 max-w-lg">
            <div className="px-6 py-5">
              <p className="font-semibold">Upcoming community drives</p>
              <ul className="mt-3 text-sm space-y-2">
                <li className="flex items-center justify-between">
                  <span>Road 8 — Litter pickup</span>
                  <span className="badge">Sat 9:00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Mohakhali — Drain clearing</span>
                  <span className="badge badge-ghost">Sun 8:30</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Banani — Tree planting</span>
                  <span className="badge badge-outline">Next week</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Volunteer sign-up</h3>
          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <input
                name="name"
                value={values.name}
                onChange={onChange}
                required
                className="input input-bordered w-full"
                placeholder="Your name"
              />
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
                required
                className="input input-bordered w-full"
                placeholder="Email"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                name="area"
                value={values.area}
                onChange={onChange}
                className="input input-bordered w-full"
                placeholder="Preferred area (e.g., Mohakhali)"
              />
              <input
                name="date"
                type="date"
                value={values.date}
                onChange={onChange}
                className="input input-bordered w-full"
              />
            </div>
            <textarea
              name="notes"
              value={values.notes}
              onChange={onChange}
              rows={3}
              className="textarea textarea-bordered w-full"
              placeholder="Any notes or tools you can bring"
            />
            <div className="modal-action">
              <button type="button" onClick={close} className="btn btn-ghost">
                Cancel
              </button>
              <button type="submit" disabled={pending} className="btn btn-primary">
                {pending ? <span className="loading loading-spinner" /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </section>
  );
}
