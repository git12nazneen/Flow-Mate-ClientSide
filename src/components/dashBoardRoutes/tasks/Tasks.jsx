import PageHeader from "@/components/pageHeader/PageHeader";
import Completed from "./Completed";
// import { CreateTask } from "./CreateTask";
import InProgress from "./InProgress";
import TaskCard from "./TaskCard";
import TodoList from "./TodoList";
import DragAndDrop from "./DragAndDrop";

const Tasks = () => {
  // State for search term and sort order

  return (
    <div>
      <section className="container  mx-auto">
        {/* Header and Create Task Button */}
        <PageHeader
          title=" Here all the tasks"
          breadcrumb="At first create board then create task"
        />
        
        {/* <DragAndDrop /> */}
      
        {/* Filter Component */}
        <div></div>
        {/* Task Cards */}
        <div>
          <TaskCard />
        </div>
      </section>
    </div>
  );
};

export default Tasks;
