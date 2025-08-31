import React, { useContext } from "react";
import style from "./Changepasswordmodle.module.css";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { APi_BASEURL } from "../../../lib/Api";
import { UserContext } from "../../../Context/UserContext";
import toast from "react-hot-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { motion } from "framer-motion";
import { GrPowerCycle } from "react-icons/gr";

export default function Changepasswordmodle() {

  let { userLogin, setuserLogin } = useContext(UserContext);

  // -----------start open and close modle-------------
  const [openModal, setOpenModal] = useState(false);
        const [isLoding, setisLoding] = useState(false)
        
  function onCloseModal() {
    setOpenModal(!openModal);
  }
  // -----------start open and close modle--------------

  // ---------start schema -------
  const schema = z.object({
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Use at least 8 characters, including a capital letter, a small letter, a number, and a special symbol"
      ),
    newPassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Use at least 8 characters, including a capital letter, a small letter, a number, and a special symbol"
      ),
  });
    // ---------end schema -------


  // -----------start hook form-----
  let { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(schema),
  });

  function hadnleChangePaswword(value) {
    setisLoding(true)
    axios
      .patch(`${APi_BASEURL}/users/change-password`, value, {
        headers: {
          token: userLogin,
        },
      })
      .then((res) => {
        // console.log(res.data.message==="success");
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          toast.success("change password success 🎉");
          setisLoding(false)
          setOpenModal(false)
        }
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        toast.error(err.response.data.error);
                  setisLoding(false)

      });
  }
  // -----------end hook form-----

  return (
    <>
      <button
        className="p-4 bg-red-400 mt-4 cursor-pointer hover:bg-red-500 duration-[0.5s]"
        onClick={() => onCloseModal()}
      >
        change password
      </button>
      <div >
        {openModal ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50  ">
            {/* hna a7na frshana al div kolha w dnha zindex 3ale w 2olto atwston 3n tr2 flex  */}
            <StyledWrapper>
              <form
                className="form "
                onSubmit={handleSubmit(hadnleChangePaswword)}
              >
                <span onClick={() => onCloseModal()} className="cursor-pointer">
                  <IoMdCloseCircle className="text-white text-2xl ms-auto mt-2" />
                </span>
                <p id="heading">Change current password</p>
                {/* -------- start frist input------  */}
                <div className="field">
                  <svg
                    className="input-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  </svg>
                  <input
                    // autoComplete="off"
                    placeholder="your password"
                    className="input-field"
                    type="text"
                    autoComplete="off"
                    {...register("password")}
                  />
                </div>
                {/* -------- end frist input------  */}
                                {/* -----------start form state  ---------------*/}
                <div >
                  {formState.errors.password &&
                  formState.touchedFields.password ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.3 }}
                      className="text-red-500  mt-4 bg-red-300 text-center p-3.5 font-bold w-[80%] mx-auto  "
                    >
                      {formState.errors.password.message}
                    </motion.p>
                  ) : (
                    ""
                  )}
                </div>
                                {/* -----------end form state  ---------------*/}

                {/* start  second input  */}
                <div className="field">
                  <svg
                    className="input-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  </svg>
                  <input
                    placeholder="newPassword"
                    className="input-field"
                    type="password"
                    autoComplete="off"
                    {...register("newPassword")}
                  />
                </div>

                {/* -----------start form state  ---------------*/}
                <div >
                  {formState.errors.newPassword &&
                  formState.touchedFields.newPassword ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.3 }}
                      className="text-red-500  mt-4 bg-red-300 text-center p-3.5 font-bold w-[80%] mx-auto  "
                    >
                      {formState.errors.newPassword.message}
                    </motion.p>
                  ) : (
                    ""
                  )}
                </div>
                                {/* -----------end form state  ---------------*/}

                {/* end  second input  */}

                <button className="button3 mt-1 cursor-pointer" disabled={isLoding}>
                  {isLoding?<GrPowerCycle className="animate-spin mx-auto text"/>:'Change password'}
                </button>
              </form>
            </StyledWrapper>
          </div>
        ) : (
          ""
        )}
      </div>
      
    </>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 0.4em;
    background-color: #171717;
    border-radius: 25px;
    transition: 0.4s ease-in-out;
  }

  .form:hover {
    transform: scale(1.05);
    border: 1px solid black;
  }

  #heading {
    text-align: center;
    margin: 2em;
    color: rgb(255, 255, 255);
    font-size: 1.2em;
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    border-radius: 25px;
    padding: 0.6em;
    border: none;
    outline: none;
    color: white;
    background-color: #171717;
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  }

  .input-icon {
    height: 1.3em;
    width: 1.3em;
    fill: white;
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #d3d3d3;
  }

  .form .btn {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 2.5em;
  }

  .button1 {
    padding: 0.5em;
    padding-left: 1.1em;
    padding-right: 1.1em;
    border-radius: 5px;
    margin-right: 0.5em;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
  }

  .button1:hover {
    background-color: black;
    color: white;
  }

  .button2 {
    padding: 0.5em;
    padding-left: 2.3em;
    padding-right: 2.3em;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
  }

  .button2:hover {
    background-color: black;
    color: white;
  }

  .button3 {
    margin-bottom: 3em;
    padding: 0.5em;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
  }

  .button3:hover {
    background-color: red;
    color: white;
  }
`;
