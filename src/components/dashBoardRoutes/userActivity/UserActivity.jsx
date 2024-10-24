import PageHeader from '@/components/pageHeader/PageHeader';
import React from 'react';
import ActivityChart from '../dashBoardHome/Recharts/ActivityChart';
import SupportiveCard from '../dashBoardHome/SuuportiveCard';
import UserContributionSummary from '../ userContributionSummary/ UserContributionSummary';

const UserActivity = () => {
  return (
    <div>
      <PageHeader title="User Activity" breadcrumb="  Here is some user activity" />
      <div className="flex flex-col justify-between mx-14 my-10 gap-6">
        {/* Visitor Insights Chart */}
        <div className="w-full bg-white rounded-2xl">
          <ActivityChart />
        </div>
        <div className='w-2/4'>
          <UserContributionSummary />

        </div>
        {/* Round Graph */}
        <div className="  w-1/3  ">
          <SupportiveCard />
        </div>
      </div>
    </div>
  );
};

export default UserActivity;