import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import IssuesCard from "../Components/IssuesCard";
import Container from "../Components/Container";

const MyContribution = () => {
  const { user } = use(AuthContext);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://b12-a10-copy-server.vercel.app/my-contribution?email=${user.email}`,
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
  }, [user]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <div>
        <h2 className="text-3xl font-bold text-center mt-10">My Issues Page</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {issues.map((issue) => (
            <IssuesCard key={issue._id} issue={issue} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MyContribution;
