import "./Home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Keyboard, Pagination, Navigation } from "swiper/modules";
import person from "../../assets/profile.jpg";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Checkbox from "@mui/material/Checkbox";
import History from "../../components/History/History";
import { axiosRequest, getToken } from "../../utils/AxiosRequest";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Facebook from "../../components/Skeleton/Skeleton";
const Home = () => {

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [open, setOpen] = useState(false);
  const [commentDel, setCommentDel] = useState(false);
  const [more, setMore] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState("");
  const [commentShow, setCommentShow] = useState(false);
  const [commentDialog, setCommentDialog] = useState();
  const [commentIdDel, setCommentIdDel] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getPosts = async () => {
    setLoading(true)
    try {
      const { data } = await axiosRequest.get("posts");
      setPosts(data.reverse());
      setLoading(false)
    } catch (err) {}
  };
  const getUsers = async () => {
    try {
      const { data } = await axiosRequest.get("users");
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  };
  const toggleLike = async (id) => {
    let post = posts.find((p) => p.id === id);
    if (post.likedBy.includes(+getToken().sub)) {
      post.likes--;
      post.likedBy = post.likedBy.filter((elem) => elem !== +getToken().sub);
    } else {
      post.likes++;
      post.likedBy = [...post.likedBy, +getToken().sub];
    }

    try {
      const { data } = await axiosRequest.patch(`posts/${id}`, post);
      getPosts();
    } catch (e) {}
  };
  const deleteComment = async (id, com) => {
    let post = posts.find((p) => p.id === id);
    post.comments = post.comments.filter((elem) => elem.id !== com);
    try {
      const { data } = await axiosRequest.patch(`posts/${id}`, post);
      getPosts();
    } catch (e) {}
  };
  const toggleSaved = async (id) => {
    let post = posts.find((p) => p.id === id);
    if (post.savedBy.includes(+getToken().sub)) {
      post.saved--;
      post.savedBy = post.savedBy.filter((elem) => elem !== +getToken().sub);
    } else {
      post.saved++;
      post.savedBy = [...post.savedBy, +getToken().sub];
    }

    try {
      const { data } = await axiosRequest.patch(`posts/${id}`, post);
      getPosts();
    } catch (e) {}
  };
  const addComment = async (id) => {
    const post = posts.find((p) => p.id === id);
    post.comments = [
      ...post.comments,
      {
        userId: +getToken().sub,
        comment,
        id: new Date().getTime(),
      },
    ];
    try {
      const { data } = await axiosRequest.patch(`posts/${id}`, post);
      getPosts();
      setComment("");
    } catch (e) {}
  };
  const follow = async (id)=>{
    let user = users.find((user) => user.id===+getToken().sub)
    let user1 = users.find((user) => user.id===id)
    user.subscriptions.push(id)
    user1.subscribers.push(+getToken().sub)
    try {
      const { data } = await axiosRequest.patch(`users/${user.id}`, user);
      const { data1 } = await axiosRequest.patch(`users/${id}`, user1);
      getUsers();
    } catch (e) {}
  }
  useEffect(() => {
    getPosts();
   getUsers()
  }, []);
  return (
    <>
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
      <div className="max-w-[1000px] mx-auto pt-[30px] md:pt-[50px] flex  bg-[#fff] dark:bg-[#000]">
        <div className="py-[20px] w-[80%] idi:mx-auto md:w-full">
          <div className="stories w-[90%] px-[10px] sm:w-full mx-auto relative overflow-x-scroll flex items-center gap-x-[20px]">
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
            <History title="idibek_02" image={person} />
          </div>
          <div className="post w-[100%] py-[20px] flex flex-col gap-y-[20px] relative justify-center items-center">
            <div className="grid grid-cols-1 gap-y-[20px]">
              {loading && <Facebook/>}
              {posts.length > 0
                ? posts.map((e) => [
                    <div key={e.id} className="max-w-[500px] mx-auto sm:w-full">
                      <div className="flex items-center justify-between sm1:px-[10px]">
                        <div className="flex items-center gap-x-[10px]">
                        <Stack direction="row" spacing={1}>
                                    <Avatar
                                      src={`${
                                        import.meta.env.VITE_APP_FILES_URL
                                      }${users.find((user)=>user.id===e.userId)?.avatar}`}
                                      sx={{ width: 30, height: 30 }}
                                    />
                                  </Stack>
                                  
                          <div className="flex items-center gap-x-[10px] dark:text-[#fff] font-[600]">
                            {e.userId===+getToken().sub?users.find((user)=>user.id===e.userId)?.username
                            :<Link to={`user/${e.userId}`}>
                            {users.find((user)=>user.id===e.userId)?.username}
                            </Link>}
                            <span className="text-[30px] text-[#A8A8A8]">
                              •
                            </span>
                            <span className="text-[#A8A8A8]">
                              {Math.floor(
                                (new Date().getTime() - e.date) / 1000
                              ) < 60
                                ? Math.floor(
                                    (new Date().getTime() - e.date) / 1000
                                  ) + " сек"
                                : Math.floor(
                                    (new Date().getTime() - e.date) / 1000/60
                                  ) < 60
                                ? Math.floor(
                                    (new Date().getTime() - e.date) / 1000/60
                                  ) + " мин"
                                : Math.floor(
                                    (new Date().getTime() - e.date) / 1000 / 60/60
                                  ) < 60
                                ? Math.floor(
                                    ((new Date().getTime() - e.date) /
                                      1000 /60/60)
                                  ) + " час"
                                : null}
                            </span>
                            {e.userId!==+getToken().sub?
                            <button style={users.find((user)=>user.id==+getToken().sub)?.subscriptions?.includes(e.userId)?{display:"none"}:{display:"block"}} onClick={()=>follow(e.userId)} className="text-[12px] text-[#0095F6] hover:text-[#a2bed1]">Подписаться</button>:null
                          }
                            
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
                          {e.media.map((media) => {
                            if (media.type.split("/")[0] == "image") {
                              return (
                                <SwiperSlide className="w-full" key={e}>
                                  <div className="flex items-center justify-center overflow-hidden">
                                    <img
                                      className="image1"
                                      src={`${
                                        import.meta.env.VITE_APP_FILES_URL
                                      }${media.src}`}
                                      alt=""
                                    />
                                  </div>
                                </SwiperSlide>
                              );
                            } else if (media.type.split("/")[0] == "video") {
                              return (
                                <SwiperSlide className="w-full">
                                  <div className="flex items-center justify-center overflow-hidden">
                                    <video
                                      autoPlay
                                      muted
                                      className="image1"
                                      src={`${
                                        import.meta.env.VITE_APP_FILES_URL
                                      }${media.src}`}
                                      alt=""
                                    />
                                  </div>
                                </SwiperSlide>
                              );
                            }
                          })}
                        </Swiper>
                      </div>

                      <div className="flex items-center justify-between sm1:px-[10px]">
                        <div className="flex items-center gap-x-[5px] py-[5px]">
                          <Checkbox
                            onClick={() => toggleLike(e.id)}
                            checked={e.likedBy?.includes(+getToken()?.sub)}
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
                          <button onClick={() => {
                            setCommentShow(!commentShow);
                            setCommentDialog(e.id);
                          }} className="dark:hidden">
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
                          <button onClick={() => {
                            setCommentShow(!commentShow);
                            setCommentDialog(e.id);
                          }} className="hidden dark:block">
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
                            onClick={() => toggleSaved(e.id)}
                            checked={e.savedBy?.includes(+getToken()?.sub)}
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
                        <h1 className="text-[#000] pb-[5px] text-[13px] dark:text-[#FFF] font-[600]">
                          {e.likes > 0 ? `${e.likes} отметок Нравится` : null}
                        </h1>
                      </div>
                      <div className="description sm1:px-[15px] text-[#000] dark:text-[#FFF] flex  gap-x-[10px] leading-[15px]">
                        <h1
                          className="overflow-hidden text-ellipsis"
                          style={
                            more
                              ? { whiteSpace: "wrap", width: "100%" }
                              : { whiteSpace: "nowrap", width: "80%" }
                          }
                        >
                          <span className="font-[600] pr-[10px]">
                            {
                              users?.find((user) => user.id === e.userId)
                                ?.username
                            }
                          </span>
                          • <span className="leading-5">{e.title}</span>
                        </h1>
                      </div>
                      <div
                        className="sm1:px-[10px]"
                        style={
                          e.title.length > 50
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <button
                          className="text-[#7F7F7F]"
                          onClick={()=>setMore(true)}
                          style={
                            more ? { display: "none" } : { display: "block" }
                          }
                        >
                          {" "}
                          ещё
                        </button>
                      </div>
                      <div className="py-[5px]">
                        <button
                          onClick={() => {
                            setCommentShow(!commentShow);
                            setCommentDialog(e.id);
                          }}
                          style={
                            e.comments?.length > 0
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          className="text-[#000] dark:text-[#7F7F7F]"
                        >
                          {e.comments?.length == 1?
                          <span>
                            Посмотреть {e.comments?.length} комментарий 
                          </span>:
                          <span>
                          Посмотреть все комментарии ({e.comments?.length})
                        </span>
                         }
                        </button>

                        <h1 className="text-[#7F7F7F] sm1:px-[10px]">
                          {e.comments?.length > 0?
                                  <p
                                    key={e.comments[0].userId}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 5,
                                      m: 5,
                                    }}
                                    className="text-[#000] dark:text-[#FFF]"
                                  >
                                    <span className="font-[600] pl-[10px] text-[#000] dark:text-[#FFFF]">
                                      {
                                        users?.find(
                                          (user) => user.id === e.comments[0].userId
                                        )?.username
                                      }
                                      
                                    </span>
                                    {e.comments[0].comment}
                                  </p>: null}
                        </h1>
                      </div>
                      <div className="py-[5px] sm1:px-[10px]">
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            addComment(e.id);
                          }}
                          className="flex items-center justify-between border-b dark:border-[#262626] border-[#d2d2d2]"
                        >
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={1}
                            placeholder="Добавьте комментариий..."
                            className="py-[10px] w-[70%] textar text-[14px] outline-none bg-transparent text-[#000] dark:text-[#F5F5F5] placeholder:text-[#7F7F7F] placeholder:text-[14px] "
                          ></textarea>
                          <button
                            type="submit"
                            style={
                              comment.length > 0
                                ? { display: "inline-block" }
                                : { display: "none" }
                            }
                            className="text-[#0095F6] font-[600] flex items-center"
                          >
                            Опубликовать
                          </button>
                        </form>
                      </div>
                    </div>,
                  ])
                : null}
            </div>
          </div>
        </div>
        <div className="flex justify-center idi:hidden">
          <div className="w-full py-[30px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-[10px]">
              <Stack direction="row" spacing={1}>
                                    <Avatar
                                      src={`${
                                        import.meta.env.VITE_APP_FILES_URL
                                      }${users.find((user)=>user.id===+getToken().sub)?.avatar}`}
                                      sx={{ width: 30, height: 30 }}
                                    />
                                  </Stack>
                <div className="flex flex-col leading-[18px]">
                  <h1 className="text-[#000] dark:text-[#fff]">{users.find((user)=>user.id===+getToken().sub)?.username}</h1>
                  <h1 className="text-[#A8A8A8] text-[14px]">idibek_02</h1>
                </div>
              </div>
              <div className="flex items-center justify-end ">
                <button className="text-[#0095F6] font-[500] text-[12px]">
                  Переключиться
                </button>
              </div>
            </div>
            <div className="py-[10px] flex items-center justify-between">
              <h1 className="text-[#A8A8A8] font-[500] text-[13px]">
                Рекомендации для вас
              </h1>
              <button className="text-[#000] dark:text-[#F5F5F5] font-[500]">
                Все
              </button>
            </div>
            <div className="flex flex-col gap-y-[10px]">  
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-[10px]">
                <Stack direction="row" spacing={1}>
                                    <Avatar
                                      src={`${
                                        import.meta.env.VITE_APP_FILES_URL
                                      }${users.find((user)=>user.id===+getToken().sub)?.avatar}`}
                                      sx={{ width: 30, height: 30 }}
                                    />
                                  </Stack>
                  <div className="flex flex-col leading-[18px]">
                    <h1 className="text-[#000] dark:text-[#000]">idibek_02</h1>
                    <h1 className="text-[#A8A8A8] text-[12px]">
                      Подписан(а) raabovnaaa_
                    </h1>
                  </div>
                </div>
                <div className="flex items-center justify-end ">
                  <button className="text-[#0095F6] font-[500] text-[12px]">
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
            }}
            className="w-[400px] md:w-[260px]"
          >
            <ul className="flex flex-col bg-[#FFF] dark:bg-[#2f2f2f]">
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#eD4956] text-[13px] font-[700]">
                Пожаловаться
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#eD4956] text-[13px]  font-[700]">
                Отменить подписку
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#fff] text-[13px]">
                Добавить в избранное
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#fff] text-[13px]">
                Перейти к публикации
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#fff] text-[13px]">
                Поделиться…
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#fff] text-[13px]">
                Копировать ссылку
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#fff] text-[13px]">
                Вставить на сайт
              </Link>
              <button
                onClick={handleClose}
                className="py-[12px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#fff] text-[13px]"
              >
                Отмена
              </button>
            </ul>
          </DialogContent>
        </Dialog>
      </div>
      {/* showCommentDialog */}
      <Dialog
        open={commentShow}
        onClose={() => setCommentShow(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
        
      >
        <DialogContent
          className="w-[1200px] xl:w-[800px] lg:max-w-[700px] md:max-w-full bg-[#fff] dark:bg-[#000]"
          sx={{
            padding: 0,
          }}
        >
          <button onClick={()=>setCommentShow(false)} className="fixed z-50 top-[20px] text-[#FFF] right-[20px]">
          <svg aria-label="Закрыть" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Закрыть</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
          </button>
          {posts.map((post) => {
            if (post.id === commentDialog) {
              return (
                <div className="w-full relative max-h-[90vh] md:h-auto flex md:flex-col md:w-full">
                  <div className="w-[60%] xl:w-[50%] md:w-[80%] md:mx-auto">
                  <div className="hidden md:flex items-center justify-between w-full py-[20px] border-b px-[10px] border-b-[#3c3c3c]">
                      <div className="flex items-center gap-x-[20px]">
                      <Stack direction="row" spacing={1}>
                                    <Avatar
                                    src={`${
                                      import.meta.env.VITE_APP_FILES_URL
                                    }${users.find((user)=>user.id===post.userId)?.avatar}`}
                                      sx={{ width: 30, height: 30 }}
                                    />
                                  </Stack>
                                  <div className="">
                        <h1 className="text-[#000] dark:text-[#fff]">
                          {
                            users.find((user) => user.id == post?.userId)
                              ?.username
                          }
                        </h1>
                      </div>
                      </div>
                      <div>
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
                      
                    </div>
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
                      {post?.media.map((item) => {
                        if (item.type.split("/")[0] == "image") {
                          return (
                            <SwiperSlide className="w-full">
                              <div className="w-full flex items-center justify-center overflow-hidden  min-h-[80vh] md:min-h-[50vh]">
                                <img
                                  className=""
                                  src={`${import.meta.env.VITE_APP_FILES_URL}${
                                    item.src
                                  }`}
                                  alt=""
                                />
                              </div>
                            </SwiperSlide>
                          );
                        } else {
                          return (
                            <SwiperSlide className="w-full">
                              <div className="flex items-center justify-center overflow-hidden">
                                <video
                                  controls
                                  className="image1"
                                  src={`${import.meta.env.VITE_APP_FILES_URL}${
                                    item.src
                                  }`}
                                ></video>
                              </div>
                            </SwiperSlide>
                          );
                        }
                      })}
                    </Swiper>
                  </div>
                  <div className="w-[40%] relative md:w-full">
                    <div className="sticky w-full py-[20px] border-b px-[10px] border-b-[#3c3c3c] md:hidden">
                     <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-[10px]">
                      <Stack direction="row" spacing={1}>
                                    <Avatar
                                    src={`${
                                      import.meta.env.VITE_APP_FILES_URL
                                    }${users.find((user)=>user.id===post.userId)?.avatar}`}
                                      sx={{ width: 30, height: 30 }}
                                    />
                                  </Stack>
                        <h1 className="text-[#000] dark:text-[#fff]">
                          {
                            users.find((user) => user.id == post?.userId)
                              ?.username
                          }
                        </h1>
                      </div>
                      <div>
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
                      </div>
                    </div>
                    <div className="pt-[10px] px-[15px] md:w-full ">
                      <div className="sccc py-[5px] flex flex-col gap-y-[10px] overflow-y-auto webk h-[58vh] xl:h-[43vh] md:h-[70vh] md:pb-[155px]">
                      <div className="hov flex gap-x-[15px]">
                      <Stack direction="row" spacing={1}>
                                    <Avatar
                                      src={`${
                                        import.meta.env.VITE_APP_FILES_URL
                                      }${users.find((user)=>user.id===post.userId)?.avatar}`}
                                      sx={{ width: 30, height: 30 }}
                                    />
                                  </Stack>
                                  <h1 className="text-[#000] dark:text-[#FFF] gap-x-[5px]">
                                      <span className="dark:text-[#fff]">
                                      <span className="font-[600] mr-[10px]">
                                        {
                                          users.find(
                                            (user) => user.id === post.userId
                                          )?.username
                                        }
                                      </span>
                                        {post.title}
                                      </span>
                                    </h1>
                                  </div>
                                  
                        {post.comments?.map((comment) => {
                          return (
                            <>
                                <div className="hov flex gap-x-[15px]">
                                <Stack direction="row" spacing={1}>
                                    <Avatar
                                      src={`${
                                        import.meta.env.VITE_APP_FILES_URL
                                      }${users.find((user)=>user.id===comment.userId)?.avatar}`}
                                      sx={{ width: 30, height: 30 }}
                                    />
                                  </Stack>
                                  <div className="">
                                    <h1 className="text-[#000] dark:text-[#FFF] flex gap-x-[5px]">
                                      <span className="">
                                      <span className="font-[600] mr-[10px]">
                                        {
                                          users.find(
                                            (user) => user.id === comment.userId
                                          )?.username
                                        }
                                      </span>
                                        {comment.comment}
                                      </span>
                                    </h1>
                                    <div className="flex items-center justify-between">
                                      <h1 className="dark:text-[#b9b9b9] text-[11px]">
                                      <span className="text-[#A8A8A8]">
                              {Math.floor(
                                (new Date().getTime() - comment.id) / 1000
                              ) < 60
                                ? Math.floor(
                                    (new Date().getTime() - comment.id) / 1000
                                  ) + " сек"
                                : Math.floor(
                                    (new Date().getTime() - comment.id) / 1000/60
                                  ) < 60
                                ? Math.floor(
                                    (new Date().getTime() - comment.id) / 1000/60
                                  ) + " мин"
                                : Math.floor(
                                    (new Date().getTime() - comment.id) / 1000 / 60/60
                                  ) < 60
                                ? Math.floor(
                                    ((new Date().getTime() - comment.id) /
                                      1000 /60/60)
                                  ) + " час"
                                : null}
                            </span>
                                      </h1>
                                      <div onClick={() => {
                                            setCommentDel(true)
                                            setCommentIdDel({idComent:comment.id,postId:post.id,id:comment.userId})
                                          }} 
                                          className="dopol">
                                        <div
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
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="1.5"
                                            ></circle>
                                            <circle
                                              cx="6"
                                              cy="12"
                                              r="1.5"
                                            ></circle>
                                            <circle
                                              cx="18"
                                              cy="12"
                                              r="1.5"
                                            ></circle>
                                          </svg>
                                        </div>
                                        <div
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
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="1.5"
                                            ></circle>
                                            <circle
                                              cx="6"
                                              cy="12"
                                              r="1.5"
                                            ></circle>
                                            <circle
                                              cx="18"
                                              cy="12"
                                              r="1.5"
                                            ></circle>
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                    <div className="absolute w-full bottom-0 border-t border-[#3c3c3c] bg-[#fff] dark:bg-[#000]">
                      <div className="flex items-center justify-between pl-[5px] py-[10px]">
                        <div className="flex items-center gap-x-[5px] ">
                          <Checkbox
                            onClick={() => toggleLike(post.id)}
                            checked={post?.likedBy.includes(+getToken()?.sub)}
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
                            onClick={() => toggleSaved(post.id)}
                            checked={post?.savedBy?.includes(+getToken()?.sub)}
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
                      <div className="pl-[15px] pb-[10px]">
                        <h1 className="text-[#000] dark:text-[#FFF] font-[500]">
                          {post.likes > 0
                            ? `${post.likes} отметок "Нравится"`
                            : null}
                        </h1>
                      </div>
                      <div className="py-[10px] sm1:px-[10px] pl-[15px] border-t border-t-[#3c3c3c]">
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            addComment(post.id);
                          }}
                          className="flex items-center justify-between"
                        >
                          <textarea
                            value={comment}
                            rows={1}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Добавьте комментариий..."
                            className="py-[10px] w-full text-[14px] outline-none bg-transparent text-[#000] dark:text-[#F5F5F5] placeholder:text-[#7F7F7F] placeholder:text-[14px]"
                          ></textarea>
                          <button
                            type="submit"
                            style={
                              comment.length > 0
                                ? { display: "inline-block" }
                                : { display: "none" }
                            }
                            className="text-[#0095F6] font-[600] flex pr-[15px]"
                          >
                            Опубликовать
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </DialogContent>
      </Dialog>
      <Dialog
                                  open={commentDel}
                                  onClose={() => setCommentDel(false)}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogContent
                                    sx={{
                                      padding: 0,
                                    }}
                                    className="w-[400px] md:w-[260px]"
                                  >
                                    <ul className="flex flex-col bg-[#FFF] dark:bg-[#2f2f2f]">
                                      <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#eD4956] text-[13px] font-[700]">
                                        Пожаловаться
                                      </Link>
                                      {commentIdDel?.id == +getToken().sub ? (
                                        <button
                                          className="py-[12px] border-b border-[#d3d3d3] dark:border-[#414141] text-center font-[700] text-[#eD4956] text-[13px]"
                                          onClick={() =>
                                            {deleteComment(
                                              commentIdDel.postId,
                                              commentIdDel.idComent,
                                            )
                                            setCommentDel(false)}
                                          }
                                        >
                                          Удалить
                                        </button> 
                                      ) : null}
                                      <button
                                        onClick={()=>setCommentDel(false)}
                                        className="py-[12px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#fff] text-[13px]"
                                      >
                                        Отмена
                                      </button>
                                    </ul>
                                  </DialogContent>
        </Dialog>
    </>
  );
};

export default Home;
