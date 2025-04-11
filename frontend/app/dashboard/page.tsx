import Dashboard from '@/components/dashboard/DashNav'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import CreateChat from '@/components/groupchat/CreateChat'
import { fetchChatGroups } from '../fetch/groupFetch'

  const page = async() => {
    const session:CustomSession|null=await getServerSession(authOptions)
    const groups:Array<ChatGroupType> | []=await fetchChatGroups(session?.user?.token!)
    console.log("the groups are",groups)
    return (
    <div>
      <Dashboard name={session?.user?.name!} image={session?.user?.image!}/>
     <div className='container'>
     <div className='flex justify-end mt-10'>
      <CreateChat user={session?.user!}/>
      </div>
     </div>
    </div>
  )
}

export default page
