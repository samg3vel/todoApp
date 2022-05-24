import { TaskToDo } from "../model/entities";
import { IArgs, IEndpoint, EURL, EMETHOD, EARGS, EREQ, ERESP, Methods } from "./types";

export const readBody = (() => {
    const cache = new WeakMap<Response, Promise<unknown>>();
    return (r: Response): Promise<unknown> => {
        if (!cache.has(r)) {
            cache.set(r, r.text().then((text) => {
                let respBodyData;
                if (text) {
                    respBodyData = JSON.parse(text || "null");
                }
                return respBodyData;
            }))
        }
        return cache.get(r)!;
    }
})();

const getUrlQueryParams = (args: IArgs) => args && Object.keys(args).length > 0 ? "?" + new URLSearchParams(args) : ""

export const consumer = <T extends IEndpoint<any, any, any, any, any>>(baseUrl: string) => (url: EURL<T>, method: EMETHOD<T>) => (
    args?: EARGS<T>,
    req?: EREQ<T>
) => {
    const jsonD: any = {
        method,
        headers: {
            Accept: "application/json",
            ["Content-Type"]: "application/json"
        },
        mode: "cors",
    }
    if (["POST", "PUT"].includes(method)) {
        jsonD.body = req ? JSON.stringify(req) : undefined;
    }
    return fetch(baseUrl + url + getUrlQueryParams(args), jsonD).then((response: Response) => {
        if (response.ok) {
            return readBody(response);
        }
    }) as Promise<ERESP<T>>;
}

export const getApis = (baseUrl: string) => {
    return {
        getTodos: consumer<getTodos>(baseUrl)("/api/todo", Methods.GET),
        pushTodos: consumer<pushTodos>(baseUrl)("/api/todo", Methods.POST),
        updateTodos: consumer<updateTodos>(baseUrl)("/api/todo", Methods.PUT),
        deleteTodos: consumer<deleteTodos>(baseUrl)("/api/todo", Methods.DELETE)
    }
}

type getTodos = IEndpoint<"/api/todo", undefined, Methods.GET, {}, { tasksToDo: TaskToDo[] }>
type pushTodos = IEndpoint<"/api/todo", undefined, Methods.POST, { task: TaskToDo }, { task: TaskToDo }>
type updateTodos = IEndpoint<"/api/todo", { id: string }, Methods.PUT, { task: TaskToDo }, { status: boolean }>
type deleteTodos = IEndpoint<"/api/todo", { id: string }, Methods.DELETE, {}, {}>