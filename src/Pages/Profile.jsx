import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import { AuthContext } from "../Provider/AuthProvider";
import Lottie from "lottie-react";
import Login from "./../animation/Secure Login.json";

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

  const preview = useMemo(
    () =>
      photoUrl ||
      "https://cdn-icons-png.freepik.com/512/6596/6596121.png",
    [photoUrl]
  );

  const firstName = useMemo(() => {
    const base = user?.displayName || "";
    const [first] = base.split(" ");
    return first || "there";
  }, [user]);

  if (!user) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#FAF0DD] via-base-100 to-base-100 min-h-[calc(100vh-80px)]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body items-center text-center">
                <div className="w-64 h-64 md:w-80 md:h-80">
                  <Lottie animationData={Login} loop />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                  Sign in to view your profile
                </h2>
                <p className="mt-2 text-sm md:text-base opacity-70 max-w-md">
                  Your profile helps us personalize your experience and keeps
                  your contributions connected to you.
                </p>
                <Link to="/auth/login" className="btn btn-primary mt-4">
                  Go to Login
                </Link>
              </div>
            </div>
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
      await updateUser({
        displayName: name.trim(),
        photoURL: photoUrl.trim(),
      });
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

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-[#FAF0DD] via-base-100 to-base-100 min-h-[calc(100vh-80px)]">
      <Container>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Hero header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#36B864] via-[#2B8C4A] to-[#1A6A3D] text-white shadow-xl">
            <div className="px-6 py-6 md:px-8 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] opacity-80 font-semibold">
                  Account
                </p>
                <h1 className="text-2xl md:text-3xl font-bold mt-1">
                  Hello, {firstName}
                </h1>
                <p className="mt-2 text-sm md:text-base text-white/90 max-w-md">
                  Manage your profile information and keep your account up to
                  date. Changes are applied across all your contributions.
                </p>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative">
                  <img
                    src={preview}
                    alt="avatar preview"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white/70 shadow-lg"
                  />
                  <span className="absolute -bottom-1 -right-1 badge badge-sm badge-success shadow-md">
                    Online
                  </span>
                </div>
                <div className="hidden sm:block text-sm">
                  <p className="font-semibold">
                    {user.displayName || "Unnamed user"}
                  </p>
                  <p className="text-white/80 break-all">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content: overview + form */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)] gap-6">
            {/* Left: profile summary */}
            <div className="card bg-base-100 shadow-lg border border-base-200/70">
              <div className="card-body">
                <h3 className="card-title text-base md:text-lg">
                  Profile overview
                </h3>
                <p className="text-sm opacity-70 mt-1">
                  This is how your profile appears in the app.
                </p>

                <div className="mt-4 flex flex-col items-center text-center gap-3">
                  <img
                    src={preview}
                    alt="avatar preview"
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border border-base-200 shadow"
                  />
                  <div>
                    <p className="font-semibold text-sm md:text-base">
                      {user.displayName || "Unnamed user"}
                    </p>
                    <p className="text-xs md:text-sm opacity-70 break-all">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="p-3 rounded-xl bg-base-200/70">
                    <p className="font-semibold text-xs uppercase opacity-70">
                      Display name
                    </p>
                    <p className="mt-1 break-words">
                      {name || "Not set yet"}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-base-200/70">
                    <p className="font-semibold text-xs uppercase opacity-70">
                      Photo URL
                    </p>
                    <p className="mt-1 break-words truncate">
                      {photoUrl || "Using default avatar"}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs opacity-70">
                  Prefer privacy? You can leave the photo URL empty to use the
                  default avatar.
                </p>
              </div>
            </div>

            {/* Right: update form */}
            <div className="card bg-base-100 shadow-lg border border-base-200/70">
              <div className="card-body">
                <h3 className="card-title text-base md:text-lg">
                  Edit profile
                </h3>
                <p className="text-sm opacity-70 mt-1">
                  Update your public name and profile picture. Your email
                  address is managed by your authentication provider.
                </p>

                <form onSubmit={onSubmit} className="mt-5 grid gap-4">
                  <div className="form-control grid gap-1">
                    <label className="label" htmlFor="name">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`input input-bordered ${
                        err ? "input-error" : ""
                      }`}
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
                      Paste a direct image link (JPG, PNG, etc.). The avatar
                      preview updates instantly above.
                    </span>
                  </div>

                  {err && (
                    <p className="text-error text-sm mt-1">{err}</p>
                  )}

                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary px-6"
                      disabled={loading}
                    >
                      {loading ? "Updating…" : "Save changes"}
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
        </div>
      </Container>
    </section>
  );
};

export default Profile;
