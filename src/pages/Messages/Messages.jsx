import React from "react";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

import prof from "../../assets/profile.jpg"
import msg from "../../assets/profile.jpg"

export default function Messages() {
  return (
    <div className="w-[100%] sm:pt-8 lg:pt-0 overflow-hidden">
      <div className="w-full flex">
        <div className="w-[100%] lg:ml-[16%] sm:ml-0 flex">
            <div className="w-[20%] sm:w-[100%] lg:border-r sticky left-[-500px]">
                <div className="px-6 flex justify-between items-center py-6">
                    <p className="text-[24px] font-[600]">idibek_02</p>
                    <EditCalendarIcon sx={{fontSize: "28px"}}/>
                </div>

                <div className="flex px-6 justify-between pb-2">
                    <p className="font-[600]">Messages</p>
                    <p className="text-[#5f5f5f]">Requests</p>
                </div>

                <div className="overflow-x-hidden overflow-y-auto h-screen">
                <div className="py-[8px] cursor-pointer hover:bg-[#f4f4f4]">
                    <div className="flex gap-[20px] items-center px-6">
                        <img src={prof} alt="" className="w-[60px] h-[60px] rounded-[50%]"/>
                        <div>
                            <p>idibek_02</p>
                            <p className="text-[#888888]">idibek_02</p>
                        </div>
                    </div>
                </div>
                <div className="py-[8px] cursor-pointer hover:bg-[#f4f4f4]">
                    <div className="flex gap-[20px] items-center px-6">
                        <img src={prof} alt="" className="w-[60px] h-[60px] rounded-[50%]"/>
                        <div>
                            <p>idibek_02</p>
                            <p className="text-[#888888]">idibek_02</p>
                        </div>
                    </div>
                </div>
                <div className="py-[8px] cursor-pointer hover:bg-[#f4f4f4]">
                    <div className="flex gap-[20px] items-center px-6">
                        <img src={prof} alt="" className="w-[60px] h-[60px] rounded-[50%]"/>
                        <div>
                            <p>idibek_02</p>
                            <p className="text-[#888888]">idibek_02</p>
                        </div>
                    </div>
                </div>
                <div className="py-[8px] cursor-pointer hover:bg-[#f4f4f4]">
                    <div className="flex gap-[20px] items-center px-6">
                        <img src={prof} alt="" className="w-[60px] h-[60px] rounded-[50%]"/>
                        <div>
                            <p>idibek_02</p>
                            <p className="text-[#888888]">idibek_02</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="flex sm:hidden justify-end items-center w-[50%] h-screen">
                <div className=" text-center">
                    <img src={msg} alt="" className=" m-auto w-[100px] pb-2 rounded-[50%]"/>
                    <p className="text-[20px]">Ваши сообщения</p>
                    <p className="py-[10px] text-[#959595]">Отправляйте личные фото и сообщения другу или группе</p>
                    <button className="text-[#fff] px-[15px] py-[5px] bg-[#0095F6] rounded-[5px]">Отправить сообщение</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}