import React, { useEffect, useState } from "react";
import "./ViewProfile.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Switcher from "../../components/Switcher/Switcher";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
import DialogContent from "@mui/material/DialogContent";
import { axiosRequest, getToken } from "../../utils/AxiosRequest";
import { Avatar, Checkbox, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

const ViewProfile = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [menuMobile, setMenuMobile] = React.useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [commentDialog, setCommentDialog] = useState();
  const [commentDel, setCommentDel] = useState(false);
  const [commentIdDel, setCommentIdDel] = useState({});
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [users, setUsers] = useState();
  const [comment, setComment] = useState("");
  const [modalPost, setModalPost] = React.useState(false);
  const [viewFollowers, setViewFollowers] = useState(false);
  const [followers, setFollowers] = useState();
  const [foll, setFoll] = useState(false);
  const { userId } = useParams();
  
  const handleClickOpenMobile = () => {
    setMenuMobile(true);
  };
  const handleCloseMobile = () => {
    setMenuMobile(false);
  };
  const handleClose4 = () => {
    setOpen3(false);
  };
 
  const getPosts = async () => {
    try {
      const { data } = await axiosRequest.get(`posts?userId=${userId}`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };
  // const getUser = async () => {
  //   try {
  //     const { data } = await axiosRequest.get(`users?id=${+getToken().sub}`);
  //     setUser(data[0]);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const getUsers = async () => {
    try {
      const { data } = await axiosRequest.get(`users`);
      setUsers(data);
      const user = data.find((user) => user.id == userId);
      setUser(user);
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
  const deleteComment = async (idPost, idComment) => {
    let post = posts.find((p) => p.id === idPost);
    console.log(post,idComment);
    post.comments = post.comments.filter((elem) => elem.id !== idComment);
    try {
      const { data } = await axiosRequest.patch(`posts/${idPost}`, post);
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
  const follow = async (id) => {
    let user = users.find((user) => user.id === +getToken().sub);
    let user1 = users.find((user) => user.id === id);
    if (user.subscriptions.includes(id)) {
      user.subscriptions = user.subscriptions.filter((el) => el !== id);
      user1.subscribers = user1.subscribers.filter((el) => el !== user.id);
      setFoll(false)
    } else {
      user.subscriptions.push(id);
      user1.subscribers.push(+getToken().sub);
      setFoll(true)
    }
    try {
      const { data } = await axiosRequest.patch(`users/${user.id}`, user);
      const { data1 } = await axiosRequest.patch(`users/${user1.id}`, user1);
      getUsers();
      
    } catch (e) {}
  };
  useEffect(() => {
    getPosts();
    // getUser();
    getUsers();
  }, []);
  return (
    <>
      <div className="w-full fixed top-0 left-0 py-[5px] bg-[#FFF] dark:bg-[#000] hidden z-20 px-[20px] md:block border-b border-[#dfdede] dark:border-[#2b2b2b] smm:py-[10px]">
        <div className="flex items-center justify-between">
          <div className="w-[30%]">
            <div
              onClick={handleClickOpenMobile}
              className="text-[25px] py-[10px]"
            >
              <div className="">
                <div>
                  <div className="hidden dark:block">
                    <svg
                      aria-label="Параметры"
                      class="x1lliihq x1n2onr6"
                      color="rgb(245, 245, 245)"
                      fill="rgb(245, 245, 245)"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <title>Параметры</title>
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="8.635"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></circle>
                      <path
                        d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </svg>
                  </div>
                  <div className="dark:hidden">
                    <svg
                      aria-label="Параметры"
                      class="x1lliihq x1n2onr6"
                      color="#000"
                      fill="#000"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <title>Параметры</title>
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="8.635"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></circle>
                      <path
                        d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-[30%]">
            <h1 className="text-[#000] dark:text-[#FFF] text-[15px] py-[10px] px-[5px] font-[600]">
              {user?.username}
            </h1>
          </div>
          <div className="flex items-center justify-end w-[30%]">
            <h1 className="text-[#000] dark:text-[#FFF] text-[15px] px-[5px] font-[600] text-center flex items-center">
              <div className="">
                <div>
                  <div className="hidden dark:block">
                    <svg
                      aria-label="Интересные люди"
                      class="x1lliihq x1n2onr6"
                      color="rgb(245, 245, 245)"
                      fill="rgb(245, 245, 245)"
                      height="24"
                      role="img"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <title>Интересные люди</title>
                      <path d="M32 25.5c5.2 0 9.5-4.3 9.5-9.5S37.2 6.5 32 6.5s-9.5 4.3-9.5 9.5 4.3 9.5 9.5 9.5zm0-16c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5-6.5-2.9-6.5-6.5 2.9-6.5 6.5-6.5zm5.5 19h-11c-5.5 0-10 4.5-10 10V40c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-1.5c0-3.9 3.1-7 7-7h11c3.9 0 7 3.1 7 7V40c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-1.5c0-5.5-4.5-10-10-10zm-20-4.5c0-.8-.7-1.5-1.5-1.5h-5.5V17c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v5.5H2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5.5V31c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-5.5H16c.8 0 1.5-.7 1.5-1.5z"></path>
                    </svg>
                  </div>
                  <div className="dark:hidden">
                    <svg
                      aria-label="Интересные люди"
                      class="x1lliihq x1n2onr6"
                      color="#000"
                      fill="#000"
                      height="24"
                      role="img"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <title>Интересные люди</title>
                      <path d="M32 25.5c5.2 0 9.5-4.3 9.5-9.5S37.2 6.5 32 6.5s-9.5 4.3-9.5 9.5 4.3 9.5 9.5 9.5zm0-16c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5-6.5-2.9-6.5-6.5 2.9-6.5 6.5-6.5zm5.5 19h-11c-5.5 0-10 4.5-10 10V40c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-1.5c0-3.9 3.1-7 7-7h11c3.9 0 7 3.1 7 7V40c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-1.5c0-5.5-4.5-10-10-10zm-20-4.5c0-.8-.7-1.5-1.5-1.5h-5.5V17c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v5.5H2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5.5V31c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-5.5H16c.8 0 1.5-.7 1.5-1.5z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-[1000px] mx-auto md:pt-[20px]">
        <div className="flex items-center justify-center  md:justify-start sm1:justify-center md:gap-x-[20px] border-b border-[#5f5f5f] pt-[70px] pb-[30px] px-[10px] md:border-none">
          <div className="w-[30%] flex items-center justify-center md:w-[20%]">
            <Stack direction="row" spacing={1}>
              <Avatar
                src={`${import.meta.env.VITE_APP_FILES_URL}${user?.avatar}`}
                className="min-w-[150px] min-h-[150px] lg:min-w-[100px] lg:min-h-[100px] sm:min-h-[80px] sm:min-w-[80px]"
              />
            </Stack>
          </div>
          <div className="w-[50%] md:w-[50%] sm1:w-[60%]">
            <div className="flex items-center justify-start gap-x-[30px] sm:gap-y-[5px] sm:flex-wrap sm:gap-x-[20px]">
              <h1 className="text-[#000] dark:text-[#FFF] text-[25px] sm:text-[20px]">
                {user?.username}
              </h1>

              <button
                onClick={() => follow(user.id)}
                style={
                  users
                    ?.find((user) => user.id == +getToken().sub)
                    .subscriptions.includes(user.id)
                    ? {}
                    : { backgroundColor: "#0095F6" }
                }
                className="w-auto px-[15px] py-[8px] sm1:order-3  rounded-[10px] bg-[#f0f0f0] dark:bg-[#363636] text-[#000] dark:text-[#F5F5F5] font-[600] text-center leading-[15px] md:px-[5px]"
              >
                {users
                  ?.find((user) => user.id == +getToken().sub)
                  .subscriptions.includes(user.id)
                  ? "Подписки"
                  : "Подписаться"}
              </button>
            </div>
            <div className="flex items-center justify-start gap-x-[30px] text-[#000] dark:text-[#FFF] py-[15px] md:hidden">
              <h1 className="text-center">
                <span className="font-[600]">{posts.length}</span> публикаций
              </h1>
              <h1
                onClick={() => {
                  setViewFollowers(true);
                  setFollowers("subscribers");
                }}
                className="cursor-pointer text-center"
              >
                <span className="font-[600]">{user?.subscribers?.length}</span>{" "}
                подписчиков
              </h1>
              <h1
                onClick={() => {
                  setViewFollowers(true);
                  setFollowers("subscriptions");
                }}
                className="cursor-pointer text-center"
              >
                <span className="font-[600]">
                  {user?.subscriptions?.length}{" "}
                </span>{" "}
                подписок
              </h1>
            </div>
            <div className="py-[10px]  md:hidden">
              <h1 className="text-[#000] dark:text-[#FFF] font-[500] pb-[5px]">
                {user?.name}
              </h1>
              <p className="text-[#000] dark:text-[#FFF] text-[12px] font-[400]">
                <pre style={{ fontStyle: "normal" }} className="leading-4">
                  <p className="text-[14px]">{user?.about}</p>
                </pre>
              </p>
            </div>
          </div>
        </div>
        <div className="py-[10px] px-[15px] hidden md:block">
          <h1 className="text-[#000] dark:text-[#FFF] font-[500]">
            {user?.name}
          </h1>
          <p className="text-[#000] dark:text-[#FFF] text-[12px] font-[500]">
            <pre style={{ fontStyle: "normal" }} className="leading-4">
              <p>{user?.about}</p>
            </pre>
          </p>
        </div>
        <div className="">
          <div>
            <div className="items-center justify-evenly px-[20px] gap-x-[30px] text-[#000] dark:text-[#FFF] py-[15px] hidden md:flex border-t border-[#5f5f5f]">
              <h1 className="text-center flex flex-col sm:text-[13px]">
                <span className="font-[600]"> {posts.length}</span> публикаций
              </h1>
              <h1 className="text-center flex flex-col sm:text-[13px]">
                <span className="font-[600]"> {user?.subscribers?.length}</span>{" "}
                подписчиков
              </h1>
              <h1 className="text-center flex flex-col sm:text-[13px]">
                <span className="font-[600]">
                  {" "}
                  {user?.subscriptions?.length}{" "}
                </span>{" "}
                подписок
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Link className="inline-flex items-center justify-center gap-x-[10px] py-[10px] border-t border-t-[#000] dark:border-t-[#FFF]">
              <div className="dark:hidden">
                <svg
                  aria-label=""
                  class="_ab6-"
                  color="#000"
                  fill="#000"
                  height="12"
                  className="md:h-[25px] md:w-[25px]"
                  role="img"
                  viewBox="0 0 24 24"
                  width="12"
                >
                  <rect
                    fill="none"
                    height="18"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    width="18"
                    x="3"
                    y="3"
                  ></rect>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="9.015"
                    x2="9.015"
                    y1="3"
                    y2="21"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="14.985"
                    x2="14.985"
                    y1="3"
                    y2="21"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="21"
                    x2="3"
                    y1="9.015"
                    y2="9.015"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="21"
                    x2="3"
                    y1="14.985"
                    y2="14.985"
                  ></line>
                </svg>
              </div>
              <div className="hidden dark:block">
                <svg
                  aria-label=""
                  class="_ab6-"
                  color="rgb(245, 245, 245)"
                  fill="rgb(245, 245, 245)"
                  height="12"
                  className="md:h-[25px] md:w-[25px]"
                  role="img"
                  viewBox="0 0 24 24"
                  width="12"
                >
                  <rect
                    fill="none"
                    height="18"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    width="18"
                    x="3"
                    y="3"
                  ></rect>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="9.015"
                    x2="9.015"
                    y1="3"
                    y2="21"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="14.985"
                    x2="14.985"
                    y1="3"
                    y2="21"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="21"
                    x2="3"
                    y1="9.015"
                    y2="9.015"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="21"
                    x2="3"
                    y1="14.985"
                    y2="14.985"
                  ></line>
                </svg>
              </div>

              <h1 className="text-[#000] dark:text-[#FFF] text-center uppercase text-[12px] font-[500] md:hidden">
                Публикации
              </h1>
            </Link>
          </div>
          <div className="md:pb-[60px]">
            {posts.length > 0 ? (
              <ImageList cols={3}>
                {posts.map((item) => (
                  <h1>
                    {item.media.map((media) => (
                      <ImageListItem key={item.id}>
                        {media.type.split("/")[0] === "image" ? (
                          <img
                          className="image-container xl:max-h-[300px] sm:max-h-[200px] sm1:max-h-[150px]"
                            src={`${import.meta.env.VITE_APP_FILES_URL}${
                              media.src
                            }`}
                            loading="lazy"
                          />
                        ) : (
                          <video
                          className="image-container xl:max-h-[300px] sm:max-h-[200px] sm1:max-h-[150px]"
                            src={`${import.meta.env.VITE_APP_FILES_URL}${
                              media.src
                            }`}
                          ></video>
                        )}
                        <div
                          onClick={() => {
                            setCommentShow(!commentShow);
                            setCommentDialog(item.id);
                          }}
                          className="cursor-pointer opacity-0 hover:opacity-[1] transition-opacity w-full h-full absolute bg-[#00000068] flex items-center justify-center"
                        >
                          <div className="w-[50%] mx-auto flex items-center justify-evenly">
                            <div className="flex items-center gap-x-[3px]">
                              <FavoriteIcon sx={{ color: "#fff" }} />
                              <h1 className="pb-[2px] text-[18px] font-[600] text-[#fff]">
                                {item.likes}
                              </h1>
                            </div>
                            <div className="flex items-center gap-x-[5px]">
                              <svg
                                aria-label="Комментировать"
                                class="x1lliihq x1n2onr6"
                                color="rgb(245, 245, 245)"
                                fill="rgb(245, 245, 245)"
                                height="20"
                                role="img"
                                viewBox="0 0 24 24"
                                width="20"
                              >
                                <title>Комментировать</title>
                                <path
                                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                  fill="rgb(245, 245, 245)"
                                  stroke="currentColor"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                              </svg>
                              <h1 className="text-[18px] font-[600] text-[#fff]">
                                {item.comments.length}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </ImageListItem>
                    ))}
                  </h1>
                ))}
              </ImageList>
            ) : (
              <div>
                <div className="flex items-center justify-center h-[40vh]">
                  <h1 className="py-[50px] text-[30px] text-[#000] dark:text-[#fff] ">
                    Пока нет публикация
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div>
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
            className="min-w-[400px] md:min-w-[350px] sm:min-w-[270px]"
          >
            <ul className="flex flex-col bg-[#FFF] dark:bg-[#2f2f2f]">
              <Link
                to={"/account/password/change"}
                className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[13px]"
              >
                Сменить пароль
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[13px]">
                Профессиональный аккаунт
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[13px]">
                QR-код
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[13px]">
                Приложения и сайты
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[13px]">
                Уведомления
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[13px]">
                Конфиденциальность и безопасность
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[13px]">
                Контроль
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[13px]">
                Входы в аккаунт
              </Link>
              <Link className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[13px]">
                Электронные письма от Instagram
              </Link>
              <Link
                to={"/login"}
                className="py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[13px]"
              >
                Выйти
              </Link>
              <button
                onClick={handleClose}
                className="py-[12px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[13px]"
              >
                Отмена
              </button>
            </ul>
          </DialogContent>
        </Dialog>
      </div> */}
      <div>
        <Dialog
          open={modalPost}
          onClose={() => setModalPost(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              padding: 0,
              backgroundColor: "#2f2f2f",
            }}
            className="min-w-[400px] md:min-w-[350px] sm:min-w-[270px]"
          >
            <ul className="flex flex-col bg-[#FFF] dark:bg-[#2f2f2f]">
              <div
                className="cursor-pointer py-[14px] font-[600] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#ED4956]  text-[14px]"
              >
                Пожаловаться
              </div>
              {foll && 
              (
                <div onClick={()=>follow(user.id)}  className="cursor-pointer py-[14px] font-[600] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#ED4956] text-[14px]">
              Отменить подписку
              </div>
                )
              }
              
              <Link className="py-[14px] font-[600] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[14px]">
              Перейти к публикации
              </Link>
              <Link className="py-[14px] font-[600] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[14px]">
              Поделиться…
              </Link>
              <Link className="py-[14px] font-[600] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[14px]">
                Копировать ссылку
              </Link>
              <Link className="py-[14px] font-[600] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[14px]">
                Вставить на сайт
              </Link>
              <Link className="py-[14px] font-[600] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[14px]">
                Информация об аккаунте
              </Link>
              <button
                onClick={() => setModalPost(false)}
                className="py-[12px] font-[600] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#FFF] text-[14px]"
              >
                Отмена
              </button>
            </ul>
          </DialogContent>
        </Dialog>
      </div>
      <Dialog
        fullScreen
        open={menuMobile}
        onClose={handleCloseMobile}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ boxShadow: "none" }}>
          <Toolbar className="bg-[#ffffff] dark:bg-[#000]">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseMobile}
              aria-label="close"
            >
              <CloseIcon className="text-[#000] dark:text-[#FFF]" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List className="bg-[#fff] dark:bg-[#000] pt-[50px]">
          <div className="flex items-center  px-[15px] py-[12px] bg-[#535353]">
            <h1 className="font-[500]">Аккаунт</h1>
          </div>
          <Divider />
          <div className="flex items-center  px-[15px] py-[5px] bg-[#f4f4f4] dark:bg-[#131313] dark:text-[#a1a1a1]">
            {/* <h1 className="font-[500] uppercase">Аккаунт</h1> */}
          </div>
          <Divider />
          <div className="flex items-center  px-[15px] py-[12px] bg-[#f4f4f4] dark:bg-[#131313] dark:text-[#a1a1a1]">
            <h1 className="font-[500] uppercase">Аккаунт</h1>
          </div>
          <Divider />
          <Link
            to={"/account/edit"}
            className="flex items-center justify-between px-[15px] py-[12px]"
          >
            <h1 className="font-[500] dark:text-[#FFF]">
              Редактировать профиль
            </h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">
              Профессиональный аккаунт
            </h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">Ваши действия</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">QR-код</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link
            to={"/account/password/change"}
            className="flex items-center justify-between px-[15px] py-[12px]"
          >
            <h1 className="font-[500] dark:text-[#FFF]">Сменить пароль</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">
              Конфиденциальность и безопасность
            </h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">Реклама</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">Контроль</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">Входы в аккаунт</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">
              Электронные письма от Instagram
            </h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between pl-[30px] py-[12px]">
            <h1 className="font-[600] text-[13px] text-[#0095F6]">
              Переключиться на личный аккаунт
            </h1>
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <div className="flex items-center  px-[15px] py-[12px] bg-[#f4f4f4] dark:bg-[#131313] dark:text-[#a1a1a1]">
            <h1 className="font-[500] uppercase">Настройки</h1>
          </div>
          <Divider />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">Язык</h1>
          </Link>
          <Divider className="dark:bg-[#404040]" />

          <div className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">Переключить тему</h1>
            <Switcher />
          </div>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">Приложения и сайты</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">Уведомления</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <div className="flex items-center  px-[15px] py-[12px] bg-[#f4f4f4] dark:bg-[#131313] dark:text-[#a1a1a1]">
            <h1 className="font-[500] uppercase">Информация</h1>
          </div>
          <Divider />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">Реклама</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">Помощь</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">
              Сообщение о проблеме
            </h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <Link className="flex items-center justify-between px-[15px] py-[12px]">
            <h1 className="font-[500] dark:text-[#FFF]">Ещё</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
          <div className="flex items-center px-[15px] py-[5px] bg-[#f4f4f4] dark:bg-[#131313] dark:text-[#a1a1a1]">
            <h1 className="font-[500] uppercase"></h1>
          </div>
          <Divider />
          <Link
            to={"/login"}
            className="flex items-center justify-between px-[15px] py-[12px]"
          >
            <h1 className="font-[500] text-[#ED4956]">Выйти</h1>
            <ArrowForwardIosIcon
              className="text-[#6b6b6b]"
              sx={{ fontSize: "16px" }}
            />
          </Link>
          <Divider className="dark:bg-[#404040]" />
        </List>
      </Dialog>

      <Dialog
        open={commentShow}
        onClose={() => {
          setCommentShow(false);
        }}
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
          <button
            onClick={() => {
              setCommentShow(false);
            }}
            className="fixed z-50 top-[20px] text-[#FFF] right-[20px]"
          >
            <svg
              aria-label="Закрыть"
              color="rgb(255, 255, 255)"
              fill="rgb(255, 255, 255)"
              height="18"
              role="img"
              viewBox="0 0 24 24"
              width="18"
            >
              <title>Закрыть</title>
              <polyline
                fill="none"
                points="20.643 3.357 12 12 3.353 20.647"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
              ></polyline>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                x1="20.649"
                x2="3.354"
                y1="20.649"
                y2="3.354"
              ></line>
            </svg>
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
                            src={`${import.meta.env.VITE_APP_FILES_URL}${
                              user?.avatar
                            }`}
                            sx={{ width: 30, height: 30 }}
                          />
                        </Stack>
                        <div className="">
                          <h1 className="text-[#000] dark:text-[#fff]">
                            {user?.username}
                          </h1>
                        </div>
                      </div>
                      <div>
                        <div
                          onClick={() => setModalPost(true)}
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
                          onClick={() => setModalPost(true)}
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
                      className="mySwiper"
                    >
                      {post?.media.map((item) => {
                        if (item.type.split("/")[0] == "image") {
                          return (
                            <SwiperSlide className="w-full">
                              <div className="w-full flex items-center justify-center overflow-hidden  min-h-[80vh] md:min-h-[50vh]">
                                <img
                                  className="w-full min-h-[300px] md:max-h-[300px]"
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
                    <div className="sticky w-full py-[20px] border-b px-[10px] border-b-[#cccccc] dark:border-b-[#3c3c3c] md:hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-[10px]">
                          <Stack direction="row" spacing={1}>
                            <Avatar
                              src={`${import.meta.env.VITE_APP_FILES_URL}${
                                user?.avatar
                              }`}
                              sx={{ width: 30, height: 30 }}
                            />
                          </Stack>
                          <h1 className="text-[#000] dark:text-[#fff] font-[600]">
                            {user?.username}
                          </h1>
                        </div>
                        <div>
                          <div
                            onClick={() => setModalPost(true)}
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
                            onClick={() => setModalPost(true)}
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
                    <div className="pt-[10px] px-[15px] md:w-full">
                      <div className="sccc py-[5px] flex flex-col gap-y-[10px] overflow-y-auto webk h-[58vh] xl:h-[43vh] md:h-[70vh] md:pb-[155px]">
                        <div className="hov flex gap-x-[15px]">
                          <Stack direction="row" spacing={1}>
                            <Avatar
                              src={`${import.meta.env.VITE_APP_FILES_URL}${
                                user?.avatar
                              }`}
                              sx={{ width: 30, height: 30 }}
                            />
                          </Stack>
                          <h1 className="text-[#000] dark:text-[#FFF] gap-x-[5px]">
                            <span className="dark:text-[#fff]">
                              <span className="font-[600] mr-[10px]">
                                {user?.username}
                              </span>
                              {post.title}
                            </span>
                          </h1>
                        </div>
                        {post?.comments.map((comment) => {
                          return (
                            <>
                              <div className="hov flex gap-x-[15px]">
                                <Stack direction="row" spacing={1}>
                                  <Avatar
                                    src={`${
                                      import.meta.env.VITE_APP_FILES_URL
                                    }${
                                      users?.find(
                                        (user) => user.id === comment.userId
                                      )?.avatar
                                    }`}
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
                                    <div
                                      onClick={() => {
                                        setCommentDel(true);
                                        setCommentIdDel({
                                          idComment: comment.id,
                                          postId: post.id,
                                          id:comment.userId
                                        });
                                      }}
                                      className="dopol"
                                    >
                                      <div className="cursor-pointer hidden dark:block">
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
                                      <div className="cursor-pointer dark:hidden">
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
                    <div className="absolute w-full bottom-0 border-t border-t-[#cccccc] dark:border-t-[#3c3c3c]  bg-[#fff] dark:bg-[#000]">
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
                      <div className="py-[10px] sm1:px-[10px] pl-[15px] border-t border-t-[#cccccc] dark:border-t-[#3c3c3c]">
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            addComment(post.id);
                          }}
                          className="flex text-center justify-between"
                        >
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={1}
                            placeholder="Добавьте комментариий..."
                            className="py-[10px] textar h-auto w-[70%] text-[14px] outline-none bg-transparent text-[#000] dark:text-[#F5F5F5] placeholder:text-[#7F7F7F] placeholder:text-[14px]"
                          ></textarea>
                          <button
                            type="submit"
                            style={
                              comment.length > 0
                                ? { display: "inline-block" }
                                : { display: "none" }
                            }
                            className="text-[#0095F6] font-[600] flex pr-[20px]"
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
                onClick={() => {
                  deleteComment(commentIdDel.postId, commentIdDel.idComment);
                  setCommentDel(false);
                }}
              >
                Удалить
              </button>
            ) : null}
            <button
              onClick={() => setCommentDel(false)}
              className="py-[12px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[#000] dark:text-[#fff] text-[13px]"
            >
              Отмена
            </button>
          </ul>
        </DialogContent>
      </Dialog>
      <Dialog
        open={viewFollowers}
        onClose={() => setViewFollowers(false)}
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
            <div className="flex sticky top-0 items-center justify-center  py-[14px] border-b border-[#d3d3d3] dark:border-[#414141] text-center text-[13px] font-[700]">
              <div className="text-[15px] dark:text-[#F5F5F5]">
                {followers == "subscribers" ? "Подписчики" : "Ваши подписки"}
              </div>
              <div className="absolute right-[10px]">
                <CloseIcon
                  className="dark:text-[#F5F5F5] cursor-pointer"
                  onClick={() => setViewFollowers(false)}
                />
              </div>
            </div>
            <div className="w-full h-[50vh] overflow-y-auto px-[15px] py-[10px]">
              {followers &&
                user[followers].map((subs) => {
                  return (
                    <div className="flex items-center justify-between my-[10px]">
                      <div className="flex">
                        <Stack direction="row" spacing={1}>
                          <Avatar
                            src={`${import.meta.env.VITE_APP_FILES_URL}${
                              users?.find((user) => user.id === subs)?.avatar
                            }`}
                            sx={{ width: 40, height: 40 }}
                          />
                        </Stack>
                        <div className="ml-[15px]">
                          <h1 className="dark:text-[#F5F5F5] font-[600] flex  gap-x-[15px]">
                            <div className="cursor-pointer">
                              {
                                users?.find((user) => user.id === subs)
                                  ?.username
                              }
                            </div>
                          </h1>
                          <h1 className="dark:text-[#A8A8A8]">
                            {users?.find((user) => user.id === subs)?.name}
                          </h1>
                        </div>
                      </div>
                      {subs!==+getToken().sub&&
                       <button
                       onClick={() => follow(subs)}
                       style={
                         users
                           ?.find((user) => user.id == +getToken().sub)
                           .subscriptions.includes(subs)
                           ? {}
                           : { backgroundColor: "#0095F6"}
                       }
                       className=" w-auto px-[15px] py-[8px] sm1:order-3  rounded-[10px]  dark:bg-[#363636] text-[#000] dark:text-[#F5F5F5] font-[600] text-center leading-[15px] md:px-[5px]"
                     >
                       {users
                         ?.find((user) => user.id == +getToken().sub)
                         .subscriptions.includes(subs)
                         ? "Подписки"
                         : "Подписаться"}
                     </button>
                      }
                      
                    </div>
                  );
                })}
            </div>
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewProfile;
