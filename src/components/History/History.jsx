import React from 'react'
import person from "../../assets/profile.jpg"
export default function History({image,title}) {
  return (
    <div>
       <div className='w-[70px] h-[70px] mb-1'>
        <img src={image} alt="" className='rounded-[50px] m-auto bord p-[3px] '/>
    </div>
        <p className='text-center text-[13px]'>{title}</p>
    </div>
  )
}