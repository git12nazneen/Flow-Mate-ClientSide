import PageHeader from '@/components/pageHeader/PageHeader';
import React from 'react';
import ActivityChart from '../dashBoardHome/Recharts/ActivityChart';
import SupportiveCard from '../dashBoardHome/SuuportiveCard';
import UserContributionSummary from '../ userContributionSummary/ UserContributionSummary';
import UpperNavigation from '@/components/admin/elements/upperNavigation/UpperNavigation';

const UserActivity = () => {
  return (
    <div>
      <UpperNavigation />
      <PageHeader title="User Activity" breadcrumb="  Here is some user activity" />
      <div className=' mx-10'>
          <UserContributionSummary />
        </div>
      <div className="flex flex-col justify-between mx-14 my-10 gap-6">
        {/* Visitor Insights Chart */}
        <div className="w-full bg-white rounded-2xl">
          <ActivityChart />
        </div>
        

      </div>
    </div>
  );
};

export default UserActivity;