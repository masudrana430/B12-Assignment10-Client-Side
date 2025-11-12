import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
import Home from "../Pages/Home";

import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
// import ProductsDetails from "../Pages/AppDetails";
// import Installation from "../Pages/Installation";
// import AppDetails from "../Pages/AppDetails";
import LoadingSpinner from "../Components/LoadingSpinner";
import LoadingSpinnerCopy from "../Components/LoadingSpinnercopy";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AuthLayout from "../Layouts/AuthLayout";
import Profile from "../Pages/Profile";
import PrivatRoute from "../Provider/PrivatRoute";

import ForgotPassword from "../Pages/ForgotPassword";
import AddIssues from "../Pages/AddIssues";
import Issues from "../Pages/Issues";
import MyIssues from "../Pages/MyIssues";
import MyContribution from "../Pages/MyContribution";
import AllIssues from "../Pages/AllIssues";
import IssueDetails from "../Pages/IssueDetails";
import UpdateIssueModal from "../Pages/UpdateIssueModal";
// import UpdateIssueModal from "../Pages/UpdateIssueModal";
// import UpdateIssueModal from "../Pages/UpdateIssueModal";
// import UpdateIssueModal from "../Pages/UpdateIssueModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: (
      <div>
        {" "}
        <LoadingSpinnerCopy />{" "}
      </div>
    ),
    children: [
      {
        index: true,
        element: <Home />,
        loader: () =>
          fetch("https://b12-a10-copy-server.vercel.app/latest-issues"),
        errorElement: <ErrorPage />,
      },
      {
        path: "/issues",
        element: <Issues />,
        loader: () => fetch("https://b12-a10-copy-server.vercel.app/issues"),
        errorElement: <ErrorPage />,
      },
      {
        path: "/all-issues",
        element: <AllIssues />,
        loader: () => fetch("https://b12-a10-copy-server.vercel.app/issues"),
        errorElement: <ErrorPage />,
      },
      {
        path: "/my-issues",
        element: (
          <PrivatRoute>
            <MyIssues />
          </PrivatRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://b12-a10-copy-server.vercel.app/issues/${params.id}`),

        errorElement: <ErrorPage />,
      },
      {
        path: "/update-issues/:id",
        element: (
          <PrivatRoute>
            <UpdateIssueModal />
          </PrivatRoute>
        ),

        errorElement: <ErrorPage />,
      },
      {
        path: "/my-contribution",
        element: (
          <PrivatRoute>
            <MyContribution />
          </PrivatRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/add-issues",
        element: (
          <PrivatRoute>
            <AddIssues />
          </PrivatRoute>
        ),
        errorElement: <ErrorPage />,
      },

      {
        path: "/issues-details/:id",
        element: (
          <PrivatRoute>
            <IssueDetails />
          </PrivatRoute>
        ),
        errorElement: <ErrorPage />,
      },

      {
        path: "/*",
        element: <ErrorPage />,
      },
      {
        path: "/my-profile",
        element: <Profile />,
      },

      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
          {
            path: "/auth/forgot",
            element: <ForgotPassword />,
          },
        ],
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <ErrorPage />,
  // }
]);

// console.log(router);

export default router;
