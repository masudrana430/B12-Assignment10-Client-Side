import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import Container from "../Components/Container";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const IssueDetails = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { id } = useParams();

  const { user } = useContext(AuthContext); // ✅ useContext, not framer-motion's use()
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // wait until user is available
    if (!id || !user) return;

    // If you use Firebase, prefer: user.getIdToken().then(token => ...)
    const token = user.accessToken || user?.stsTokenManager?.accessToken;

    const controller = new AbortController();
    const run = async () => {
      try {
        const res = await fetch(
          `https://b12-a10-copy-server.vercel.app/issues/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Use proper Authorization header
              Authorization: `Bearer ${token ?? ""}`,
            },
            signal: controller.signal,
          }
        );

        if (res.status === 401 || res.status === 403) {
          // not authorized -> go to login
          navigate("/auth/login");
          return;
        }
        if (!res.ok) {
          throw new Error(`Failed to load issue: ${res.status}`);
        }

        const data = await res.json();
        setIssue(data?.result ?? null);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching issue details:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, [id, user, navigate]); // ✅ rerun once user loads

  // Router loader state won't reflect this fetch — keep your own loading UI
  if (loading || navigation.state === "loading") {
    return (
      <Container>
        <div className="min-h-[50vh] flex items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </Container>
    );
  }

  if (!issue) {
    return (
      <Container>
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <h2 className="text-xl font-semibold">Issue not found</h2>
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </Container>
    );
  }

  const {
    _id,
    title = "Untitled Issue",
    category = "Uncategorized",
    location = "—",
    description = "No description provided.",
    image,
    amount,
    email = "—",
    date,
  } = issue;

  const idStr =
    typeof _id === "string" ? _id : _id?.$oid ?? _id?.toString?.() ?? "";

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const formattedAmount =
    typeof amount === "number"
      ? new Intl.NumberFormat("en-BD", {
          style: "currency",
          currency: "BDT",
          maximumFractionDigits: 0,
        }).format(amount)
      : amount ?? "—";

  // const onCopyLink = async () => {
  //   try {
  //     await navigator.clipboard.writeText(window.location.href);
  //   } catch (err) {
  //     console.error("Failed to copy link:", err);
  //   }
  // };

  const handleContribute = () => {
    fetch(`https://b12-a10-copy-server.vercel.app/contribution`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.accessToken || user?.stsTokenManager?.accessToken}`,
      },
      body: JSON.stringify({ ...issue, contribute_by: user.email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to contribute");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Contribution successful:", data);
        toast.success("Thank you for your contribution!");
      })
      .catch((error) => {
        console.error("Error contributing:", error);
      });
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-6">
        <button className="btn btn-ghost mb-4" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="card bg-base-100 shadow-xl">
          {image ? (
            <figure className="max-h-[420px] overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </figure>
          ) : null}

          <div className="card-body gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-primary">{category}</span>
              <span className="badge badge-ghost">{formattedDate}</span>
            </div>

            <h1 className="card-title text-2xl sm:text-3xl">{title}</h1>

            <p className="text-base-content/80">{description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-box bg-base-200">
                <p className="text-xs uppercase text-base-content/60">
                  Location
                </p>
                <p className="font-medium">{location}</p>
              </div>
              <div className="p-4 rounded-box bg-base-200">
                <p className="text-xs uppercase text-base-content/60">
                  Suggested Fix Budget
                </p>
                <p className="font-semibold">{formattedAmount}</p>
              </div>
              <div className="p-4 rounded-box bg-base-200">
                <p className="text-xs uppercase text-base-content/60">
                  Reporter
                </p>
                <p className="font-medium">{email}</p>
              </div>
              <div className="p-4 rounded-box bg-base-200">
                <p className="text-xs uppercase text-base-content/60">
                  Issue ID
                </p>
                <p className="font-mono text-sm break-all">{idStr}</p>
              </div>
            </div>

            <div className="card-actions justify-between mt-4">
              <button className="btn btn-outline" onClick={handleContribute}>
                Pay Clean-Up Contribution
              </button>
              <button className="btn btn-primary" onClick={handleContribute}>
                Contribute
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default IssueDetails;
