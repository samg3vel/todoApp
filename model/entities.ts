

export interface TaskToDo {
    id: number;
    summary: string;
    description: string;
    isDone: boolean;
    percentage: number;
}

export enum Filter {
    All,
    Done,
    Undone
}