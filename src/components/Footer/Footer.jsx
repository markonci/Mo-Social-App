import React from 'react'
import style from './Footer.module.css'
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";




export default function Footer() {
  return (
    <div className='bg-blue-300 p-6 dark:bg-red-600 text-center dark:text-white'> ©By Eng.mark onci
    
    <div className='flex justify-center gap-3 mt-3 text-[20px]'>
      <p className='hover:text-blue-500 transition duration-[0.5s]'><a href="https://www.linkedin.com/in/mark-onci-77880425b/" target='_blank'><FaLinkedin/></a></p>
      <p className='hover:text-green-500 rounded-full transition duration-[0.5s] '><a href="https://github.com/markonci" target='_blank'><FaGithub/></a></p>
      <p className=' hover:text-emerald-300 hover:bg-red-500 transition duration-[0.5s]'><a href="markonci06@gmail.com"><SiGmail/></a></p>
      <p><a href=""><FaWhatsapp/></a></p>
    </div>
    
    </div>
  )
}
 