import { Button } from '@/components/ui/button'
import { FaPlus } from 'react-icons/fa'

const AddTask = () => {
  return (
    <div className=" ">
      <Button
        variant="outline"
        className=" bg-black text-white w-full flex gap-2"
      >
        Add Task
        <FaPlus size={15} />
      </Button>
    </div>
  )
}

export default AddTask
