import { Box, HStack, SimpleGrid, Tag, useDisclosure } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { AddEditToDo } from '../component/add-edit-todo'
import ToDoHeader from '../component/todo-header'
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getAllTodos } from '../store/actions'
import { selectToDos } from '../store'
import { ToDoCard } from '../component/todo-card'
import { TaskToDo } from '../model/entities'

const Home: NextPage = () => {
  const [Open, setOpen] = useState(false);
  const [task, setTask] = useState<TaskToDo | undefined>();
  const [todos, setTodos] = useState<TaskToDo[]>();
  const [filter, setFilter] = useState<string>("A");
  const todoList = useAppSelector(selectToDos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (todoList.length == 0) {
      dispatch(getAllTodos())
    } else {
      setTodos([...todoList])
    }
  }, [])

  useEffect(() => {
    if (todoList.length > 0) {
      filterTodos(filter);
    }
  }, [todoList])

  const filterTodos = (value: any) => {
    setFilter(value);
    if (value == "U") {
      setTodos(todoList.filter(t => !t.isDone));
    }
    else if (value == "D") {
      setTodos(todoList.filter(t => !!t.isDone));
    }
    else {
      setTodos([...todoList])
    }
  }

  const updateTask = (task: TaskToDo) => {
    setTask(task);
    setOpen(true);
  }

  const reset = () => {
    setTask(undefined);
    setOpen(false);
  }

  return (
    <div>
      <Head>
        <title>TodoApp</title>
      </Head>
      <main>
        <ToDoHeader isOpen={Open} onOpen={() => setOpen(true)} filter={filterTodos} />
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 4 }}
          gap={{ base: "4", md: "6", lg: "8" }}
          m="10"
        >
          {todos && todos.map((todo) => (
            <ToDoCard todo={todo} key={todo.id} updateMe={updateTask} />
          ))}
        </SimpleGrid>
        {Open && <AddEditToDo isOpen={Open} onClose={reset} task={task!} />}
      </main>
    </div>
  )
}

export default Home
