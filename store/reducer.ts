import { createReducer } from "@reduxjs/toolkit";
import { Filter, TaskToDo } from "../model/entities";
import {
    addAction, updateAction, deleteAction, fillAction, toggleModelAction,
    addEditTaskAction, clearScrollAction, statusFilterAction, searchFilterAction
} from "./actions";

const initialState = {
    toDos: [] as TaskToDo[],
    toggleModel: false,
    updatingTodo: undefined as TaskToDo | undefined,
    filter: { status: "A" } as Filter,
    scrollTaskId: undefined as number | undefined
}

export const todoReducer = createReducer(initialState, builder => {
    builder.addCase(addAction, (state, action) => {
        state.toDos.push({
            ...action.payload,
            isDone: false
        })
        state.scrollTaskId = action.payload.id;
    }).addCase(updateAction, (state, action) => {
        const taskIndex: number = state.toDos.findIndex(td => td.id == action.payload.id);
        state.toDos[taskIndex] = action.payload;
        state.scrollTaskId = taskIndex;
    }).addCase(deleteAction, (state, action) => {
        state.toDos = state.toDos.filter(td => td.id != action.payload);
    }).addCase(fillAction, (state, action) => {
        state.toDos = action.payload;
    }).addCase(toggleModelAction, (state) => {
        state.toggleModel = !state.toggleModel;
    }).addCase(addEditTaskAction, (state, action) => {
        state.updatingTodo = action.payload;
    }).addCase(statusFilterAction, (state, action) => {
        state.filter.status = action.payload;
    }).addCase(searchFilterAction, (state, action) => {
        state.filter.search = action.payload;
    }).addCase(clearScrollAction, (state) => {
        state.scrollTaskId = undefined;
    })
});