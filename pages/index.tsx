import { Box, HStack, SimpleGrid, Tag, useDisclosure } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { AddEditToDo } from '../component/add-edit-todo'
import ToDoHeader from '../component/todo-header'
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getAllTodos } from '../store/actions'
import { selectFilter, selectToDos, selectToggleModel, selectUpdatingTodo } from '../store'
import { ToDoCard } from '../component/todo-card'
import { Filter, TaskToDo } from '../model/entities'

const useStore = () => {
  const dispatch = useAppDispatch();
  return {
    values: {
      todoList: useAppSelector(selectToDos),
      show: useAppSelector(selectToggleModel),
      filter: useAppSelector(selectFilter)
    },
    action: {
      getAllTodos: () => dispatch(getAllTodos())
    }
  }
}

const Home: NextPage = () => {
  const [todos, setTodos] = useState<TaskToDo[]>();
  const { action: { getAllTodos }, values: { todoList, show, filter } } = useStore();

  useEffect(() => {
    if (todoList.length == 0) {
      getAllTodos()
    }
  }, [])

  useEffect(() => {
    if (todoList.length > 0) {
      setTodos(
        filter == Filter.Undone ? todoList.filter(t => !t.isDone)
          : filter == Filter.Done ? todoList.filter(t => !!t.isDone)
            : todoList
      );
    }
  }, [todoList, filter])

  return (
    <div>
      <Head>
        <title>TodoApp</title>
      </Head>
      <main>
        <ToDoHeader />
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
