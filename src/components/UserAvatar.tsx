import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getAvatarName } from '@/lib/getAvatarName'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

interface data{
    image:string | null,
    name:string | null
}
const UserAvatar = ({user}:{user:data}) => {
  return (
    <Popover>
    <PopoverTrigger>
      <Avatar className="w-10 h-10 drop-shadow-accent cursor-pointer">
        <AvatarImage
          src={user?.image as string}
          alt="@shadcn"
        />
        <AvatarFallback>
          {getAvatarName(user?.name as string)}
        </AvatarFallback>
      </Avatar>
    </PopoverTrigger>
    <PopoverContent>
      <p className="semi-bold py-2">{user?.name}</p>
      <div className="p-[0.5px] bg-gray-200"></div>
      <Button onClick={()=>signOut({callbackUrl:"/login"})} variant={"destructive"} className="w-full my-2 cursor-pointer">Logout</Button>
    </PopoverContent>
  </Popover>
  )
}

export default UserAvatar
