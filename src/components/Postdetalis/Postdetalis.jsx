import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { APi_BASEURL } from "../../lib/Api";
// import { AllPostcontext } from "../../Context/PostsContext";
import dayjs from "dayjs/esm";
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import Lodingpage from "../../loding compoents/Lodingpage/Lodingpage";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FcLikePlaceholder } from "react-icons/fc";
import Createcomments from "../comments/Createcomments";
import Getcomments from "../Getcomments/Getcomments";


export default function Postdetalis() {
  let { id } = useParams();
  // console.log(id);

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

  function getSinglePost() {
    return axios.get(`${APi_BASEURL}/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["getsingledata"],
    queryFn: getSinglePost,
    select: (data) => data?.data?.post,
  });
  // console.log(data);

  // console.log(data?.data?.data);

  return (
    <>
    {/* <Helmet>
      <title>
        Postdetalis
      </title>
    </Helmet> */}
      {/* end loading page */}

      <div className="background bg-slate-600 dark:bg-[#1C1C1D] pt-20 min-h-dvh">
        {/* start error mesage  */}
        <h3 className="text-white text-center text-2xl">
          {isError ? error.message : ""}
        </h3>
        {/* end error mesage  */}

        <div>
          {isLoading ? (
            <Lodingpage />
          ) : (
            <div>
              {/* start container */}
              <div className="container w-[95%] md:w-10/12  mx-auto ">
                <div className="w-full md:w-[50%] lg-[60%] mx-auto rounded-md mb-[7px] text-black dark:text-white bg-white  dark:bg-[#252728] overflow-hidden p-4 shadow-2xl">
                  {/* start header  */}
                  <div className="row items-center gap-2">
                    <span>
                      <img
                        src={data?.user.photo}
                        className="w-[50px] h-[50px] rounded-full"
                        alt=""
                      />
                    </span>
                    <span>
                      {data?.user.name}
                      <ul className="row justify-between text-slate-600">
                        <li>
                          {" "}
                          <p>
                            {dayjs(data?.createdAt).format("D ddd-MMM-YYYY")}
                          </p>
                        </li>
                        <li className="ms-2">
                          {" "}
                          <p title={dayjs(data?.createdAt).format("hh:mm A")}>
                            {dayjs(data?.createdAt).fromNow()}
                          </p>
                          {/* hna 3mlna import  fromNow w extand leha fe dayjs 
                                        w lma ahover 3leha title blw2at */}
                        </li>
                      </ul>
                    </span>
                  </div>
                  {/* end header */}

                  {/* start body */}
                  {data?.body && <h1 className="mt-3">{data?.body}</h1>}
                  {data?.image && (
                    <img
                      src={data?.image}
                      className="w-full rounded-[20px] p-4"
                      alt={data?.body}
                    />
                  )}
                  {/* end body */}

                  {/* start hr  */}
                  <hr className="w-[90%] mx-auto mb-2" />
                  {/* end hr */}

                  {/* start section react */}
                  <div className="row gap-4 justify-evenly">
                    <button
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => Liketoglemoode(data?.id)}
                    >
                      {Liketogle === data?.id ? (
                        <FcLike />
                      ) : (
                        <FcLikePlaceholder />
                      )}
                      Like
                    </button>
                    <button
                      className="row items-center gap-2 cursor-pointer"
                      onClick={() => togleCommentmood(data?.id)}
                    >
                      <FaCommentDots />
                      comment {data?.comments.length}
                    </button>
                    <button className="row items-center gap-2 cursor-pointer  ">
                      <FaRegShareFromSquare />
                      share
                    </button>
                  </div>
                  {/* end section react */}
                        {/* start comment componets  */}
                        {/* start comment create componets  */}
                  <Createcomments togal={togleComment} postid={data?.id} />
                        {/* end comment create componets  */}
                        {/* start   get comment componets  */}
                        {data?.comments.map((comment)=><Getcomments comment={comment}/>)}
                        {/* end   get comment componets  */}
                        {/* end comment componets  */}
                  {/* hna a7na ah 8rena al qema mn post?.id l data?.id  bs lsa alsm aly bstlm beha hnak how a howa 3lshan kda ast8galt 

                  nfs almodo3 fe al home togal={togleComment} postid={post?.id} fa lma natdo fe alprofile kont lazem aktbohm 
                  alkholsa lazem lma ast5dem alqozeia de fe ay component tany 3ady lw alqema at8ert 3la 7sb al case bs lazem al key 
                  yb2a howa howa zy msln (postid ) w   (togal) */}
                </div>
              </div>
              {/* end container */}
              {/* end container */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
