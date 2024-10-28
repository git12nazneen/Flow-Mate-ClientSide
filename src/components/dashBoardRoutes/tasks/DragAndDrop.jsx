import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { DragDropContext, Droppable, Draggable } from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration';

const DragAndDrop = () => {
  const { teamName } = useLoaderData();
  const axiosCommon = UseAxiosCommon();

  const [taskLists, setTaskLists] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const fetchTasksByStage = async (stage) => {
    if (!teamName) {
      throw new Error("Team name is missing");
    }
    const { data } = await axiosCommon.get(`/createTask/tasksByStage/${teamName}/${stage}`);
    return data;
  };

  // Fetch tasks for each stage using react-query
  const { data: todoTasks = [] } = useQuery({
    queryKey: ["tasks", teamName, "todo"],
    queryFn: () => fetchTasksByStage("todo"),
    enabled: !!teamName,
  });

  const { data: inProgressTasks = [] } = useQuery({
    queryKey: ["tasks", teamName, "inProgress"],
    queryFn: () => fetchTasksByStage("in progress"),
    enabled: !!teamName,
  });

  const { data: completedTasks = [] } = useQuery({
    queryKey: ["tasks", teamName, "completed"],
    queryFn: () => fetchTasksByStage("done"),
    enabled: !!teamName,
  });

  useEffect(() => {
    setTaskLists({
      todo: todoTasks,
      inProgress: inProgressTasks,
      completed: completedTasks,
    });
  }, [todoTasks, inProgressTasks, completedTasks]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceListId = source.droppableId.replace('Tasks', '');
    const destinationListId = destination.droppableId.replace('Tasks', '');

    // Create copies of the source and destination lists
    const sourceList = Array.from(taskLists[sourceListId]);
    const [movedTask] = sourceList.splice(source.index, 1); // Remove the task from the source list
    const destinationList = Array.from(taskLists[destinationListId]);
    destinationList.splice(destination.index, 0, movedTask); // Add the task to the destination list

    // Update the state with the new lists
    setTaskLists(prev => ({
      ...prev,
      [sourceListId]: sourceList,
      [destinationListId]: destinationList,
    }));

    // Update the task's stage in the backend
    if (movedTask?._id) {
      try {
        await axiosCommon.put("/createTask/updateStage", {
          id: movedTask._id,
          newStage: destinationListId,
        });
      } catch (error) {
        console.error("Error updating task stage:", error);
      }
    }
  };

  if (taskLists.todo.length === 0 && taskLists.inProgress.length === 0 && taskLists.completed.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-3 px-5 py-10">
        {['todo', 'inProgress', 'completed'].map((status) => (
          <Droppable droppableId={`${status}Tasks`} key={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-4 w-full bg-white rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </h2>
                {taskLists[status].length === 0 ? (
                  <div className="text-gray-500">No tasks in {status}</div>
                ) : (
                  taskLists[status].map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="p-2 mb-2 bg-gray-100 rounded-md cursor-pointer"
                        >
                          <span className={`text-gray-800 ${task.completed ? "line-through" : ""}`}>
                            {task.taskTitle.slice(0, 50)}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DragAndDrop;
