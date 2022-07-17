

export interface TaskToDo {
    id: number;
    summary: string;
    description: string;
    isDone: boolean;
    percentage: number;
}

export type Filter = { search?: string, status?: "A" | "D" | "U" }