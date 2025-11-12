import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
// import IssuesCard from "../Components/IssuesCard";
import Container from "../Components/Container";
import IssuesTableCard from "../Components/IssuesTableCard";
import DeleteIssueModal from "./DeleteIssueModal";

const MyIssues = () => {
  const { user } = use(AuthContext);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null); // ← selected issue for modal

  useEffect(() => {
    fetch(
      `https://b12-a10-copy-server.vercel.app/my-issues?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${
            user.accessToken || user?.stsTokenManager?.accessToken
          }`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the fetched data
        setIssues(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching my issues:", error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <div className="max-w-6xl mx-auto py-6">
        <h2 className="text-3xl font-bold text-center mb-6">My Issues</h2>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Category</th>
                <th>Budget</th>
                <th>Status</th>
                <th className="w-56">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.length ? (
                issues.map((issue) => (
                  <IssuesTableCard
                    key={issue._id}
                    issue={issue}
                    onAskDelete={(it) => setToDelete(it)} // ← open modal
                    onDeleted={(id) =>
                      setIssues((prev) => prev.filter((it) => it._id !== id))
                    }
                    onUpdated={(u) =>
                      setIssues((prev) =>
                        prev.map((it) => (it._id === u._id ? u : it))
                      )
                    }
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center opacity-70 py-10">
                    You haven’t submitted any issues yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <DeleteIssueModal
        open={!!toDelete}
        issue={toDelete}
        onClose={() => setToDelete(null)}
        onDeleted={(id) => {
          setIssues((prev) => prev.filter((it) => it._id !== id));
          setToDelete(null);
        }}
      />
    </Container>
  );
};

export default MyIssues;
