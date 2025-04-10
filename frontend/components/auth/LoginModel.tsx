"use client"
import React from 'react'
import googleimage from '../.././public/images/google.png'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
const LoginModel = () => {

  const handleLogin=()=>{
    signIn("google",{
      callbackUrl:"/dashboard",
      redirect:true
    })
  }
  return (
    <div>
      <Dialog>
  <DialogTrigger asChild><Button>Get started</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-2xl'>Welcome to abhichat</DialogTitle>
      <DialogDescription>
        makes effortless secure chat links.start conversations in seconds
      </DialogDescription>
    </DialogHeader>
    <Button variant={'outline'} onClick={handleLogin}>
        <Image src={googleimage} alt='google' className='mr-4' width={25} height={25}/>
        Continue with Google
    </Button>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default LoginModel
