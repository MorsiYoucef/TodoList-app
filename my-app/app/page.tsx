import { getAllTodos } from '@/api'
import AddTask from '@/components/AddTask'
import TodoList from '@/components/TodoList'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default async function Home() {
  const tasks = await getAllTodos()
  console.log(tasks)
  return (
    <div className=" max-w-4xl mx-auto mt-4">
      <div className=" text-center my-5 flex flex-col gap-4">
        <h1>Todo List App</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </div>
  )
}
