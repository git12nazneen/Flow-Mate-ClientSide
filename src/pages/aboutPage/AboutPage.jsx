import AboutScrum from '@/components/aboutscrum/AboutScrum';
// import FlowMateService from '@/components/flowMateService/FlowMateService';
import TeamOrganize from '@/components/organize/TeamOrganize';
import OurTeams from './OurTeams';

const AboutPage = () => {


  return (

    <div className="bg-gray-50 pt-24">
      <AboutScrum />
      <TeamOrganize />
      {/* <FlowMateService/> */}
      <section className='p-10'>
        {/* <div>Team page show</div>
        <p>hello psuh</p> */}
      </section>
        <OurTeams></OurTeams>



    </div>
  );
};

export default AboutPage;
