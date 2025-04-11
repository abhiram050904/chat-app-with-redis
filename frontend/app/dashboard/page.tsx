import Dashboard from '@/components/dashboard/DashNav'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

  const page = async() => {
    const session:CustomSession|null=await getServerSession(authOptions)
  return (
    <div>
      <Dashboard name={session?.user?.name!} image={session?.user?.image!}/>
    </div>
  )
}

export default page
