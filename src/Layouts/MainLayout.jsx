import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Container from "../Components/Container";
import useApps from "../hooks/useApps";
import LoadingSpinnerCopy from "../Components/LoadingSpinnercopy";
import AOS from "aos";

const MainLayout = () => {
  const { loading } = useApps();
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 60 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className="flex min-h-dvh flex-col bg-base-100 text-base-content">
      <header className="sticky top-0 z-50 backdrop-blur bg-base-100 border-b border-base-200">
        <Container>
          <Navbar />
        </Container>
      </header>

      <main id="main" className="flex-1">
        {loading ? <LoadingSpinnerCopy /> : <Outlet />}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
