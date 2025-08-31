import React, { useContext, useState } from 'react'
import style from './Updatepost.module.css'
import { motion } from 'framer-motion';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";


import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { APi_BASEURL } from './../../../lib/Api';
import { UserContext } from './../../../Context/UserContext';
import { toast } from 'react-hot-toast';
import { GrPowerCycle } from 'react-icons/gr';

export default function Updatepost({id}) {
  let queryclinet=useQueryClient()
  const [isLoding, setisLoding] = useState(false)

  let{userLogin}=useContext(UserContext)
  // --------start show mode ----------
  const [isShow, setisShow] = useState(false)
  
  function changeIsShow() {
    setisShow(!isShow)
  }
  // --------end show mode ----------



  let {handleSubmit,register}=useForm({
    defaultValues:{
      body:'',
      image:''
    }
  })

function handleupdatepost(value) {

  let myupdatepost=new FormData()

  myupdatepost.append('body',value.body)
  myupdatepost.append('image',value.image[0])

  // console.log(myupdatepost);
  
      setisLoding(true)

  axios.put(`${APi_BASEURL}/posts/${id}`,myupdatepost,{
    headers:{
      token:userLogin,
    }
  })
  .then((res)=>{
    // console.log(res.data.message);
    if (res.data.message==='success') {
      
      toast.success('Post updated successfully my friend 🖤')

      setisShow(false)
      setisLoding(false)
      queryclinet.invalidateQueries({queryKey:['userPosts']})
    }
    
  })
  .catch((err)=>{
    // console.log(err.response.data.error);
    toast.error(err.response.data.error)
          // setisShow(false)
                setisLoding(false)

    
  })
  
}




  return (
    <>
    
    {isShow&&<motion.div
      initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
    >
      
        <StyledWrapper className='fixed  inset-0 flex justify-center items-center bg-black/50'>
        
      <form className="form " onSubmit={handleSubmit(handleupdatepost)}>
        {/*-------- start close button ------------- */}
        <button onClick={changeIsShow} className='ms-auto pt-2 text-2xl cursor-pointer text-white hover:text-black transition duration-[0.3s]'><IoIosCloseCircleOutline/></button>
        
        {/*-------- end close button ------------- */}
        <p id="heading">Updatepost</p>

        {/* ---------start input 1 ----------*/}
        <div className="field">

          {/* <input autoComplete="off" placeholder="Username" className="input-field" type="text" /> */}
          <textarea id="" className='w-full focus:outline-0' placeholder='update content...' {...register('body')}></textarea>
        </div>
        {/* ---------end input 1 ----------*/}
        
        {/* ---------start input 2-------- */}
        <div className="field">

          <input placeholder="Change the content of the image..... " className="input-field hidden" type="file" id='image' {...register('image')} />
          <label htmlFor="image" className='text-center cursor-pointer'><CiImageOn className='items-center mx-auto text-5xl'/>
          <br />
          add image
          </label>
                  <br />
        </div>
        {/* ---------end input 2-------- */}

        <div className="btn">
          <button onClick={changeIsShow} className="button1 hover:bg-red-400 cursor-pointer">cancel</button>
          <button disabled={isLoding} className="button2 cursor-pointer">{isLoding?<GrPowerCycle className="animate-spin mx-auto text"/>:'Confirm post update?'}</button>
        </div>
      </form>
    </StyledWrapper>
      
    </motion.div>}
    <button onClick={changeIsShow} className='  text-3xl cursor-pointer'>...</button>

    </>
  )
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
    transition: .4s ease-in-out;
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
    transition: .4s ease-in-out;
    background-color: #252525;
    color: white;
  }

  .button1:hover {
    background-color: red;
    color: white;
  }

  .button2 {
    padding: 0.5em;
    padding-left: 2.3em;
    padding-right: 2.3em;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: .4s ease-in-out;
    background-color: #252525;
    color: white;
  }

  .button2:hover {
    background-color: green;
    color: white;
  }

  .button3 {
    margin-bottom: 3em;
    padding: 0.5em;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: .4s ease-in-out;
    background-color: #252525;
    color: white;
  }

  .button3:hover {
    background-color: red;
    color: white;
  }`;
