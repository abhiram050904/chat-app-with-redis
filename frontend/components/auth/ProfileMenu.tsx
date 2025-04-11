"use client"
import React, { Suspense, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from '../common/UserAvatar'
import dynamic from 'next/dynamic'

const LogoutModal=dynamic(()=>import("../auth/LogoutModel"))

const ProfileMenu = ({name,image}:{name:string,image?:string}) => {
    const [logoutOpen,setLogoutOpen]=useState(false)
    return (
    <div>
        {logoutOpen && <Suspense fallback={<p>Loading...</p>}>
            <LogoutModal open={logoutOpen} setOpen={setLogoutOpen}/>
            </Suspense>}
      <DropdownMenu>
  <DropdownMenuTrigger><UserAvatar name={name} image={image}/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>setLogoutOpen(true)}>LogOut</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    </div>
  )
}

export default ProfileMenu
