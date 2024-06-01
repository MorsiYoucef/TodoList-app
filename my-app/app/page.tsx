import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default function Home() {
  return (
    <div className=" flex justify-center items-center h-screen bg-black text-white">
      <h4 className=" text-2xl">Welcome to recipe app</h4>
      <Link href={'/recipe-list'}>Explore recipe app</Link>
    </div>
  )
}
