import { useState } from "react";
import { CardWithForm } from "../projectCard/CardWithForm";

const ProjectCreate = () => {
  const [create, setCreate] = useState(false);

  const toggleCreateProject = () => {
    setCreate(!create);
  };


  // close form
  const closeForm = () => {
    setCreate(false); // Hide the form when the X button is clicked
  };
  return (
    <div>
       <div className="absolute top-16 text-left lg:left-4 left-2 lg:-right-20 m-1 bg-white shadow-lg rounded-md  w-80 z-10">
        {/* Conditionally render the Create board section */}
        {!create && (
          <div
           
            className="p-4 hover:bg-gray-100 cursor-pointer"
          >
           <div  className="flex justify-between">
           <h2 onClick={toggleCreateProject} className="font-bold text-gray-700">📝 Create board</h2> 
           {/* <p onClick={toggleHandler} className="px-2 py-1 rounded-xl border">Close</p> */}
           </div> 
            <p className="text-gray-500 text-sm">
              A board is made up of cards ordered on lists. Use it to manage
              projects, track information, or organize anything.
            </p>
          </div>
        )}

        {/* Conditionally render the CardWithForm component when "Create board" is clicked */}
        {create && (
          <div>
            <CardWithForm closeForm={closeForm} />
          </div>
        )}
       </div>
    </div>
  );
};

export default ProjectCreate;
