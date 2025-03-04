import { DashNav } from './_components/dashNav'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashNav />
      <main className='px-3'>{children}</main>
    </>
  )
}
