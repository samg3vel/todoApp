import { Filter, TaskToDo } from "../model/entities";

export const applyFilter = (filter: Filter) => (t: TaskToDo) => {
    let result = filter.status == "A" || filter.status == "D" && !!t.isDone || filter.status == "U" && !t.isDone;

    if (result && filter.search) {
        result = t.summary.toLowerCase().includes(filter.search.toLowerCase())
            || t.description.toLowerCase().includes(filter.search.toLowerCase())
    }

    return result;
}