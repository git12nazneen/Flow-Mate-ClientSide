import { Link } from 'react-router-dom';
import noData from '../../assets/no-data.mp4'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-white text-gray-800">
      <video 
        src={noData}
        autoPlay 
        loop 
        muted 
        className="w-72 h-72 "
      />
      <h3 className="text-3xl font-semibold mb-4">Oops! Something went wrong...</h3>
      <p className="text-center mb-4">
        It looks like there’s been a bit of a mix-up. Don’t worry, we’re on it!
      </p>
      <p className="text-center">
       Back to the 
        <Link href="/" className="text-blue-600 hover:underline ml-1">FLowMate </Link> 
        to start over. 
      </p>
    </div>
  );
};

export default ErrorPage;
