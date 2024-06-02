'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ITask } from '@/types/tasks'
import { useState, FormEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { addTodo, updateTodo, deleteTodo } from '@/api'

interface TodoListProps {
  tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null)
  const [newTaskValue, setNewTaskValue] = useState<string>('')
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null)
  const router = useRouter()

  const handleEditClick = (task: ITask) => {
    setTaskToEdit(task)
    setNewTaskValue(task.text)
    setOpenModalEdit(true)
  }

  const handleDeleteClick = (task: ITask) => {
    setTaskToDelete(task)
    setOpenModalDelete(true)
  }

  const handleSubmitEditTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (taskToEdit) {
      await updateTodo({
        ...taskToEdit,
        text: newTaskValue,
      })
      setOpenModalEdit(false)
      setTaskToEdit(null)
      setNewTaskValue('')
      router.refresh()
    }
  }

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTodo(taskToDelete.id)
      setOpenModalDelete(false)
      setTaskToDelete(null)
      router.refresh()
    }
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>TASKS</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow className=" w-full" key={task.id}>
              <TableCell>{task.text}</TableCell>
              <TableCell className=" flex gap-4 w-full">
                <FaEdit
                  onClick={() => handleEditClick(task)}
                  cursor="pointer"
                  className=" text-blue-500"
                  size={20}
                />

                <FaTrash
                  onClick={() => handleDeleteClick(task)}
                  cursor="pointer"
                  className=" text-red-500"
                  size={20}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Task Modal */}
      <Dialog open={openModalEdit} onOpenChange={setOpenModalEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmitEditTask}>
            <div className="flex w-full  space-x-2">
              <Input
                type="text"
                placeholder="TASK"
                value={newTaskValue}
                onChange={(e) => setNewTaskValue(e.target.value)}
              />
              <Button type="submit">Save Task</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Task Confirmation Modal */}
      <Dialog open={openModalDelete} onOpenChange={setOpenModalDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpenModalDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TodoList
