import React, { useContext, useState } from 'react'
import { IoMdImages } from "react-icons/io";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GrPowerCycle } from 'react-icons/gr';
import { APi_BASEURL } from '../../../lib/Api';
import { UserContext } from '../../../Context/UserContext';
import { useQueryClient } from '@tanstack/react-query';

export default function Addpost({data}) {
          let queryclient=useQueryClient()

  const [isLoding, setisLoding] = useState(false)

  
  // console.log(data);
  let{userLogin}=useContext(UserContext)

  let{register,handleSubmit,reset}=useForm({
    defaultValues:{
      body:'',
      image:'',
      

    }
    
  })

  function hadnleAddPost(value) {
    let mypost=new FormData()
    // console.log(value.body);
    // console.log(value.image[0]);
    mypost.append('body',value.body)
    mypost.append('image',value.image[0])

            setisLoding(true)

    axios.post(`${APi_BASEURL}/posts`,mypost,{
      headers:{
        token:userLogin
      }
    })
    .then((res)=>{
      // console.log(res.data.message);
      if (res.data.message==="success") {
        toast.success('add post success ✨')
        setisLoding(false)
        reset('')
        queryclient.invalidateQueries({queryKey:['userPosts']})
        queryclient.invalidateQueries({queryKey:['getPosts']})
      }
      
    })
   .catch((err)=>{
    // console.log(err.response.data.error);
    toast.error(err.response.data.error)
            setisLoding(false)

   }) 

    
  }

  
  return (
    <>
    <div className='container w-[95%] md:w-10/12 mx-auto'>


    <form onSubmit={handleSubmit(hadnleAddPost)} className='w-full md:w-[50%] lg:w-[60%] mx-auto dark:text-white bg-white  dark:bg-[#252728] p-3 pt-5  mb-[20px] mt-[10px] rounded-2xl'>

      <div className='flex gap-4'>
            <img src={data?.photo} alt=""  className='w-[50px] h-[50px] rounded-full' />
        <input type="text" className='w-full border-2 dark:border-white/50 border-black/50   p-2 ' placeholder='What are you thinking about...?' {...register('body')} />

      </div>
      <div>
        <input type="file" id='photo' className='hidden'{...register('image')} />
        <hr  className='mt-2 text-[#303233]'/>
        <label htmlFor="photo" className='flex items-center mt-3 cursor-pointer gap-4 '>
          <span className='text-2xl text-green-400 ms-10 items-center'><IoMdImages/></span>
          <span>photo/video</span>
        </label>
      </div>
      <button disabled={isLoding} className='p-3 block ms-auto rounded-[10px] bg-sky-300 cursor-pointer'>{isLoding?<GrPowerCycle className="animate-spin mx-auto text"/>:'Add post'}</button>
      {/* alawl mkansh rady yt7rak lma b2a  block at7rk */}
    </form>
</div>

    
    </>
  )
}
 