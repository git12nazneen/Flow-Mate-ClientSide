import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import UseAxiosCommon from '@/hooks/UseAxiosCommon';
import { useSelector } from 'react-redux';

const UserContributionSummary = () => {
  // Get user email from Redux state
  const userEmail = useSelector((state) => state.auth.user?.email);
  const [contributions, setContributions] = useState(null);
  const axiosCommon = UseAxiosCommon();

  useEffect(() => {
    const fetchContributions = async () => {
      if (!userEmail) return; // Prevent API call if userEmail is not available
      try {
        const response = await axiosCommon.get(`/user/contributions/${userEmail}`);
        setContributions(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching contributions:', error);
      }
    };

    fetchContributions();
  }, [userEmail, axiosCommon]);

  // Display a loading message while data is being fetched
  if (!contributions) {
    return <div>Loading...</div>;
  }

  // Prepare data for chart
  const data = {
    labels: ['Tasks Completed', 'Files Uploaded', 'Comments Made'],
    datasets: [{
      data: [
        contributions.tasksCompleted || 0, // Default to 0 if undefined
        contributions.filesUploaded || 0,   // Default to 0 if undefined
        contributions.commentsMade || 0      // Default to 0 if undefined
      ],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  return (
    <div>
      <h2>User Contribution Summary</h2>
      <div style={{ width: '50%', margin: 'auto' }}>
        <Pie data={data} />
      </div>
      <div style={{ width: '50%', margin: 'auto' }}>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default UserContributionSummary;