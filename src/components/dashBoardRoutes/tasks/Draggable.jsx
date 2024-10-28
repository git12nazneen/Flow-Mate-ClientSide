// src/components/dashBoardRoutes/tasks/Draggable.jsx
import React from "react";

export const Draggable = ({ id, children }) => (
    <div id={id} className="p-2 mb-2 bg-blue-100 rounded-md cursor-pointer">
        {children}
    </div>
);
