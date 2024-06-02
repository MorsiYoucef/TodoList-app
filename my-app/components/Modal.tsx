'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FaPlus } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, FormEventHandler } from 'react'
import { addTodo } from '@/api'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const Modal = () => {
  const [NewTaskValue, setNewTaskValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmitNewTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await addTodo({
      id: uuidv4(),
      text: NewTaskValue,
    })
    setNewTaskValue('')
    setIsOpen(false)
    router.refresh()
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className=" w-full">
          <Button
            variant="outline"
            className=" bg-black text-white w-full flex gap-2"
          >
            Add Task
            <FaPlus className=" ml-4" size={15} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Make changes to your TodoList here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmitNewTask}>
            <div className="flex w-full  space-x-2">
              <Input
                type="text"
                placeholder="TASK"
                value={NewTaskValue}
                onChange={(e) => setNewTaskValue(e.target.value)}
              />
              <Button type="submit">Add Task</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Modal
