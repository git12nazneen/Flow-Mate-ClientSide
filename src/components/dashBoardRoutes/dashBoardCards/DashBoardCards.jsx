import { useNavigate } from "react-router-dom";
import line from '../../../assets/line.png.png'

const DashBoardCards = () => {
  const navigate = useNavigate();

  // Sample card data (could be dynamic or fetched from API)
  const cardData = [
    {
      title: "Total Task",
      count: 50,
      color: "bg-white",
      description: "Tasks assigned to you",
      navigateTo: "/tasks/total",
      icon: "📊",
    },
    {
      title: "Complete Task",
      count: 30,
      color: "bg-white",
      description: "Completed tasks overview",
      navigateTo: "/tasks/complete",
      icon: "✅",
    },
    {
      title: "Task In Progress",
      count: 15,
      color: "bg-white",
      description: "Ongoing tasks you're ",
      navigateTo: "/tasks/in-progress",
      icon: "⚙️",
    },
    {
      title: "Todo's Task",
      count: 5,
      color: "bg-white",
      description: "Upcoming tasks to be done",
      navigateTo: "/tasks/todo",
      icon: "📝",
    },
  ];

  const handleCardClick = (path) => {
    navigate(path); // Navigate to the respective page when a card is clicked
  };
  
  return (
    <div>
      <div className="lg:flex lg:justify-between gap-6 pb-10">
        {cardData[0] && (
          <div className="flex flex-col lg:flex-row lg:w-full lg:justify-between bg-white hover:shadow-md rounded-lg overflow-hidden shadow-lg">
            <div
              onClick={() => handleCardClick(cardData[0].navigateTo)}
              className="lg:ml-8 cursor-pointer text-black p-4 lg:p-6 w-full lg:w-1/2 flex flex-col items-center lg:items-start hover:scale-105 transform transition-transform duration-300"
            >
              <div className="text-sm lg:text-base mb-4 lg:mb-6 font-semibold text-gray-600 text-center lg:text-left">
                {cardData[0].description}
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-2 lg:mb-4 text-center lg:text-left">
                {cardData[0].count}
              </h2>
              <p className="text-lg lg:text-xl text-center lg:text-left">
                {cardData[0].title}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                className="h-40 lg:h-60 w-80 lg:w-96 object-contain"
                src={line}
                alt=""
              />
            </div>
          </div>
        )}
      </div>

 

      {/* show 3 data */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
        {cardData.slice(-3).map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.navigateTo)}
            className={`cursor-pointer ${card.color} text-black rounded-lg shadow-lg p-4 lg:p-6 w-full lg:w-[276px] flex flex-col items-center lg:items-start hover:scale-105 transform transition-transform duration-300 hover:shadow-gray-200`}
          >
            <div className="text-sm mx-auto lg:text-base mb-4 lg:mb-6 font-bold text-gray-600 text-center lg:text-left">
              {card.description}
            </div>
            <h2 className="mx-auto text-4xl lg:text-5xl font-bold mb-2 lg:mb-4 text-center lg:text-left">
              {card.count}
            </h2>
            <p className="text-lg lg:text-xl text-center mx-auto lg:text-left">
              {card.title}
            </p>
          </div>
        ))}
      </div>




    </div>
  );
};

export default DashBoardCards;