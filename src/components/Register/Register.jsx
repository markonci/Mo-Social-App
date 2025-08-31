import React, { useState } from "react";
import style from "./Register.module.css";
import styled from "styled-components";
import sginup from "../../assets/Sign up-rafiki .svg";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "./../../../node_modules/@hookform/resolvers/zod/src/zod";
import { FloatingLabel } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { APi_BASEURL } from "../../lib/Api";
import Loader from "../../loding compoents/loader/loader";

export default function Register() {
  const [errapi, seterrapi] = useState("");

  const [isloading, setisloading] = useState(false);
  // --------start regex-------//
  const navigate = useNavigate();
  const schema = z
    .object({
      name: z
        .string()
        .min(1, "Name is Required")
        .max(10, "max length is 10 chars"),
      email: z.email("invaild email"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Use at least 8 characters, including a capital letter, a small letter, a number, and a special symbol"
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "invaild date ")
        .refine((date) => {
          const userdate = new Date(date);
          const nowdate = new Date();
          nowdate.setHours(0, 0, 0, 0);
          return userdate < nowdate;
        }, "cant't be future date"),
      gender: z.enum(
        ["male", "female"],
        "gender must be one of male or female"
      ),
    })
    .refine((x) => x.password === x.rePassword, {
      error: "password and rePassword not matched 😢!!",
      path: ["rePassword"],
    });
  // hna 3mlna al refine 3la alobject  kolo 3lshan a3rf akarn ben atnen input  w a7d if condation w
  // --------end regex-------//

  //-----start bulid object-----//
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    // console.log(form);

    // let { register,handleSubmit } = form;
    // hna bdal ma a3ml mot8er form gwaha useForm w anadi 3leh w astract tab mana mmkn astrakt 3ltol mn useform wbda ast5dm 3ady
  });
  //-----end bulid object-----//

  // -------fn call api and handleRegister-------//
  function handleRegister(values) {
    setisloading(true);
    axios
      .post(`${APi_BASEURL}/users/signup`, values)
      .then((res) => {
        // console.log(res.data.message);
        if (res.data.message === "success") {
          toast.success("Now you can log in, my friend 😎", {
            duration: 2500,
          });

          setisloading(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        // console.log(err.response.data.error);
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
        className="  dark:bg-[url(/public/v1016-b-09.jpg)] dark:bg-center dark:bg-cover bg-[url(/public/17973908.jpg)] bg-center bg-cover  w-full min-h-dvh"
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
            {/* start img sgin up */}
            <motion.div
              className="md:col-span-1 max-md:hidden"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 10 }}
              transition={{ duration: 1.6, delay: 0.7 }}
            >
              <img src={sginup} className="w-[100%] shadow-gray-400 " alt="" />
            </motion.div>
            {/* end  img sgin up */}

            <StyledWrapper className="md:col-span-1">
              <motion.div
                className={`glitch-form-wrapper flex justify-center align-middle md:mt-2.5 md:mb-2.5 pt-20  ${style.bg}`}
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: -10 }}
                transition={{ duration: 1.6, delay: 0.7 }}
              >
                <form
                  onSubmit={handleSubmit(handleRegister)}
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
                  <div className="card-body">
                    {/* input 1 */}
                    <div className="form-group">
                      <input
                        type="text"
                        id="username"
                        {...register("name")}
                        placeholder=" "
                      />
                      <label
                        htmlFor="username"
                        className="form-label"
                        data-text="USERNAME requrment"
                      >
                        USERNAME
                      </label>
                      {/* ----------start formstate------ */}
                      {formState.errors.name && formState.touchedFields.name ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                          className="text-red-500 text-3xlxl mt-4 bg-red-300 text-center p-3.5 font-bold  "
                        >
                          {formState.errors.name.message}
                        </motion.p>
                      ) : (
                        ""
                      )}
                      {/* ----------end formstate------ */}
                    </div>
                    {/* input 1 */}

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
                        ""
                      )}
                      {/* ----------end formstate------ */}
                    </div>
                    {/* input 2 */}

                    {/* input 3 */}
                    <div className="form-group">
                      <input
                        type="password"
                        id="password"
                        {...register("password")}
                        placeholder=" "
                        autoComplete="off"
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

                    {/* input 4 */}
                    <div className="form-group">
                      <input
                        type="password"
                        id="rePassword"
                        {...register("rePassword")}
                        placeholder=" "
                        autoComplete="off"
                      />
                      <label
                        htmlFor="re-Password"
                        className="form-label"
                        data-text="re-Password"
                      >
                        re-Password
                      </label>

                      {/* ----------start formstate------ */}
                      {formState.errors.rePassword &&
                      formState.touchedFields.rePassword ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                          className="text-red-500 text-3xlxl mt-4 bg-red-300 text-center p-3.5 font-bold  "
                        >
                          {formState.errors.rePassword.message}
                        </motion.p>
                      ) : (
                        ""
                      )}
                      {/* ----------end formstate------ */}
                    </div>
                    {/* input 4 */}

                    {/* input 5 */}
                    <div className="form-group">
                      <input
                        type="date"
                        id="dateOfBirth"
                        {...register("dateOfBirth")}
                        placeholder=" "
                      />
                      <label
                        htmlFor="dateOfBirth"
                        className="form-label"
                        data-text="eng.mark"
                      >
                        dateOfBirth
                      </label>
                      {/* ----------start formstate------ */}
                      {formState.errors.dateOfBirth &&
                      formState.touchedFields.dateOfBirth ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                          className="text-red-500 text-3xlxl mt-4 bg-red-300 text-center p-3.5 font-bold  "
                        >
                          {formState.errors.dateOfBirth.message}
                        </motion.p>
                      ) : (
                        ""
                      )}
                      {/* ----------end formstate------ */}
                    </div>
                    {/* input 5 */}

                    {/* -----------start radio input ------ */}
                    <div className="flex flex-col items-start gap-4 overflow-hidden rounded-md p-6 shadow-sm justify-center shadow-[#00000050] ">
                      <span className="text-center font-mono text-base font-black uppercase text-[#08AFD5]">
                        Please select your gender
                      </span>

                      <div className="flex items-center gap-6 justify-center mx-auto">
                        <div className="relative flex h-[50px] w-[50px] items-center justify-center">
                          <input
                            type="radio"
                            id="male"
                            {...register("gender")}
                            defaultValue="male"
                            className="peer z-10 h-full w-full cursor-pointer opacity-0"
                          />
                          <div className="absolute h-full w-full rounded-full bg-blue-100 p-4 shadow-sm shadow-[#00000050] ring-blue-400  transition  duration-[0.6s] peer-checked:scale-300 peer-checked:ring-2 " />
                          <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-blue-200 duration-500 peer-checked:scale-[500%]" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50px"
                            height="50px"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="absolute stroke-blue-400"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.5631 16.1199C14.871 16.81 13.9885 17.2774 13.0288 17.462C12.0617 17.6492 11.0607 17.5459 10.1523 17.165C8.29113 16.3858 7.07347 14.5723 7.05656 12.5547C7.04683 11.0715 7.70821 9.66348 8.8559 8.72397C10.0036 7.78445 11.5145 7.4142 12.9666 7.71668C13.9237 7.9338 14.7953 8.42902 15.4718 9.14008C16.4206 10.0503 16.9696 11.2996 16.9985 12.6141C17.008 13.9276 16.491 15.1903 15.5631 16.1199Z"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path d="M14.9415 8.60977C14.6486 8.90266 14.6486 9.37754 14.9415 9.67043C15.2344 9.96332 15.7093 9.96332 16.0022 9.67043L14.9415 8.60977ZM18.9635 6.70907C19.2564 6.41617 19.2564 5.9413 18.9635 5.64841C18.6706 5.35551 18.1958 5.35551 17.9029 5.64841L18.9635 6.70907ZM16.0944 5.41461C15.6802 5.41211 15.3424 5.74586 15.3399 6.16007C15.3374 6.57428 15.6711 6.91208 16.0853 6.91458L16.0944 5.41461ZM18.4287 6.92872C18.8429 6.93122 19.1807 6.59747 19.1832 6.18326C19.1857 5.76906 18.8519 5.43125 18.4377 5.42875L18.4287 6.92872ZM19.1832 6.17421C19.1807 5.76001 18.8429 5.42625 18.4287 5.42875C18.0145 5.43125 17.6807 5.76906 17.6832 6.18326L19.1832 6.17421ZM17.6973 8.52662C17.6998 8.94082 18.0377 9.27458 18.4519 9.27208C18.8661 9.26958 19.1998 8.93177 19.1973 8.51756L17.6973 8.52662ZM16.0022 9.67043L18.9635 6.70907L17.9029 5.64841L14.9415 8.60977L16.0022 9.67043ZM16.0853 6.91458L18.4287 6.92872L18.4377 5.42875L16.0944 5.41461L16.0853 6.91458ZM17.6832 6.18326L17.6973 8.52662L19.1973 8.51756L19.1832 6.17421L17.6832 6.18326Z" />
                          </svg>
                        </div>

                        <div className="relative flex h-[50px] w-[50px] items-center justify-center">
                          <input
                            type="radio"
                            id="female"
                            {...register("gender")}
                            defaultValue="female"
                            className="peer z-10 h-full w-full cursor-pointer opacity-0"
                          />
                          <div className="absolute h-full w-full rounded-full bg-pink-100 p-2 shadow-sm shadow-[#00000050] ring-pink-400 transition  duration-[0.6s] peer-checked:scale-300 peer-checked:ring-2" />
                          <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-pink-200 duration-500 peer-checked:scale-[500%]" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35px"
                            height="35px"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="absolute fill-pink-400"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"
                            />
                          </svg>
                        </div>
                      </div>
                      {/* ----------start formstate------ */}
                      {formState.errors.gender &&
                      formState.touchedFields.gender ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                          className="text-red-500 text-3xlxl mt-4 bg-red-300 text-center p-3.5 font-bold  "
                        >
                          {formState.errors.gender.message}
                        </motion.p>
                      ) : (
                        ""
                      )}
                      {/* ----------end formstate------ */}
                    </div>
                    {/* -----------end  radio input ------ */}

                    {/* button sgin up */}
                    <button
                      data-text="Sgin up"
                      type="submit"
                      className="submit-btn"
                      disabled={isloading}
                    >
                      {isloading ? (
                        // loader from component loader
                        <Loader/>
                      ) : (
                        // loader from component loader
                        <span className="btn-text">Sign up</span>
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
