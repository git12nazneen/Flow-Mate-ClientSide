import AboutScrum from '@/components/aboutscrum/AboutScrum';
// import FlowMateService from '@/components/flowMateService/FlowMateService';
import TeamOrganize from '@/components/organize/TeamOrganize';
import OurTeams from './OurTeams';

const AboutPage = () => {


  return (

    <div className="bg-gray-50 py-12">
      <AboutScrum />
      <TeamOrganize />
      <div className=" pt-16
     ">
        <OurTeams />
      </div>
      {/* <FlowMateService/> */}





    </div>
  );
};

export default AboutPage;
