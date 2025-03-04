'use client'
import { PageTable } from './_components/pageTable'

export default function Dashboard() {
  return (
    <div>
      <div>
        <div className='flex flex-row-reverse mb-4'>
          <button className='btn btn-secondary'>Create Page</button>
        </div>
        <PageTable />
      </div>
    </div>
  )
}
