import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (email) => {
        const res = await fetch(`https://flowmate-a-team-collaboration-tool.vercel.app/createTask?email=${email}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        draggedTask: null, // New state for the dragged task
        status: 'idle',
        error: null,
    },
    reducers: {
        updateTask: (state, action) => {
            const { id, stage } = action.payload;
            const task = state.tasks.find((task) => task._id === id);
            if (task) {
                task.stage = stage; // Update the task stage
            }
        },
        setDraggedTask: (state, action) => {
            state.draggedTask = action.payload; // Set the dragged task
        },
        setTasks: (state, action) => {
            state.tasks = action.payload; // Set tasks to the state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload; // Save the fetched tasks
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Save error message
            });
    },
});

export const { updateTask, setDraggedTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
