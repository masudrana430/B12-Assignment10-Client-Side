import React from 'react';
import Container from '../Components/Container';
import errorImg from '../assets/error-404.png'; 


const ErrorPage = () => {
    return (
        <Container>
            <img
                src={errorImg} 
                alt="404 Error"
                className="mx-auto "
            />
            <h1 className="text-3xl font-bold text-center mt-20">Oops, page not found!</h1>
            <p className="text-center mt-4 text-gray-600">The page you are looking for is not available.</p>
            {/* <Link to="/" className="btn btn-primary">Go back to Home</Link> */}
        </Container>
    );
};

export default ErrorPage;