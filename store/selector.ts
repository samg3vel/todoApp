import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export const selectToDos = (state: RootState) => state.toDos;
export const selectUpdatingTodo = (state: RootState) => state.updatingTodo;
export const selectToggleModel = (state: RootState) => state.toggleModel;

export const toDoSelector = createSelector(selectToDos, state => state);