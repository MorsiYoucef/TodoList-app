import { ITask } from './types/tasks'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseURL}/tasks`, { cache: 'no-store' })
  const todos = await res.json()
  return todos
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseURL}/tasks`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  const newTodo = await res.json()
  return newTodo
}

export const updateTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseURL}/tasks/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  if (!res.ok) {
    throw new Error(`Failed to update task: ${res.statusText}`)
  }
  const updatedTodo = await res.json()
  return updatedTodo
}

export const deleteTodo = async (id: string): Promise<void> => {
  const res = await fetch(`${baseURL}/tasks/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error(`Failed to delete task: ${res.statusText}`)
  }
}
