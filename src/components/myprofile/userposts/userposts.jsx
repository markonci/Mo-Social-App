import React, { useContext, useState } from "react";
import axios from "axios";
import { APi_BASEURL } from "../../../lib/Api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs/esm";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import Lodingpage from "../../../loding compoents/Lodingpage/Lodingpage";
import { FcLikePlaceholder } from "react-icons/fc";
import Createcomments from "../../comments/Createcomments";
import Updatepost from "../Updatepost/Updatepost";
import DeletepostsUSer from "../DeletepostsUSer/DeletepostsUSer";
import Getcomments from "../../Getcomments/Getcomments";

export default function Userposts({ id }) {
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
  // -------------end like togle ----------

  function getUserPosts() {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["userPosts"],
    queryFn: getUserPosts,
    select: (data) => data?.data?.posts,
    refetchInterval: 40000,
    staleTime: 20000,
  });
  // console.log(data);

  // -----------start error--------
  if (isError) {
    return (
      <h3 className="text-center text-2xl text-white mt-4">{error.message}</h3>
    );
  }
  // ------------end error---------

  return (
    <>
      <div>{isLoading ? <Lodingpage /> : ""}</div>
      {data?.map((post) => (
        <div key={post.id}>
          {/* start container */}
          <div className="container w-[95%] md:w-10/12  mx-auto ">
            <div className="w-full md:w-[50%] lg-[60%] mx-auto rounded-md mb-[7px] text-black dark:text-white bg-white  dark:bg-[#252728] overflow-hidden p-4 shadow-2xl">
              {/* start header  */}
              <div className="row items-center gap-4">
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
                                        w lma ahover 3leha title blw2at */}
                    </li>
                  </ul>
                </span>

                <div className="flex ms-auto ">
                  

                                        <DeletepostsUSer  id={post.id} />
                {/*-------- start update post component ------ */}
                                <Updatepost id={post.id}/>
                {/*-------- end update post component ------ */}

                </div>
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
                  comment {post?.comments.length }
                </button>
                <button className="row items-center gap-2 cursor-pointer  ">
                  <FaRegShareFromSquare />
                  share
                </button>
              </div>
              {/* end section react */}

                        {/* start comments components  */}
                        {/* start creatcomments comoponent  */}
              <Createcomments togal={togleComment} postid={post.id} />
                              <Getcomments  togal={togleComment} postid={post?.id} comment={post?.comments[0]}/> 
                        {/* end comments components  */}
              
                        {/* end creatcomments comoponent  */}
            </div>
          </div>
          {/* end container */}
        </div>
      ))}
    </>
  );
}
