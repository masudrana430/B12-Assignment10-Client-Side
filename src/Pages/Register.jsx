import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";

// ⬇️ NEW: Google sign-in imports + initialized auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase.config";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const [toast, setToast] = useState(null);
  const [show, setShow] = useState(false);

  const validatePassword = (pwd) => {
    const issues = [];
    if (pwd.length < 6) issues.push("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(pwd))
      issues.push("Must include an uppercase letter (A-Z).");
    if (!/[a-z]/.test(pwd))
      issues.push("Must include a lowercase letter (a-z).");
    return issues;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");
    setPwdErr("");
    setToast(null);

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const photoUrl = form.photoUrl.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    const issues = validatePassword(password);
    if (issues.length) {
      const msg = issues.join(" ");
      setPwdErr(msg);
      setToast({ type: "error", message: msg });
      return;
    }

    try {
      setLoading(true);
      await createUser(email, password);
      await updateUser({ displayName: name, photoURL: photoUrl }); // sync name+photo

      setToast({ type: "success", message: "Account created! Redirecting…" });
      form.reset();
      navigate("/", { replace: true });
    } catch (error) {
      const map = {
        "auth/email-already-in-use": "Email already in use.",
        "auth/invalid-email": "Invalid email address.",
        "auth/operation-not-allowed": "Email/password accounts are disabled.",
        "auth/weak-password": "Password is too weak.",
      };
      const msg = map[error.code] || error.message;
      setErr(msg);
      setToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 2500);
    }
  };

  // ⬇️ NEW: Google sign-in handler
  const handleGoogleSignin = async () => {
    setErr("");
    setToast(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged in your AuthProvider will update context automatically
      setToast({
        type: "success",
        message: "Signed up with Google! Redirecting…",
      });
      navigate("/", { replace: true });
    } catch (error) {
      const map = {
        "auth/popup-closed-by-user": "Google sign-in popup was closed.",
        "auth/account-exists-with-different-credential":
          "Account exists with a different sign-in method.",
      };
      if (error.code === "auth/email-already-in-use") {
        toast.error({
          type: "info",
          message: "Email already in use. Try logging in.",
        });
        return;
      }
      const msg = map[error.code] || error.message;
      setErr(msg);
      setToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 2500);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="card-title justify-center pt-6">
          Register Your Account
        </h2>

        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="input input-bordered"
              placeholder="Name"
              required
            />

            <label className="label" htmlFor="photoUrl">
              Photo URL
            </label>
            <input
              id="photoUrl"
              name="photoUrl"
              type="url"
              className="input input-bordered"
              placeholder="https://example.com/me.jpg"
            />

            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input input-bordered"
              placeholder="you@example.com"
              required
            />

            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                className={`input input-bordered w-full ${
                  pwdErr ? "input-error" : ""
                }`}
                placeholder="Password"
                required
                aria-invalid={!!pwdErr}
                aria-describedby={pwdErr ? "password-help" : undefined}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {pwdErr && (
              <p id="password-help" className="text-error text-sm mt-1">
                {pwdErr}
              </p>
            )}
            {err && <p className="text-error text-sm mt-2">{err}</p>}

            <button
              type="submit"
              className="btn btn-neutral mt-4"
              disabled={loading}
            >
              {loading ? "Creating…" : "Register"}
            </button>

            <div className="divider my-4">or</div>

            {/* ⬇Google Sign-up button */}
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="btn bg-white text-black border-[#e5e5e5] gap-2"
              disabled={loading}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 533.5 544.3"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M533.5 278.4c0-17.6-1.6-35.5-4.9-52.5H272v99.5h146.9c-6.3 34-25.4 62.8-54.1 82v68h87.4c51.2-47.2 81.3-116.7 81.3-197z"
                />
                <path
                  fill="#34A853"
                  d="M272 544.3c73.6 0 135.3-24.3 180.4-66.9l-87.4-68c-24.3 16.4-55.3 26-93 26-71.5 0-132.2-48.3-153.9-113.3H27.1v71.2c45.1 89.4 137.7 150.9 244.9 150.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M118.1 322.1c-10.9-32.6-10.9-67.9 0-100.5V150.4H27.1c-39.1 77.9-39.1 170.1 0 248l91-71.3z"
                />
                <path
                  fill="#EA4335"
                  d="M272 107.7c40 0 76.2 13.8 104.7 40.9l78.5-78.5C407.1 24.7 345.5 0 272 0 164.8 0 72.2 61.6 27.1 150.4l91 71.2C139.9 156 200.6 107.7 272 107.7z"
                />
              </svg>
              Continue with Google
            </button>

            <p className="text-center font-semibold mt-4">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="link link-hover text-[#632EE3]"
              >
                Log in
              </Link>
            </p>
          </fieldset>
        </form>
      </div>

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
  );
};

export default Register;
