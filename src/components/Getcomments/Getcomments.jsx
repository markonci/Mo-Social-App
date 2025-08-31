import React from "react";
import style from "./Getcomments.module.css";
import axios from "axios";
import { APi_BASEURL } from "../../lib/Api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs/esm";
import Updatecomment from "../Updatecomment/Updatecomment";
import Deletecomment from "../Deletecomment/Deletecomment";
// import dayjs from "dayjs";
export default function Getcomments(props) {
  let { togal, postid, comment } = props;

  // function getcomments() {
  //   return axios.get(`https://linked-posts.routemisr.com/posts/${postid}/comments`,{
  //     headers:{
  //       token:localStorage.getItem('userToken')
  //     }
  //   })
  // }
  // console.log(comment);

  // let{data}=useQuery({
  //   queryKey:['getCommonts'],
  //   queryFn:getcomments,
  //   select:(data)=>data?.data
  // })

  // console.log(data);

  return (
    <>
      {togal === postid && (
        <>
          <div className="container mt-4 ">
            <div className="justify-end flex">
              <Deletecomment id={comment?._id}/>
              <Updatecomment id={comment?._id}/>
            </div>
            <div className="flex gap-3 items-center">
              <img
                className="rounded-full w-[50px] h-[50px] border-amber-200 border-2"
                src={comment?.commentCreator?.photo}
                alt="not-found"
              />
              <div className="dark:bg-[#333334] bg-cyan-100 rounded-2xl w-full ">
                <p className="ms-4 p-1 font-black dark:text-slate-500 ">
                  {comment?.commentCreator?.name}
                </p>
                <h1 className="ms-4 p-1">{comment?.content}</h1>
              </div>
            </div>
            <p
              className="mt-2"
              title={dayjs(comment?.createdAt).format("hh:mm A")}
            >
              <span className="ms-15 ">
                {dayjs(comment?.createdAt).fromNow()}
              </span>
            </p>
          </div>
        </>
      )}
    </>
  );
}
