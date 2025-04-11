import Image from 'next/image'
import React from 'react'
import image from '../public/images/404.svg'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const Notfound = () => {
  return (
    <div className='h-screen flex justify-center items-center flex-col'>
      <Image src={image} alt='404' width={500} height={500}/>
      <Link href='/'>
      <Button>Back to Home</Button>
      </Link>
    </div>
  )
}

export default Notfound
