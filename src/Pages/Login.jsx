import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";


import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase.config";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const { signIn, setUser } = useContext(AuthContext); // setUser is optional
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const [emailInput, setEmailInput] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [show, setShow] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(""); setToast(null); setLoading(true);

    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      await signIn(email, password);
      setToast({ type: "success", message: "Welcome back! Redirecting…" });
      form.reset();

      navigate(from, { replace: true });
    } catch (error) {
      const map = {
        "auth/invalid-credential": "Invalid email or password.",
        "auth/user-not-found": "No account with that email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/too-many-requests": "Too many attempts, try again later.",
      };

      const msg = map[error.code] || error.message;
      setErr(msg);
      setToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 2500);
    }
  };

  const goToForgot = () => {
    const q = emailInput ? `?email=${encodeURIComponent(emailInput)}` : "";
    navigate(`/auth/forgot${q}`, { state: { email: emailInput } });
  };

  //  Google sign-in
  const handleGoogleSignin = async () => {
    setErr(""); setToast(null); setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // optional:   update context immediately (onAuthStateChanged will also sync)
      setUser?.(result.user);


      setToast({ type: "success", message: "Logged in with Google! Redirecting…" });
      navigate(from, { replace: true });
    } catch (error) {
      const map = {
        "auth/popup-closed-by-user": "Google sign-in popup was closed.",
        "auth/account-exists-with-different-credential":
          "Account exists with a different sign-in method.",
      };
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
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5 ">
        <h2 className="card-title justify-center pt-6">Login to Your Account</h2>

        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input input-bordered"
              placeholder="Email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />

            <label className="label" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                className="input input-bordered w-full"
                placeholder="Password"
                required
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

            {err && <p className="text-error text-sm mt-2">{err}</p>}

            <div>
              <button type="button" className="link link-hover p-0" onClick={goToForgot}>
                Forgot password?
              </button>
            </div>

            <button type="submit" className="btn btn-neutral mt-4" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </button>

            <p className="text-center font-semibold mt-4">or</p>

            {/* make sure this button doesn't submit the form */}
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
              Don&apos;t have an account?{" "}
              <Link to="/auth/register" className="link link-hover text-purple-500">
                Sign up
              </Link>
            </p>
          </fieldset>
        </form>
      </div>

      {toast && (
        <div className="toast toast-top toast-end z-50">
          <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
