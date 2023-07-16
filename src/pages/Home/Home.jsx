import "./Home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Keyboard, Pagination, Navigation } from "swiper/modules";
import person from "../../assets/profile.jpg";
import person2 from "../../assets/2.jpg";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Checkbox from "@mui/material/Checkbox";
import videoFrilancer from "../../assets/028. FLEXBOX.....mp4";
const Home = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [open, setOpen] = React.useState(false);
  const [mutedd, setMutedd] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="">
      <div className="w-full fixed top-0 left-0 py-[5px] bg-[#fff] dark:bg-[#000] hidden z-20 px-[20px] md:flex items-center justify-between border-b border-[#c7c7c7] dark:border-[#2b2b2b] smm:py-[10px]">
        <h1 className="text-[#000] dark:text-[#FFF] text-[25px] smm:hidden hidden dark:block">
              <svg
                aria-label="Instagram"
                class="_ab6-"
                color="rgb(245, 245, 245)"
                fill="rgb(245, 245, 245)"
                height="29"
                role="img"
                viewBox="32 4 113 32"
                width="103"
              >
                <path
                  clip-rule="evenodd"
                  d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </h1>
            <h1 className="text-[#000] dark:text-[#FFF] text-[25px] smm:hidden block dark:hidden">
              <svg
                aria-label="Instagram"
                class="_ab6-"
                color="#000"
                fill="#000"
                height="29"
                role="img"
                viewBox="32 4 113 32"
                width="103"
              >
                <path
                  clip-rule="evenodd"
                  d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </h1>
        <div className="flex items-center gap-x-[20px]">
          <div className="bg-[#e4e4e4]  dark:bg-[#262626] flex items-center rounded-[5px] w-[268px] overflow-hidden">
            <h1 className="text-[#000] dark:text-[#000] text-[25px] px-[10px]">
              <svg
                aria-label="Поиск"
                class="x1lliihq x1n2onr6"
                color="rgb(142, 142, 142)"
                fill="rgb(142, 142, 142)"
                height="16"
                role="img"
                viewBox="0 0 24 24"
                width="16"
              >
                <title>Поиск</title>
                <path
                  d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></path>
                <line
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  x1="16.511"
                  x2="22"
                  y1="16.511"
                  y2="22"
                ></line>
              </svg>
            </h1>
            <input
              type="text"
              className="py-[8px] px-[10px] w-full bg-[#e4e4e4] dark:bg-[#262626] outline-none text-[#000] dark:text-[#000] placeholder:text-[#ABABAB]"
              placeholder="Поиск"
            />
          </div>
          <div className="flex items-center justify-center">
                    <div>
                      <div className="hidden dark:block">
                      <svg
                    aria-label="Уведомления"
                    class="x1lliihq x1n2onr6"
                    color="rgb(245, 245, 245)"
                    fill="rgb(245, 245, 245)"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Уведомления</title>
                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                  </svg>
                      </div>
                      <div className="dark:hidden">
                      <svg
                    aria-label="Уведомления"
                    class="x1lliihq x1n2onr6"
                    color="#000"
                    fill="#000"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Уведомления</title>
                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                  </svg>
                      </div>
                    </div>
                    </div>
        </div>
      </div>
      <div className="max-w-[1000px] mx-auto pt-[30px] md:pt-[50px] flex justify-between  bg-[#fff] dark:bg-[#000]">
        <div className="py-[20px] w-[80%] idi:mx-auto sm:w-full">
          <div className="stories w-[85%] px-[10px] sm:w-full mx-auto relative overflow-x-scroll flex items-center gap-x-[20px]">
            <div className=" ">
              <div className="w-[60px] h-[60px] rounded-[50%] border-2 overflow-hidden person">
                <img src={person} alt="" className="border-[50%]" />
              </div>
              <h1 className="text-[12px] font-[500] text-[#000] dark:text-[#F5F5F5] pt-[5px]">
                idibek_02
              </h1>
            </div>

            <div className=" ">
              <div className="w-[60px] h-[60px] rounded-[50%] border-2 overflow-hidden person">
                <img src={person} alt="" />
              </div>
              <h1 className="text-[12px] font-[500] text-[#000] dark:text-[#F5F5F5] pt-[5px]">
                idibek_02
              </h1>
            </div>
            <div className=" ">
              <div className="w-[60px] h-[60px] rounded-[50%] border-2 overflow-hidden person">
                <img src={person} alt="" />
              </div>
              <h1 className="text-[12px] font-[500] text-[#000] dark:text-[#F5F5F5] pt-[5px]">
                idibek_02
              </h1>
            </div>
          </div>
          <div className="post w-[100%] py-[20px] flex flex-col gap-y-[20px] relative justify-center items-center">
            <div className="grid grid-cols-1 gap-y-[20px]">
              <div className="max-w-[500px] mx-auto sm:w-full">
                <div className="flex items-center justify-between sm1:px-[10px]">
                  <div className="flex items-center gap-x-[15px]">
                    <div className="w-[32px] h-[32px] rounded-[50%]">
                      <img src={person} alt="" className="rounded-[50%]" />
                    </div>
                    <div className="flex items-center gap-x-[10px]">
                      <h1 className="text-[#000] dark:text-[#FFF] font-[500]">
                        idibek_02
                      </h1>
                      <span className="text-[30px] text-[#A8A8A8]">•</span>
                      <span className="text-[#A8A8A8]">17 ч.</span>
                    </div>
                  </div>
                  <div
                    onClick={handleClickOpen}
                    className="cursor-pointer hidden dark:block"
                  >
                    <svg
                      aria-label="Дополнительно"
                      class="_ab6-"
                      color="rgb(255, 255, 255)"
                      fill="rgb(255, 255, 255)"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <circle cx="12" cy="12" r="1.5"></circle>
                      <circle cx="6" cy="12" r="1.5"></circle>
                      <circle cx="18" cy="12" r="1.5"></circle>
                    </svg>
                  </div>
                  <div
                    onClick={handleClickOpen}
                    className="cursor-pointer dark:hidden"
                  >
                    <svg
                      aria-label="Дополнительно"
                      class="_ab6-"
                      color="#000"
                      fill="#000"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <circle cx="12" cy="12" r="1.5"></circle>
                      <circle cx="6" cy="12" r="1.5"></circle>
                      <circle cx="18" cy="12" r="1.5"></circle>
                    </svg>
                  </div>
                </div>
                <div className="pt-[10px] relative">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    style={{ borderRadius: "3px" }}
                    keyboard={{
                      enabled: true,
                    }}
                    // pagination={{
                    //   clickable: true,
                    // }}
                    // navigation={true}
                    // modules={[Keyboard, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    <SwiperSlide className="w-full">
                      <div
                        onClick={() => setMutedd(!mutedd)}
                        className="flex items-center justify-center"
                      >
                        {/* <img src={person} alt="" className="w-full" /> */}
                        {mutedd ? (
                          <video src={videoFrilancer} autoPlay muted></video>
                        ) : (
                          <video src={videoFrilancer} autoPlay></video>
                        )}
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="flex items-center justify-between sm1:px-[10px]">
                  <div className="flex items-center gap-x-[5px] py-[5px]">
                    <Checkbox
                      {...label}
                      icon={
                        <div>
                          <div className="hidden dark:block">
                            <svg
                              aria-label="Нравится"
                              class="x1lliihq x1n2onr6"
                              color="rgb(245, 245, 245)"
                              fill="rgb(245, 245, 245)"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Нравится</title>
                              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                            </svg>
                          </div>
                          <div className="dark:hidden">
                            <svg
                              aria-label="Нравится"
                              class="x1lliihq x1n2onr6"
                              color="#000"
                              fill="#000"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Нравится</title>
                              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                            </svg>
                          </div>
                        </div>
                      }
                      checkedIcon={
                        <svg
                          aria-label="Не нравится"
                          class="x1lliihq x1n2onr6"
                          color="rgb(255, 48, 64)"
                          fill="rgb(255, 48, 64)"
                          height="24"
                          role="img"
                          viewBox="0 0 48 48"
                          width="24"
                        >
                          <title>Не нравится</title>
                          <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                      }
                    />
                    <button className="dark:hidden">
                      <svg
                        aria-label="Комментировать"
                        class="x1lliihq x1n2onr6"
                        color="#000"
                        fill="#000"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Комментировать</title>
                        <path
                          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </svg>
                    </button>
                    <button className="hidden dark:block">
                      <svg
                        aria-label="Комментировать"
                        class="x1lliihq x1n2onr6"
                        color="rgb(245, 245, 245)"
                        fill="rgb(245, 245, 245)"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Комментировать</title>
                        <path
                          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </svg>
                    </button>
                    <button className="px-[8px] dark:hidden">
                      <svg
                        aria-label="Поделиться публикацией"
                        class="x1lliihq x1n2onr6"
                        color="#000"
                        fill="#000"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Поделиться публикацией</title>
                        <line
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          x1="22"
                          x2="9.218"
                          y1="3"
                          y2="10.083"
                        ></line>
                        <polygon
                          fill="none"
                          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></polygon>
                      </svg>
                    </button>
                    <button className="px-[8px] hidden dark:block">
                      <svg
                        aria-label="Поделиться публикацией"
                        class="x1lliihq x1n2onr6"
                        color="rgb(245, 245, 245)"
                        fill="rgb(245, 245, 245)"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Поделиться публикацией</title>
                        <line
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          x1="22"
                          x2="9.218"
                          y1="3"
                          y2="10.083"
                        ></line>
                        <polygon
                          fill="none"
                          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></polygon>
                      </svg>
                    </button>
                  </div>
                  <div>
                    <Checkbox
                      {...label}
                      icon={
                        <div>
                          <div className="hidden dark:block">
                            <svg
                              aria-label="Сохранить"
                              class="x1lliihq x1n2onr6"
                              color="rgb(245, 245, 245)"
                              fill="rgb(245, 245, 245)"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Сохранить</title>
                              <polygon
                                fill="none"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              ></polygon>
                            </svg>
                          </div>
                          <div className="dark:hidden">
                            <svg
                              aria-label="Сохранить"
                              class="x1lliihq x1n2onr6"
                              color="#000"
                              fill="#000"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Сохранить</title>
                              <polygon
                                fill="none"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              ></polygon>
                            </svg>
                          </div>
                        </div>
                      }
                      checkedIcon={
                        <div>
                          <div className="hidden dark:block">
                            <svg
                              aria-label="Сохранить"
                              class="x1lliihq x1n2onr6"
                              color="rgb(245, 245, 245)"
                              fill="rgb(245, 245, 245)"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Сохранить</title>
                              <polygon
                                fill="rgb(245, 245, 245)"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              ></polygon>
                            </svg>
                          </div>
                          <div className="dark:hidden">
                            <svg
                              aria-label="Сохранить"
                              class="x1lliihq x1n2onr6"
                              color="#000"
                              fill="#000"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Сохранить</title>
                              <polygon
                                fill="#00"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              ></polygon>
                            </svg>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className="sm1:px-[10px]">
                  <h1 className="text-[#000] dark:text-[#FFF] font-[600] py-[10px]">
                    417 отметок "Нравится"
                  </h1>
                </div>
                <div className="description sm1:px-[15px] text-[#000] dark:text-[#FFF] flex items-center gap-x-[10px] leading-[15px]">
                  <h1>idibek_02 </h1>
                  <span className="text-[30px] text-[#A8A8A8]">•</span>
                  <p>Лайк ...</p>
                </div>
                <div className="sm1:px-[10px]">
                  <button className="text-[#7F7F7F]">ещё</button>
                </div>
                <div>
                  <h1 className="text-[#7F7F7F] sm1:px-[10px]">
                    Посмотреть все комментарии (42)
                  </h1>
                </div>
                <div className="py-[5px] sm1:px-[10px]">
                  <input
                    placeholder="Добавьте комментариий..."
                    className="pb-[15px] w-full text-[14px] outline-none bg-transparent text-[#000] dark:text-[#F5F5F5] placeholder:text-[#7F7F7F] placeholder:text-[14px] border-b border-[#262626]"
                  ></input>
                </div>
              </div>
              <div className="max-w-[500px] mx-auto sm:w-full ">
                <div className="flex items-center justify-between sm1:px-[10px]">
                  <div className="flex items-center gap-x-[15px]">
                    <div className="w-[32px] h-[32px] rounded-[50%]">
                      <img src={person} alt="" className="rounded-[50%]" />
                    </div>
                    <div className="flex items-center gap-x-[10px]">
                      <h1 className="text-[#000] dark:text-[#FFF] font-[500]">
                        idibek_02
                      </h1>
                      <span className="text-[30px] text-[#A8A8A8]">•</span>
                      <span className="text-[#A8A8A8]"> 17 ч.</span>
                    </div>
                  </div>
                  <div
                    onClick={handleClickOpen}
                    className="cursor-pointer hidden dark:block"
                  >
                    <svg
                      aria-label="Дополнительно"
                      class="_ab6-"
                      color="rgb(255, 255, 255)"
                      fill="rgb(255, 255, 255)"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <circle cx="12" cy="12" r="1.5"></circle>
                      <circle cx="6" cy="12" r="1.5"></circle>
                      <circle cx="18" cy="12" r="1.5"></circle>
                    </svg>
                  </div>
                  <div
                    onClick={handleClickOpen}
                    className="cursor-pointer dark:hidden"
                  >
                    <svg
                      aria-label="Дополнительно"
                      class="_ab6-"
                      color="#000"
                      fill="#000"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <circle cx="12" cy="12" r="1.5"></circle>
                      <circle cx="6" cy="12" r="1.5"></circle>
                      <circle cx="18" cy="12" r="1.5"></circle>
                    </svg>
                  </div>
                </div>
                <div className="py-[10px]">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    style={{ borderRadius: "3px" }}
                    keyboard={{
                      enabled: true,
                    }}
                    // pagination={{
                    //   clickable: true,
                    // }}
                    // navigation={true}
                    // modules={[Keyboard, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    <SwiperSlide className="w-full max-h-[585px]">
                      <div className="flex items-center justify-center">
                        <img
                          src="data:image/jpeg;base64,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"
                          alt=""
                          className="w-full"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="w-full max-h-[585px]">
                      <div className="flex items-center justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                          alt=""
                          className="w-full"
                        />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="flex items-center justify-between sm1:px-[10px]">
                  <div className="flex items-center gap-x-[5px] py-[5px]">
                    <Checkbox
                      {...label}
                      icon={
                        <div>
                          <div className="hidden dark:block">
                            <svg
                              aria-label="Нравится"
                              class="x1lliihq x1n2onr6"
                              color="rgb(245, 245, 245)"
                              fill="rgb(245, 245, 245)"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Нравится</title>
                              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                            </svg>
                          </div>
                          <div className="dark:hidden">
                            <svg
                              aria-label="Нравится"
                              class="x1lliihq x1n2onr6"
                              color="#000"
                              fill="#000"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Нравится</title>
                              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                            </svg>
                          </div>
                        </div>
                      }
                      checkedIcon={
                        <svg
                          aria-label="Не нравится"
                          class="x1lliihq x1n2onr6"
                          color="rgb(255, 48, 64)"
                          fill="rgb(255, 48, 64)"
                          height="24"
                          role="img"
                          viewBox="0 0 48 48"
                          width="24"
                        >
                          <title>Не нравится</title>
                          <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                      }
                    />
                    <button className="dark:hidden">
                      <svg
                        aria-label="Комментировать"
                        class="x1lliihq x1n2onr6"
                        color="#000"
                        fill="#000"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Комментировать</title>
                        <path
                          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </svg>
                    </button>
                    <button className="hidden dark:block">
                      <svg
                        aria-label="Комментировать"
                        class="x1lliihq x1n2onr6"
                        color="rgb(245, 245, 245)"
                        fill="rgb(245, 245, 245)"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Комментировать</title>
                        <path
                          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </svg>
                    </button>
                    <button className="px-[8px] dark:hidden">
                      <svg
                        aria-label="Поделиться публикацией"
                        class="x1lliihq x1n2onr6"
                        color="#000"
                        fill="#000"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Поделиться публикацией</title>
                        <line
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          x1="22"
                          x2="9.218"
                          y1="3"
                          y2="10.083"
                        ></line>
                        <polygon
                          fill="none"
                          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></polygon>
                      </svg>
                    </button>
                    <button className="px-[8px] hidden dark:block">
                      <svg
                        aria-label="Поделиться публикацией"
                        class="x1lliihq x1n2onr6"
                        color="rgb(245, 245, 245)"
                        fill="rgb(245, 245, 245)"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Поделиться публикацией</title>
                        <line
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          x1="22"
                          x2="9.218"
                          y1="3"
                          y2="10.083"
                        ></line>
                        <polygon
                          fill="none"
                          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></polygon>
                      </svg>
                    </button>
                  </div>
                  <div>
                    <Checkbox
                      {...label}
                      icon={
                        <div>
                          <div className="hidden dark:block">
                            <svg
                              aria-label="Сохранить"
                              class="x1lliihq x1n2onr6"
                              color="rgb(245, 245, 245)"
                              fill="rgb(245, 245, 245)"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Сохранить</title>
                              <polygon
                                fill="none"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              ></polygon>
                            </svg>
                          </div>
                          <div className="dark:hidden">
                            <svg
                              aria-label="Сохранить"
                              class="x1lliihq x1n2onr6"
                              color="#000"
                              fill="#000"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Сохранить</title>
                              <polygon
                                fill="none"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              ></polygon>
                            </svg>
                          </div>
                        </div>
                      }
                      checkedIcon={
                        <div>
                          <div className="hidden dark:block">
                            <svg
                              aria-label="Сохранить"
                              class="x1lliihq x1n2onr6"
                              color="rgb(245, 245, 245)"
                              fill="rgb(245, 245, 245)"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Сохранить</title>
                              <polygon
                                fill="rgb(245, 245, 245)"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              ></polygon>
                            </svg>
                          </div>
                          <div className="dark:hidden">
                            <svg
                              aria-label="Сохранить"
                              class="x1lliihq x1n2onr6"
                              color="#000"
                              fill="#000"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>Сохранить</title>
                              <polygon
                                fill="#00"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              ></polygon>
                            </svg>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-[#000] dark:text-[#FFF] font-[600] py-[10px] sm1:px-[10px]">
                    417 отметок "Нравится"
                  </h1>
                </div>
                <div className="description sm1:px-[10px] text-[#000] dark:text-[#FFF] flex items-center gap-x-[10px] leading-[15px]">
                  <h1>idibek_02</h1>
                  <span className="text-[30px] text-[#A8A8A8]">•</span>
                  <p>Лайк ...</p>
                </div>
                <div>
                  <button className="text-[#7F7F7F] sm1:px-[10px]">ещё</button>
                </div>
                <div>
                  <h1 className="text-[#7F7F7F] sm1:px-[10px]">
                    Посмотреть все комментарии (42)
                  </h1>
                </div>
                <div className="py-[5px] sm1:px-[10px]">
                  <input
                    placeholder="Добавьте комментариий..."
                    className="pb-[15px] w-full text-[14px] outline-none bg-transparent text-[#000] dark:text-[#F5F5F5] placeholder:text-[#7F7F7F] placeholder:text-[14px] border-b border-[#262626]"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[50%] justify-center idi:hidden">
          <div className="max-w-[350px] py-[30px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-[10px]">
                <div className="w-[44px] h-[44px]">
                  <img src={person} alt="" className="rounded-[50%]" />
                </div>
                <div className="flex flex-col leading-[18px]">
                  <h1 className="text-[#000] dark:text-[#000]">idibek_02</h1>
                  <h1 className="text-[#A8A8A8] text-[14px]">idibek_02</h1>
                </div>
              </div>
              <div className="flex items-center justify-end ">
                <button className="text-[#0095F6] font-[500]">
                  Переключиться
                </button>
              </div>
            </div>
            <div className="py-[10px] flex items-center justify-between">
              <h1 className="text-[#A8A8A8] font-[500]">
                Рекомендации для вас
              </h1>
              <button className="text-[#000] dark:text-[#F5F5F5] font-[500]">
                Все
              </button>
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-[10px]">
                  <div className="w-[44px] h-[44px]">
                    <img src={person} alt="" className="rounded-[50%]" />
                  </div>
                  <div className="flex flex-col leading-[18px]">
                    <h1 className="text-[#000] dark:text-[#000]">idibek_02</h1>
                    <h1 className="text-[#A8A8A8] text-[14px]">
                      Подписан(а) raabovnaaa_
                    </h1>
                  </div>
                </div>
                <div className="flex items-center justify-end ">
                  <button className="text-[#0095F6] font-[500]">
                    Подписаться
                  </button>
                </div>
              </div>
            </div>
            <div className="py-[30px]">
              <ul className="flex items-center gap-[5px] flex-wrap">
                <Link className="hover:underline text-[#A8A8A8] text-[12px]">
                  Информация
                </Link>
                <Link className="hover:underline text-[#A8A8A8] text-[12px]">
                  Помощь
                </Link>
                <Link className="hover:underline text-[#A8A8A8] text-[12px]">
                  Пресса
                </Link>
                <Link className="hover:underline text-[#A8A8A8] text-[12px]">
                  API
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              padding: 0,
              backgroundColor: "#2f2f2f",
              borderRadius: "10px",
            }}
            className="w-[400px] md:w-[260px]"
          >
            <ul className="flex flex-col">
              <Link className="py-[14px] border-b border-[#414141] text-center text-[#eD4956] text-[13px] font-[700]">
                Пожаловаться
              </Link>
              <Link className="py-[14px] border-b border-[#414141] text-center text-[#eD4956] text-[13px]  font-[700]">
                Отменить подписку
              </Link>
              <Link className="py-[14px] border-b border-[#414141] text-center text-[#000] dark:text-[#000] text-[13px]">
                Добавить в избранное
              </Link>
              <Link className="py-[14px] border-b border-[#414141] text-center text-[#000] dark:text-[#000] text-[13px]">
                Перейти к публикации
              </Link>
              <Link className="py-[14px] border-b border-[#414141] text-center text-[#000] dark:text-[#000] text-[13px]">
                Поделиться…
              </Link>
              <Link className="py-[14px] border-b border-[#414141] text-center text-[#000] dark:text-[#000] text-[13px]">
                Копировать ссылку
              </Link>
              <Link className="py-[14px] border-b border-[#414141] text-center text-[#000] dark:text-[#000] text-[13px]">
                Вставить на сайт
              </Link>
              <button
                onClick={handleClose}
                className="py-[12px] border-b border-[#414141] text-center text-[#000] dark:text-[#000] text-[13px]"
              >
                Отмена
              </button>
            </ul>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;
