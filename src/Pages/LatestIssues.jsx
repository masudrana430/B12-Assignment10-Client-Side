import React from 'react';
import { useLoaderData } from 'react-router';
import Container from '../Components/Container';
import IssuesCard from '../Components/IssuesCard';



const LatestIssues = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <Container> 
            <div>
                <h2 className="text-3xl font-bold text-center mt-10">Latest Issues</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {data.map((issue) => (
                    <IssuesCard key={issue._id} issue={issue} />

                ))}

              </div>  
            </div>
        </Container>
    );
};

export default LatestIssues;