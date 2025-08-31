import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { APi_BASEURL } from "../../../lib/Api";
import { UserContext } from "../../../Context/UserContext";
import Lodingpage from "../../../loding compoents/Lodingpage/Lodingpage";
import Userposts from "../userposts/userposts";
import Createcomments from "../../comments/Createcomments";
import Changepasswordmodle from "../Changepasswordmodle/Changepasswordmodle";
import Uploadprofilephoto from "../Uploadprofilephoto/Uploadprofilephoto";
import Addpost from './../Addpost/Addpost';
// import {Helmet} from "react-helmet";

export default function ProfileUser() {
  let { userLogin } = useContext(UserContext);
 
 
  function getUserData() {

    return axios.get(`${APi_BASEURL}/users/profile-data`, {
      headers: {
        token: userLogin,
      },
    });
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["uesrData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });
  // console.log(data);

// start loding
  if (isLoading) {
    return (
      <div className="min-h-dvh dark:bg-[#1C1C1D] bg-[#45556C]">
        {<Lodingpage />}
      </div>
    );
  }
  // hna 3mlt min-h-dvh  3lshan  yb2a btol alsf7a watdlo astyle al sf7a
  // end loding 

// start error 
  if (isError) {
    return <div  className="min-h-dvh dark:bg-[#1C1C1D] bg-[#45556C] pt-20 text-center text-white text-2xl">{error.message}</div>
    
  }
// end error

  return (
    <>

    <div>
      {/* <Helmet>
        <title>Profile</title>
      </Helmet> */}
    </div>
      <div className="background dark:bg-[#1C1C1D] bg-[#45556C] min-h-dvh ">
        <div className="container w-[90%] md:w-10/12 mx-auto   pt-20  ">
        {/* -----------start componet add post-----------  */}
                <Addpost data={data}/>
        {/* -----------end componet add post-----------  */}

          <div className="w-full md:w-[50%]  mx-auto bg-amber-700 dark:border-2 dark:border-white  border-2 border-green-400 text-justify rounded-2xl shadow-2xl shadow-red-400 dark:shadow-gray-400 mb-12" >
            <div className="mt-4">
              <img
                src={data?.photo}
                className="w-[100px] h-[100px] rounded-full mx-auto"
                alt=""
              />
            </div>

            {/* start text */}
            <div className="mt-3 text-center p-4 text-white dark:text-black">
              <h3 className="text-2xl mb-7">Name: {data?.name}</h3>
              <div className="md:flex md:justify-evenly mb-2 ">
                <p>date of Brith: {data?.dateOfBirth}</p>
                <p>my Gender: {data?.gender}</p>
              </div>

              <div className="md:flex md:justify-evenly md:gap-2 md:mt-5 ">
                <p>my Email: {data?.email}</p>
                <p>
                  Account creation date:{" "}
                  {dayjs(data?.createdAt).format("DD-MM-YYYY")}
                </p>
              </div>
              <div className="md:flex items-center md:justify-evenly md:gap-2 ">
                <Changepasswordmodle/>
                <Uploadprofilephoto/>
              </div>
              <h4 className="mt-7 capitalize text-2xl text-green-400 dark:text-cyan-900 font-bold">
                Welcome to our Mo Social App😎
              </h4>
            </div>
          </div>
          {/* end text */}
        </div>

        <Userposts id={data?._id}/>
      </div>
    </>
  );
}
