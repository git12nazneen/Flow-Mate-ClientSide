import React, { useEffect, useState, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useParams } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { teamName } = useParams();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://flowmate-a-team-collaboration-tool.vercel.app/createTask"
        );
        const data = await response.json();
        setEvents(mapTasksToEvents(data));
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const mapTasksToEvents = (tasks) =>
    tasks.map((task) => ({
      id: task._id,
      title: `${task.taskTitle} - Assigned to: ${task.userName}`,
      start: new Date(task.startDate),
      end: new Date(task.startDate),
      teamName: task.teamName,
    }));

  const filteredEvents = useMemo(
    () => events.filter((e) => e.teamName === teamName),
    [events, teamName]
  );

  return (
    <div>
      <h2 className="bg-white shadow-lg mx-auto py-5 rounded-md  px-7 w-6/12 text-xl font-bold text-gray-700 mb-10 mt-10 text-center">
        {teamName} - Team Calendar
      </h2>

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: "50px ", background: "white" }}
      />
    </div>
  );
};

export default CalendarView;
