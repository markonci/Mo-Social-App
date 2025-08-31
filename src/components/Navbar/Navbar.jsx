import React, { useContext } from "react";
import styled from "styled-components";
import style from "./Navbar.module.css";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar as Nav,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { Link, NavLink, useNavigate } from "react-router-dom";
import Buttondarkmood from "../buttons/Buttondarkmood/Buttondarkmood";
import Buttonlogin from "../buttons/Buttonlogin/Buttonlogin";
import Register from "./../Register/Register";
import { UserContext } from './../../Context/UserContext';
import { useQuery } from "@tanstack/react-query";
import { APi_BASEURL } from "../../lib/Api";
import axios from "axios";


export default function Navbar() {

let{userLogin,setuserLogin}=useContext(UserContext)

  function getUserData() {
    return axios.get(`${APi_BASEURL}/users/profile-data`, {
      headers: {
        token: userLogin,
      },
    });
  }


  // // kan bydeni error lma lont b3ml sgin out kan by7awel reftsh bs mfesh token l2no log out w f nfs alw2at 
  // // 3awz a3rd aldata f al7al kan any nadet 3la artubiute fe usequery asmo enabled w adto shart lw mafesh token 
  // mtro7sh tgep data

  let {data}=useQuery({
    queryKey:['uesrData'],
      queryFn: getUserData,
    select: (data) => data?.data?.user,
    enabled:!!userLogin
    
  })
  // console.log(data);
  


let nvagate =useNavigate()

function signout() {
    localStorage.removeItem('userToken')
    setuserLogin(null)
    nvagate("/login")
    
}
return (
    <>


    
      <Nav
      
        fluid
        rounded
        className="bg-gray-300 text-black dark:bg-black shadow shadow-red-400 dark:shadow-gray-500 fixed top-0 left-0 right-0 z-20  "
      >


        
        {/* ------stat logo----- */}
        <Link to="" className="mx-auto md:ms-10 md:mx-0  md:mb-0    ">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white  hover:text-amber-800 dark:hover:text-red-500 duration-200">
            Mo socialApp
          </span>
        </Link>
        {/* ------end logo----- */}

        {/* start logic fahome and faprofile */}
{userLogin!==null &&
// 3mlt dh 3lshan 2adr at7km fe kol wa7ed lw7do fa lw fe localstorage fe datet hyba true lw mafesh tlg2y hyb2a b null
<>
{/* home and profile */}
       <div className="flex  gap-5 max-md:hidden  items-center">
        
        <NavLink to="">
            <span className="text-4xl text-white ">
              <FaHome />
            </span>
          </NavLink>
          <NavLink to="/profile">
            <span className=" text-4xl text-white">
              <CgProfile />
            </span>
          </NavLink>
        </div> 
          
        
        {/* home and profile */}

</>
}
        {/* end logic fahome and faprofile */}

        <div className="flex gap-4 me-5 mx-auto md:mx-0  md:me-10 ">
         



{/* start logic Dropdown picture */}
{userLogin!==null?<>


            
{/* --------profile picture and Dropdown-------- */}
          <Dropdown
            className=""
            arrowIcon={false}
            inline
            label={
              <Avatar
              alt="User settings"
              img={data?.photo}
              rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{data?.name}</span>
              <span className="block truncate text-sm font-medium">
                {data?.email}
              </span>
            </DropdownHeader>

            <div className="ms-6 md:ms-6 mt-3 ">
              <Link to={"/profile"}>
                {" "}
                <StyledWrapper>
                  <button className="btn  text-9xl ">profile</button>
                </StyledWrapper>
              </Link>

              <DropdownDivider />


                <StyledWrapper className="mt-2">
                  <button onClick={signout} className="btn  text-9xl mx-auto">Log out</button>
                </StyledWrapper>

            </div>
          </Dropdown>
          {/* --------profile picture and Dropdown-------- */}
          

</>:
<>
     {/* button log in and Register from  Buttonlogin component */}
          <Buttonlogin />
          {/* button log in and Register from  Buttonlogin component */}
</>

}
 {/*-------- togle dark mood from Buttondarkmood ------*/}
          <Buttondarkmood />
          {/* 5od balk mdhea older fe alcombont bt3atha fe max-md:  */}
          
          {/*-------- togle dark mood from Buttondarkmood ------*/}

          

     
        </div>
        {/* end logic Dropdown picture */}


      
</Nav>
    </>
  );
}
const StyledWrapper = styled.div`
  .btn {
    font-size: 14px;
    padding: 1rem 1.5rem;
    border: none;
    outline: none;
    border-radius: 0.4rem;
    cursor: pointer;
    text-transform: uppercase;
    background-color: rgb(14, 14, 26);
    color: rgb(234, 234, 234);
    font-weight: 700;
    transition: 0.6s;
    box-shadow: 0px 0px 60px #1f4c65;
    -webkit-box-reflect: below 10px
      linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  }

  .btn:active {
    scale: 0.92;
  }

  .btn:hover {
    background: rgb(2, 29, 78);
    background: linear-gradient(
      270deg,
      rgba(2, 29, 78, 0.681) 0%,
      rgba(31, 215, 232, 0.873) 60%
    );
    color: rgb(4, 4, 38);
  }
`;
