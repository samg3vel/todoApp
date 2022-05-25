import { Box, HStack, SimpleGrid, Tag, useDisclosure } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { AddEditToDo } from '../component/add-edit-todo'
import ToDoHeader from '../component/todo-header'
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getAllTodos } from '../store/actions'
import { selectToDos, selectToggleModel, selectUpdatingTodo } from '../store'
import { ToDoCard } from '../component/todo-card'
import { TaskToDo } from '../model/entities'

const useStore = () => {
  const dispatch = useAppDispatch();
  return {
    values: {
      todoList: useAppSelector(selectToDos),
      show: useAppSelector(selectToggleModel),
      updatingTask: useAppSelector(selectUpdatingTodo)
    },
    action: {
      getAllTodos: () => dispatch(getAllTodos())
    }
  }
}

const Home: NextPage = () => {
  const [todos, setTodos] = useState<TaskToDo[]>();
  const [filter, setFilter] = useState<string>("A");
  const { action: { getAllTodos }, values: { todoList, show } } = useStore();

  useEffect(() => {
    if (todoList.length == 0) {
      getAllTodos()
    }
  }, [])

  useEffect(() => {
    if (todoList.length > 0) {
      apply(filter);
    }
  }, [todoList])

  const apply = (value: string) => {
    setFilter(value);
    setTodos(
      value == "U" ? todoList.filter(t => !t.isDone)
        : value == "D" ? todoList.filter(t => !!t.isDone)
          : todoList
    );
  }

  return (
    <div>
      <Head>
        <title>TodoApp</title>
      </Head>
      <main>
        <ToDoHeader apply={apply} />
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 4 }}
          gap={{ base: "4", md: "6", lg: "8" }}
          m="10"
        >
          {todos && todos.map((todo) => (
            <ToDoCard todo={todo} key={todo.id} />
          ))}
        </SimpleGrid>
        {show && <AddEditToDo />}
      </main>
    </div>
  )
}

export default Home
