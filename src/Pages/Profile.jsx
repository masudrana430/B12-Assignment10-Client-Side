import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import { AuthContext } from "../Provider/AuthProvider";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [toast, setToast] = useState(null); // {type:'success'|'error', message:string}

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoUrl(user.photoURL || "");
    }
  }, [user]);

  if (!user) {
    return (
      <section className="py-16">
        <Container>
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-bold">You’re not signed in</h2>
            <p className="mt-2 text-slate-600">
              Please{" "}
              <Link to="/auth/login" className="link text-primary">
                log in
              </Link>{" "}
              to view and edit your profile.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setToast(null);

    if (name.trim().length < 4) {
      const msg = "Name must be at least 4 characters.";
      setErr(msg);
      setToast({ type: "error", message: msg });
      return;
    }

    try {
      setLoading(true);
      // Calls updateProfile(auth.currentUser, { displayName, photoURL }) inside your provider
      await updateUser({ displayName: name.trim(), photoURL: photoUrl.trim() });
      setToast({ type: "success", message: "Profile updated!" });
    } catch (error) {
      const msg = error?.message || "Failed to update profile.";
      setErr(msg);
      setToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 2400);
    }
  };

  const preview = photoUrl || "https://cdn-icons-png.freepik.com/512/6596/6596121.png";

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="card bg-base-100 shadow-xl border border-slate-100">
            <div className="card-body">
              <h2 className="card-title">My Profile</h2>

              {/* Current info */}
              <div className="flex items-center gap-4 mt-2">
                <img
                  src={preview}
                  alt="avatar preview"
                  className="w-20 h-20 rounded-full object-cover border"
                />
                <div className="text-sm">
                  <p className="font-semibold">
                    {user.displayName || "Unnamed"}
                  </p>
                  <p className="text-slate-600">{user.email}</p>
                </div>
              </div>

              {/* Update form */}
              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                <div className="form-control grid gap-1">
                  <label className="label" htmlFor="name">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`input input-bordered ${err && "input-error"}`}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control grid gap-1">
                  <label className="label" htmlFor="photoUrl">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    id="photoUrl"
                    type="url"
                    className="input input-bordered"
                    placeholder="https://example.com/me.jpg"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                  <span className="mt-2 text-xs text-slate-500">
                    Tip: Paste a direct image link. The preview updates
                    instantly.
                  </span>
                </div>

                {err && <p className="text-error text-sm">{err}</p>}

                <div className="mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating…" : "Update Profile"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* toast */}
        {toast && (
          <div className="toast toast-top toast-end z-50">
            <div
              className={`alert ${
                toast.type === "success" ? "alert-success" : "alert-error"
              }`}
            >
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Profile;

