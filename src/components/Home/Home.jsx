import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { APi_BASEURL } from "../../lib/Api";
// import { AllPostcontext } from "../../Context/PostsContext";
import dayjs from "dayjs/esm";
import relativeTime from "dayjs/plugin/relativeTime";
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import Lodingpage from "../../loding compoents/Lodingpage/Lodingpage";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FcLikePlaceholder } from "react-icons/fc";
import Createcomments from "../comments/Createcomments";
import Addpost from "../myprofile/Addpost/Addpost";
import Getcomments from "../Getcomments/Getcomments";
// import {Helmet} from "react-helmet";


dayjs.extend(relativeTime);

export default function Home() {
  // --------start show input comment ---------
  const [togleComment, settogleComment] = useState(null);

  function togleCommentmood(postid) {
    settogleComment((prev) => (prev === postid ? null : postid));
  }
  // --------end show input comment ---------

  // function togleCommentmood() {
  //   if (togleComment){
  //     settogleComment(false)
  //   }
  //   else{
  //     settogleComment(true)
  //   }
  // }
  // -------------start like togle ----------
  const [Liketogle, setLiketogle] = useState(null);

  function Liketoglemoode(postid) {
    setLiketogle((prev) => (prev === postid ? null : postid));
  }

  //------------- start call api profile data---------------
  function getUserData() {
    return axios.get(`${APi_BASEURL}/users/profile-data`, {
      headers: {
        token: userLogin,
      },
    });
  }

  let {} = useQuery({
    queryKey: ["uesrData"],
    queryFn: getUserData,
    // select: (data) => data?.data?.user,
    // // natdha hna 3lshan yb3t request wa7ed bs awal ma yaft7 al home f baltali hysm3 fe alporfile awal ma aft7  w fe nav
    // fa ka porfmance b2a asr3 l2ny mb2atsh m7tag astana sf7t al profile t3ml loding b2t tzher 3ltol
  });
  //---------------- end call api profile data-----------------

  //-------------- start call api home posts------------
  let { userLogin } = useContext(UserContext);

  function getAllPosts() {
    return axios.get(`${APi_BASEURL}/posts?limit=50&sort=-createdAt`, {
      // sort=-createdAt daft alsatr dh 3la al api 3lshan ygaply a7ds al postat

      headers: {
        // token:localStorage.getItem('userToken')
        token: userLogin,
        //gaya mn al usercontext
      },
    });
  }

  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
    staleTime: 12000,
    refetchInterval: 30000,
    select: (data) => data?.data?.posts,
    // hna ana b2olo data aly gatlk  hat mnha al posts w dlwat hmap 3la data bs
    // w by defult aly byega fe al arrow fn howa aldata
    // w 2aderl b3den a3ml 3leha flter w 2olo hat bs  id bt3 al user
  });
  // console.log(data);
  // console.log(data?.data?.posts);

  // ------------end call api home posts-------------
// console.log(data);

  return (

    <>
  <div>
    
  </div>
      {/* start loading page */}
      <div>{isLoading ? <Lodingpage /> : ""}</div>
      {/* end loading page */}

      <div className="background bg-slate-600 dark:bg-[#1C1C1D] pt-20 min-h-dvh">
          <Addpost data={data?.data?.user?.photo} />
        {/* start error mesage  */}
        <h3 className="text-white text-center text-2xl">
          {isError ? error.message : ""}
        </h3>
        {/* end error mesage  */}
        {data?.map((post) => (
          
          <div key={post.id}>
            {/* start container */}
            <div className="container w-[95%] md:w-10/12  mx-auto ">
              <div className="w-full md:w-[50%] lg-[60%] mx-auto rounded-md mb-[7px] text-black dark:text-white bg-white  dark:bg-[#252728] overflow-hidden p-4 shadow-2xl">
                {/* start header  */}
                <div className="row items-center gap-2">
                  <span>
                    <img
                      src={post.user.photo}
                      className="w-[50px] h-[50px] rounded-full"
                      alt=""
                    />
                  </span>
                  <span>
                    {post.user.name}
                    <ul className="row justify-between text-slate-600">
                      <li>
                        {" "}
                        <p>{dayjs(post.createdAt).format("D ddd-MMM-YYYY")}</p>
                      </li>
                      <li className="ms-2">
                        {" "}
                        <p title={dayjs(post.createdAt).format("hh:mm A")}>
                          {dayjs(post.createdAt).fromNow()}
                        </p>
                        {/* hna 3mlna import  fromNow w extand leha fe dayjs 
                                    w import Addpost from './../myprofile/Addpost/Addpost';
lma ahover 3leha title blw2at */}
                      </li>
                    </ul>
                  </span>
                </div>
                {/* end header */}

                {/* start body */}
                {post.body && <h1 className="mt-3">{post.body}</h1>}
                <Link to={`/postdetalis/${post.id}`}>
                  {post.image && (
                    <img
                      src={post.image}
                      className="w-full rounded-[20px] p-4"
                      alt={post.body}
                    />
                  )}
                </Link>
                {/* end body */}

                {/* start hr  */}
                <hr className="w-[90%] mx-auto mb-2" />
                {/* end hr */}

                {/* start section react */}
                <div className="row gap-4 justify-evenly">
                  <button
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => Liketoglemoode(post.id)}
                  >
                    {Liketogle === post.id ? <FcLike /> : <FcLikePlaceholder />}
                    Like
                  </button>
                  <button
                    className="row items-center gap-2 cursor-pointer"
                    onClick={() => togleCommentmood(post.id)}
                  >
                    <FaCommentDots />
                    comment {post.comments.length}
                  </button>
                  <button className="row items-center gap-2 cursor-pointer  ">
                    <FaRegShareFromSquare />
                    share
                  </button>
                </div>
                {/* end section react */}
                    {/* start comments componts   */}
                    {/* start create comments componts   */}
                <Createcomments togal={togleComment} postid={post.id} />
                <Getcomments  togal={togleComment} postid={post?.id} comment={post?.comments[0]}/> 
                    {/* end create comments componts   */}
                    {/* start comments componts   */}
              </div>
            </div>
            {/* end container */}
          </div>
        ))}
      </div>
    </>
  );
}

{
  /* <div className="dark:bg-black bg-white">
        <div className="container w-10/12 mx-auto">
          <div className="row gap-3">
            <div className=" md:w-1/2 bg-amber-300 ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
              cupiditate animi iusto non? Quia nulla eligendi voluptatibus,
              atque explicabo repellat. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Delectus sit expedita id, unde quae tempora
              provident saepe nihil laborum dicta!
            </div>
            <div className=" md:w-1/3 bg-red-300 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit quaerat consequuntur ratione omnis quidem accusamus
              odio recusandae fuga facere eaque?
            </div>
          </div>
        </div>
      </div> */
}
