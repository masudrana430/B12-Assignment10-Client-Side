import React from 'react';

import Lottie from "lottie-react";
import ErrorAnimation1 from "./../animation/Ai loading model.json";

const LoadingSpinner = () => {
  return (
    <div>
      <Container>
        <Lottie
        animationData={ErrorAnimation1}
        loop={true}
        style={{ width: "400px", height: "400px", margin: "0 auto" }}
      />
      </Container>
    </div>
  );
};

export default LoadingSpinner;