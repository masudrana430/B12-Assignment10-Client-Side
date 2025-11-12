import React from "react";
import Banner from "../Components/Banner/Banner";
// import AppData from './AppData';
import Container from "../Components/Container";
import WinterHeroSwiper from "../Components/WinterHeroSwiper";

// If your images are in src/assets, import them like this:
import hero1 from "../assets/Untitled (1).png"; // replace with your own images
import hero2 from "../assets/Untitled__3_-removebg-preview.png";
import hero3 from "../assets/Untitled__2_-removebg-preview.png";

// import LoyalHearts from '../Components/LoyalHearts';
// import ExpertVets from '../Components/ExpertVets';
// import ExtraSection from '../Components/ExtraSection';
import LatestIssues from "./LatestIssues";
import CategorySection from "../Components/CategorySection";
import CommunityStats from "../Components/CommunityStats";
import VolunteerCTA from "../Components/VolunteerCTA";
// import CommunityStats from '../Components/CommunityStats';
// import { data } from 'react-router';
// import CategorySection from '../Components/CategorySection';
// import CommunityStats from '../Components/CommunityStats';

const Home = () => {
  const slides = [
    {
      title: "See It. Report It. Resolve It.",
      subtitle:
        "Snap a photo, add a location, and submit in seconds—your report triggers action.",
      img: hero1,
      cta: "Report an Issue",
      to: "/add-issues",
      badge: "Take Action",
    },
    {
      title: "Track Progress in Your Area",
      subtitle:
        "Browse open and resolved issues, upvote priorities, and follow status updates.",
      img: hero2,
      cta: "View Issues",
      to: "/all-issues",
      badge: "Community Feed",
    },
    {
      title: "Join a Clean-Up Drive",
      subtitle:
        "Volunteer with neighbors to make streets cleaner and safer for everyone.",
      img: hero3,
      cta: "Join Clean Drive",
      to: "/my-contribution",
      badge: "Volunteer",
    },
  ];

  return (
    <div>
      {/* <Banner /> */}

      <Container>
        <WinterHeroSwiper slides={slides} />
        <LatestIssues />
        <CategorySection />
        <CommunityStats
          totals={{ users: 213, resolved: 145, pending: 32 }}
          sinceText="this week"
        />
        <VolunteerCTA />
      </Container>
    </div>
  );
};

export default Home;
