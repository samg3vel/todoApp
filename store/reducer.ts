import { createReducer } from "@reduxjs/toolkit";
import { Filter, TaskToDo } from "../model/entities";
import { addAction, updateAction, deleteAction, fillAction, toggleModelAction, addEditTaskAction, applyFilterAction } from "./actions";

const initialState = {
    toDos: [] as TaskToDo[],
    toggleModel: false,
    updatingTodo: undefined as TaskToDo | undefined,
    filter: Filter.All
}

export const todoReducer = createReducer(initialState, builder => {
    builder.addCase(addAction, (state, action) => {
        state.toDos.push({
            ...action.payload,
            isDone: false
        })
    }).addCase(updateAction, (state, action) => {
        const taskIndex: number = state.toDos.findIndex(td => td.id == action.payload.id);
        state.toDos[taskIndex] = action.payload;
    }).addCase(deleteAction, (state, action) => {
        state.toDos = state.toDos.filter(td => td.id != action.payload);
    }).addCase(fillAction, (state, action) => {
        state.toDos = action.payload;
    }).addCase(toggleModelAction, (state, action) => {
        state.toggleModel = !state.toggleModel;
    }).addCase(addEditTaskAction, (state, action) => {
        state.updatingTodo = action.payload;
    }).addCase(applyFilterAction, (state, action) => {
        state.filter = action.payload;
    })
});