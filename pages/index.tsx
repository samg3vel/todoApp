import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { fillAction } from '../store/actions'
import { ToDoHeader, TodoGrid } from '../component'
import { getApis } from '../store/fetch-api'
import { TaskToDo } from '../model/entities'

export async function getServerSideProps() {
  const URL: string = "http://localhost:3000";
  const api = getApis(URL);
  const { tasksToDo } = await api.getTodos()
  return { props: { data: tasksToDo } }
}

const Home: NextPage<{ data: TaskToDo[] }> = ({ data }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(fillAction(data));
    }
  }, [data])

  return (
    <div>
      <Head>
        <title>TodoApp</title>
      </Head>
      <main>
        <ToDoHeader />
        <TodoGrid />
      </main>
    </div>
  )
}

export default Home
