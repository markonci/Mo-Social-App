import React, { useContext } from 'react'
import style from './Login.module.css'
import  { useState } from "react";

import styled from "styled-components";

import signin from '../../assets/Login-rafiki.svg'

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import z from "zod";

import { zodResolver } from "./../../../node_modules/@hookform/resolvers/zod/src/zod";

import { FloatingLabel } from "flowbite-react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { UserContext } from '../../Context/UserContext';
import { APi_BASEURL } from '../../lib/Api';
import Loader from '../../loding compoents/loader/loader';

export default function Login() {
 const [errapi, seterrapi] = useState("");

  const [isloading, setisloading] = useState(false);

  let {userLogin,setuserLogin}=useContext(UserContext)

  // --------start regex-------//
  const navigate = useNavigate();
  
  const schema = z
    .object({
      email: z.email("invaild email"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Use at least 8 characters, including a capital letter, a small letter, a number, and a special symbol"
        ),
     
      
    })
   

  // hna 3mlna al refine 3la alobject  kolo 3lshan a3rf akarn ben atnen input  w a7d if condation w
  // --------end regex-------//

  //-----start bulid object-----//
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    // console.log(form);

    // let { register,handleSubmit } = form;
    // hna bdal ma a3ml mot8er form gwaha useForm w anadi 3leh w astract tab mana mmkn astrakt 3ltol mn useform wbda ast5dm 3ady
  });
  //-----end bulid object-----//

  // -------fn call api and handleRegister-------//
  function handleLogin(values) {
    setisloading(true);
    axios
      .post(`${APi_BASEURL}/users/signin`, values)
      .then((res) => {
        // console.log(res.data);
        
        if (res.data.message === "success") {
          toast.success("welcome Dear🙌😉", {
            duration: 2500,
          });

          setisloading(false);
            // console.log(res.data.token);
            localStorage.setItem('userToken',res.data.token)
              setuserLogin(res.data.token)
              // de gaya mn conttext User
              // console.log(userLogin);
              // console.log(userLogin);
              
              

          navigate("/");
          // hna b2olo ams7 kol aly fe al path 
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          duration: 2500,
        });
        setisloading(false);

        seterrapi(err.response.data.error);
      });
  }
  // -------fn call api and handleRegister -------//

  //----------------- start ui-----------------------
  return (
    <>
    {/* -------start motion background--------- */}
      <motion.div
        className="dark:bg-[url(/public/3d-render-low-poly-plexus-design-network-communications.jpg)] dark:bg-center dark:bg-cover  bg-[url(/public/17973908.jpg)] bg-center bg-cover  w-full min-h-dvh"
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6 }}
      >
            {/* -------end motion background--------- */}

        <div className="container w-10/12 mx-auto  ">
          {/* ----start error api---- */}
          <div>
            {errapi && (
              // hna lw b null hyb2a false fana b2olo lw gatlk message y3ni btrue && bt3rd aly b3d true
              // anma lw mktbnhash al condaion dh alstayel hyt3rd bs ah mn 8er al error bs htzhar fa 7lhaa dh
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6 }}
                className="text-center  bg-red-300 text-red-500 p-5 rounded-[10px]"
              >
                {errapi}
              </motion.h1>
            )}
          </div>
          {/* ----end error api---- */}

          <div className="grid md:grid-cols-2  items-center gap-2">
            {/* start img sgin In */}
            <motion.div
              className="md:col-span-1 max-md:hidden pt-20"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 10 }}
              transition={{ duration: 1.6, delay: 0.7 }}
            >
              <img src={signin} className="w-[100%] shadow-gray-400 " alt="" />
            </motion.div>
            {/* end  img sgin In */}

            <StyledWrapper className="md:col-span-1">
              <motion.div
                className={`glitch-form-wrapper flex justify-center align-middle md:mt-2.5 md:mb-2.5  max-md:h-dvh  pt-10 ${style.bg}`}
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: -10 }}
                transition={{ duration: 1.6, delay: 0.7 }}
              >
                <form
                  onSubmit={handleSubmit(handleLogin)}
                  className="glitch-card "
                >
                  {/* hna kda ana b2olo lma y7sal submit roh nadi 3la al handlesubmit aly bthandle al reolad
                  w bygm3aly aldata fe object w  yb3tha yl al funcation aly gowha */}
                  <div className="card-header">
                    <div className="card-title">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                        <path d="M12 11.5a3 3 0 0 0 -3 2.824v1.176a3 3 0 0 0 6 0v-1.176a3 3 0 0 0 -3 -2.824z" />
                      </svg>
                      <span>SECURE_DATA</span>
                    </div>
                    <div className="card-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="card-body ">


                    {/* input 2 */}
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        placeholder=" "
                      />
                      <label
                        htmlFor="email"
                        className="form-label"
                        data-text="email requrment"
                      >
                        email
                      </label>
                      {/* ----------start formstate------ */}
                      {formState.errors.email &&
                      formState.touchedFields.email ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                          className="text-red-500 text-3xlxl mt-4 bg-red-300 text-center p-3.5 font-bold  "
                        >
                          {formState.errors.email.message}
                        </motion.p>
                      ) : (
                        ''
                      )}
                      {/* ----------end formstate------ */}
                    </div>
                    {/* input 2 */}

                    {/* input 3 */}
                    <div className="form-group">
                      <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        {...register("password")}
                        placeholder=" "
                      />
                      <label
                        htmlFor="password"
                        className="form-label"
                        data-text="eng.mark"
                      >
                        password
                      </label>
                      {/* ----------start formstate------ */}
                      {formState.errors.password &&
                      formState.touchedFields.password ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                          className="text-red-500 text-3xlxl mt-4 bg-red-300 text-center p-3.5 font-bold  "
                        >
                          {formState.errors.password.message}
                        </motion.p>
                      ) : (
                        ""
                      )}
                      {/* ----------end formstate------ */}
                    </div>
                    {/* input 3 */}






                    {/* button sgin up */}
                    <button
                      data-text="Sgin in"
                      type="submit"
                      className="submit-btn"
                      disabled={isloading}
                    >
                      {isloading ? (
                        // loader from component loader
                        <Loader/>
                      ) : (
                        // loader from component loader
                        <span className="btn-text">Sign in</span>
                      )}
                    </button>
                    {/* button sgin up */}
                  </div>
                </form>
              </motion.div>
            </StyledWrapper>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// style form from uiverse
const StyledWrapper = styled.div`
  /* --- Root Variables for the component --- */
  .glitch-form-wrapper {
    --bg-color: #0d0d0d;
    --primary-color: #00f2ea;
    --secondary-color: #a855f7;
    --text-color: #e5e5e5;
    --font-family: "Fira Code", Consolas, "Courier New", Courier, monospace;
    --glitch-anim-duration: 0.5s;
  }

  .glitch-form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-family);
    // background-color: #050505;
  }

  /* --- Card Structure --- */
  .glitch-card {
    background-color: var(--bg-color);
    width: 100%;
    max-width: 380px;
    border: 1px solid rgba(0, 242, 234, 0.2);
    box-shadow: 0 0 20px rgba(0, 242, 234, 0.1),
      inset 0 0 10px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    margin: 1rem;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.5em 1em;
    border-bottom: 1px solid rgba(0, 242, 234, 0.2);
  }

  .card-title {
    color: var(--primary-color);
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .card-title svg {
    width: 1.2em;
    height: 1.2em;
    stroke: var(--primary-color);
  }

  .card-dots span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #00f2ea;
    margin-left: 5px;
  }

  .card-body {
    padding: 1.5rem;
  }

  /* --- Form Elements --- */
  .form-group {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .form-label {
    position: absolute;
    top: 0.75em;
    left: 0;
    font-size: 1rem;
    color: var(--primary-color);
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .form-group input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(0, 242, 234, 0.3);
    padding: 0.75em 0;
    font-size: 1rem;
    color: var(--text-color);
    font-family: inherit;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .form-group input:focus {
    border-color: var(--primary-color);
  }

  .form-group input:focus + .form-label,
  .form-group input:not(:placeholder-shown) + .form-label {
    top: -1em;
    font-size: 0.8rem;
    opacity: 1;
  }

  .form-group input:focus + .form-label::before,
  .form-group input:focus + .form-label::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);
  }

  .form-group input:focus + .form-label::before {
    color: var(--secondary-color);
    animation: glitch-anim var(--glitch-anim-duration)
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .form-group input:focus + .form-label::after {
    color: var(--primary-color);
    animation: glitch-anim var(--glitch-anim-duration)
      cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
  }

  @keyframes glitch-anim {
    0% {
      transform: translate(0);
      clip-path: inset(0 0 0 0);
    }
    20% {
      transform: translate(-5px, 3px);
      clip-path: inset(50% 0 20% 0);
    }
    40% {
      transform: translate(3px, -2px);
      clip-path: inset(20% 0 60% 0);
    }
    60% {
      transform: translate(-4px, 2px);
      clip-path: inset(80% 0 5% 0);
    }
    80% {
      transform: translate(4px, -3px);
      clip-path: inset(30% 0 45% 0);
    }
    100% {
      transform: translate(0);
      clip-path: inset(0 0 0 0);
    }
  }

  /* --- Button Styling --- */
  .submit-btn {
    width: 100%;
    padding: 0.8em;
    margin-top: 1rem;
    background-color: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    font-family: inherit;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
    overflow: hidden;
  }

  .submit-btn:hover,
  .submit-btn:focus {
    background-color: var(--primary-color);
    color: var(--bg-color);
    box-shadow: 0 0 25px var(--primary-color);
    outline: none;
  }

  .submit-btn:active {
    transform: scale(0.97);
  }

  /* --- Glitch Effect for Button --- */
  .submit-btn .btn-text {
    position: relative;
    z-index: 1;
    transition: opacity 0.2s ease;
  }

  .submit-btn:hover .btn-text {
    opacity: 0;
  }

  .submit-btn::before,
  .submit-btn::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    background-color: var(--primary-color);
    transition: opacity 0.2s ease;
  }

  .submit-btn:hover::before,
  .submit-btn:focus::before {
    opacity: 1;
    color: var(--secondary-color);
    animation: glitch-anim var(--glitch-anim-duration)
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .submit-btn:hover::after,
  .submit-btn:focus::after {
    opacity: 1;
    color: var(--bg-color);
    animation: glitch-anim var(--glitch-anim-duration)
      cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
  }

  @media (prefers-reduced-motion: reduce) {
    .form-group input:focus + .form-label::before,
    .form-group input:focus + .form-label::after,
    .submit-btn:hover::before,
    .submit-btn:focus::before,
    .submit-btn:hover::after,
    .submit-btn:focus::after {
      animation: none;
      opacity: 0;
    }

    .submit-btn:hover .btn-text {
      opacity: 1;
    }
  }
`;


 