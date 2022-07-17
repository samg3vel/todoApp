import { SimpleGrid } from "@chakra-ui/react";
import { useRef } from "react";
import {
    useAppDispatch, useAppSelector, selectToDos,
    selectToggleModel, selectFilter,
    selectScroll, fillAction, clearScrollAction
} from "../store";
import { AddEditToDo } from "./add-edit-todo";
import { LightAnimatedBackground } from "./light-animation";
import { ToDoCard } from "./todo-card";
import { applyFilter } from "./util";

const useStore = () => {
    const dispatch = useAppDispatch();
    return {
        values: {
            todoList: useAppSelector(selectToDos),
            show: useAppSelector(selectToggleModel),
            filter: useAppSelector(selectFilter),
            newTask: useAppSelector(selectScroll)
        },
        action: {
            clearScroll: () => dispatch(clearScrollAction())
        }
    }
}

export const TodoGrid: React.FC = () => {
    const { action: { clearScroll }, values: { todoList, show, filter, newTask } } = useStore();
    const todoRefs = useRef<any>({})

    return <>
        <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4 }}
            gap={{ base: "4", md: "6", lg: "8" }}
            m="10"
        >
            {todoList && todoList.filter(applyFilter(filter)).map((todo) => {
                if (newTask && newTask == todo.id) {
                    setTimeout(() => {
                        todoRefs.current[todo.id].scrollIntoView({ behavior: "smooth", block: "start" });
                        clearScroll();
                    }, 0);
                }
                return <ToDoCard todo={todo} key={todo.id} ref={(ele => todoRefs.current[todo.id] = ele)} />
            })}
        </SimpleGrid>
        <LightAnimatedBackground />
        {show && <AddEditToDo />}
    </>
}