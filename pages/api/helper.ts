import type { TaskToDo } from '../../model/entities'
import fsn from 'fs';

const getToDo = async (): Promise<{ tasksToDo: TaskToDo[] }> => {
    const data = fsn.readFileSync('./data.json', 'utf8')
    return JSON.parse(data) as { tasksToDo: TaskToDo[] }
}

const pushToDo = async (task: TaskToDo): Promise<TaskToDo> => {
    var tasks = await getToDo();
    tasks.tasksToDo.push(task);
    if (tasks.tasksToDo.length > 0) {
        fsn.writeFileSync('./data.json', JSON.stringify(tasks, null, 4));
    }
    return task;
}

const updateToDo = async (id: number, data: TaskToDo): Promise<boolean> => {
    var tasks = await getToDo();
    if (tasks.tasksToDo.some(t => t.id == id)) {
        tasks.tasksToDo = tasks.tasksToDo.map(t => {
            if (t.id == data.id) {
                return data;
            }
            return t;
        })
    }

    if (tasks.tasksToDo.length > 0) {
        fsn.writeFileSync('./data.json', JSON.stringify(tasks, null, 4));
    }
    return true;
}

const deleteToDo = async (data: number): Promise<boolean> => {
    var tasks = await getToDo();
    if (tasks.tasksToDo.some(t => t.id == data)) {
        tasks.tasksToDo = tasks.tasksToDo.filter(t => t.id != data);
    }
    else {
        return false;
    }

    if (tasks.tasksToDo.length > 0) {
        fsn.writeFileSync('./data.json', JSON.stringify(tasks, null, 4));
    }
    return true;
}

export { getToDo, pushToDo, updateToDo, deleteToDo };