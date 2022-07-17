import { AnyAction, createAction, ThunkAction } from "@reduxjs/toolkit"
import { TaskToDo } from "../model/entities";
import { getApis } from "./fetch-api";
import { RootState } from "./store";

export const addAction = createAction<TaskToDo>('todo/add');
export const updateAction = createAction<TaskToDo>('todo/update');
export const deleteAction = createAction<number>('todo/delete');
export const fillAction = createAction<TaskToDo[]>('todo/fill');
export const statusFilterAction = createAction<"A" | "U" | "D">('filter/status');
export const searchFilterAction = createAction<string | undefined>('filter/search');
export const toggleModelAction = createAction('toggleModel');
export const addEditTaskAction = createAction<TaskToDo | undefined>('updatingTodo');
export const clearScrollAction = createAction<undefined>('scrollTId');
const URL: string = "http://localhost:3000";


export const postTodos = (task: TaskToDo): ThunkAction<void, RootState, undefined, AnyAction> => async (dispatch, getState) => {
    const { toDos } = getState();
    task.id = toDos.length > 0 ? Math.max(...toDos.map(t => t.id)) + 1 : 1;

    const api = getApis(URL);
    const { task: resultTask } = await api.pushTodos(undefined, { task })
    if (resultTask) {
        dispatch(addAction(task));
    }
}

export const updateTodos = (task: TaskToDo): ThunkAction<void, RootState, undefined, AnyAction> => async (dispatch) => {

    const api = getApis(URL);
    const { status } = await api.updateTodos({
        id: String(task.id)
    }, { task })
    if (status) {
        dispatch(updateAction(task));
    }
}

export const deleteTodos = (id: number): ThunkAction<void, RootState, undefined, AnyAction> => async (dispatch) => {

    const api = getApis(URL);
    const { status } = await api.deleteTodos({ id: String(id) });
    if (status) {
        dispatch(deleteAction(id));
    }
}

export const updateTodoModel = (task: TaskToDo): ThunkAction<void, RootState, undefined, AnyAction> => (dispatch) => {
    dispatch(toggleModelAction());
    dispatch(addEditTaskAction(task));
}