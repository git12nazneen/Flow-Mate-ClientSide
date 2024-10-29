import PageHeader from "@/components/pageHeader/PageHeader";
import Completed from "./Completed";
// import { CreateTask } from "./CreateTask";
import InProgress from "./InProgress";
import TaskCard from "./TaskCard";
import TodoList from "./TodoList";

const Tasks = () => {
  // State for search term and sort order

  return (
    <div>
      <section className="container  mx-auto">
        {/* Header and Create Task Button */}
       
          <PageHeader title=" Here all the tasks"  breadcrumb="At first create board then create task"/>

        {/* Task Lists (Todo, InProgress, Completed) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-3 px-5 py-10">
          <div>
            <TodoList />
          </div>
          <div>
            <InProgress />
          </div>
          <div>
            <Completed />
          </div>
        </div>

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
