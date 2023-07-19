import React from 'react'
import person from "../../assets/profile.jpg"
import "./History.css"
export default function History({image,title}) {
  return (
    <div>
       <div className='w-[60px] h-[60px] borderrlinear'>
        <img src={image} alt="" className='rounded-[50%] m-auto'/>
    </div>
        <p className='text-center text-[13px] text-[#000] dark:text-[#fff]'>{title}</p>
    </div>
  )
}