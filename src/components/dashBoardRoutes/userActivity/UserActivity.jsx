import PageHeader from '@/components/pageHeader/PageHeader';
import React from 'react';
import ActivityChart from '../dashBoardHome/Recharts/ActivityChart';
import SupportiveCard from '../dashBoardHome/SuuportiveCard';

const UserActivity = () => {
    return (
        <div>
              <PageHeader title="User Activity"  breadcrumb="  Here is some user activity"/>
            <div className="flex lg:flex-row flex-col justify-between mx-14 my-10 gap-6">
        {/* Visitor Insights Chart */}
        <div className="w-2/3 bg-white rounded-2xl">
          <ActivityChart/>
        </div>

        {/* Round Graph */}
        <div className="  w-1/3  ">
          <SupportiveCard/>
        </div>
      </div>
        </div>
    );
};

export default UserActivity;