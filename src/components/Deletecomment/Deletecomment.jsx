import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { GrPowerCycle } from "react-icons/gr";
import { APi_BASEURL } from "../../lib/Api";
import toast from "react-hot-toast";
export default function Deletecomment({ id }) {
  let query = useQueryClient();

  //------------ start show -----------
  const [isShow, setisShow] = useState(false);

  function handleShow() {
    setisShow(!isShow);
  }
  //------------ end show -----------

  const [isLoding, setisLoding] = useState();
  function deleteComments() {
    setisLoding(true);
    axios
      .delete(`${APi_BASEURL}/comments/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          toast.success("delete post successfuly🎉🎉");
          setisLoding(false);
          setisShow(false);
          query.invalidateQueries({ queryKey: ["userPosts"] });
          query.invalidateQueries({ queryKey: ["getPosts"] });
          query.invalidateQueries({ queryKey: ["getsingledata"] });
        }
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        toast.error("I can't delete this comment");
        setisLoding(false);
      });
  }

  return (
    <>
      {/* button open modle delete  */}
      <button
        onClick={handleShow}
        className="align-middle mt-3 pt-2 text-2xl cursor-pointer me-3 dark:text-white text-black dark:hover:text-black hover:text-blue-500 transition duration-[0.3s]"
      >
        <IoIosCloseCircleOutline />
      </button>
      {/* button open modle delete  */}

      {isShow && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="group select-none bg-black/50  border border-gray-800 shadow-lg rounded-2xl fixed  flex justify-center items-center inset-0  "
          >
            <div className="bg-gray-800">
              <div className="text-center p-3 flex-auto justify-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    fillRule="evenodd"
                  />
                </svg>
                <h2 className="text-xl font-bold py-4 text-gray-200">
                  Are you sure?
                </h2>
                <p className="font-bold text-sm text-gray-500 px-2">
                  Do you really want to continue ? This process cannot be undone
                </p>
              </div>
              <div className="p-2 mt-2 text-center space-x-1 md:block">
                <button
                  onClick={handleShow}
                  className="mb-2 cursor-pointer md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                >
                  Cancel
                </button>
                <button
                  disabled={isLoding}
                  onClick={() => deleteComments()}
                  className="bg-red-500 cursor-pointer hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                >
                  {isLoding ? (
                    <GrPowerCycle className="animate-spin mx-auto text" />
                  ) : (
                    "Confirm Delete?"
                  )}{" "}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
