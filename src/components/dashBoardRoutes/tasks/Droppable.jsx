import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({ id, children }) => {
    const { isOver, setNodeRef } = useDroppable({ id });
    const style = {
        backgroundColor: isOver ? "lightgreen" : "lightgray",
        padding: "10px",
        borderRadius: "4px",
        minHeight: "100px",
    };

    return (
        <div ref={setNodeRef} style={style} className="droppable">
            {children}
        </div>
    );
};