import React, { useContext, useState } from 'react'
import style from './Updatecomment.module.css'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { UserContext } from '../../Context/UserContext';
import { useForm } from 'react-hook-form';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { CiImageOn } from 'react-icons/ci';
import { GrPowerCycle } from 'react-icons/gr';
import { APi_BASEURL } from '../../lib/Api';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Updatecomment({id}) {
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
      content:'',
      
    }
  })


  function handleupdatecomment(value) {



  // console.log(myupdatepost);
  
      setisLoding(true)

  axios.put(`https://linked-posts.routemisr.com/comments/${id}`,value,{
    // hna bb3t mn commponent createcomment id comment msh al post 3lshan drap error m3ak 
    headers:{
      token:userLogin,
    }
  })
  .then((res)=>{
    // console.log(res.data.message);
    if (res.data.message==='success') {
      
      toast.success('comment  updated successfully my friend 🖤')

      setisShow(false)
      setisLoding(false)
      queryclinet.invalidateQueries({queryKey:['userPosts']})
      queryclinet.invalidateQueries({queryKey:['getPosts']})
      queryclinet.invalidateQueries({queryKey:['getsingledata']})
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
        
      <form className="form " onSubmit={handleSubmit(handleupdatecomment)}>
        {/*-------- start close button ------------- */}
        <button onClick={changeIsShow} className='ms-auto pt-2 text-2xl cursor-pointer text-white hover:text-black transition duration-[0.3s]'><IoIosCloseCircleOutline/></button>
        
        {/*-------- end close button ------------- */}
        <p id="heading">Update comment </p>

        {/* ---------start input 1 ----------*/}
        <div className="field">

          {/* <input autoComplete="off" placeholder="Username" className="input-field" type="text" /> */}
          <textarea id="" className='w-full focus:outline-0' placeholder='update content...' {...register('content')}></textarea>
        </div>
        {/* ---------end input 1 ----------*/}
        

        <div className="btn">
          <button onClick={changeIsShow} className="button1 hover:bg-red-400 cursor-pointer">cancel</button>
          <button disabled={isLoding} className="button2 cursor-pointer">{isLoding?<GrPowerCycle className="animate-spin mx-auto text"/>:'Confirm comment update?'}</button>
        </div>
      </form>
    </StyledWrapper>
      
    </motion.div>}
    <button onClick={changeIsShow} className='  text-3xl cursor-pointer mb-2.5'>...</button>

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