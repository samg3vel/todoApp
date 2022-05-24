import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export const selectToDos = (state: RootState) => state.toDos;

export const toDoSelector = createSelector(selectToDos, state => state);