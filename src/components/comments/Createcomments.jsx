import axios from "axios";
import React, { useContext, useState } from "react";
import { use } from "react";
import { useForm } from "react-hook-form";
import { APi_BASEURL } from "../../lib/Api";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";


export default function Createcomments(props) {
  let queryclient=useQueryClient()
  const [isLoding, setisLoding] = useState(false);
  let { userLogin } = useContext(UserContext);
  let { postid, togal } = props;

  let { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      post: postid,
      // lw mb3tsh a id props ll back t3ala anta b3ad register aktp value={postid}
    },
  });

  async function addComment(value) {
    setisLoding(true);
    // console.log(value);
    await axios
      .post(`${APi_BASEURL}/comments`, value, {
        headers: {
          token: userLogin,
        },
      })

      .then((res) => {
        if (res.data.message === "success") {
          toast.success("add commenet success✅");
          // console.log(res.data.message);
          setisLoding(false);
          reset("");
                  queryclient.invalidateQueries({queryKey:['userPosts']})
        queryclient.invalidateQueries({queryKey:['getPosts']})
        queryclient.invalidateQueries({queryKey:['getsingledata']})
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setisLoding(false);
      });
  }

  return (
    <>
      {/* -------start form-------  */}
      <div>
        {togal === postid && (
          <>
            <form
              className="flex justify-center mt-4 gap-4 "
              onSubmit={handleSubmit(addComment)}
            >
              <input
                type="text"
                className="border-2 border-black dark:border-white  w-[95%] placeholder:text-center placeholder:text-gray-500"
                placeholder="add comment........"
                {...register("content")}
              />
              <input type="text" className="hidden" {...register("post")} />
              <button
                disabled={isLoding}
                className="p-2 bg-blue-300 rounded-[10px]"
              >
                {isLoding ? "loding...." : "Add"}
              </button>
            </form>
          </>
        )}
      </div>
      {/* -------end form-------  */}
    </>
  );
}
