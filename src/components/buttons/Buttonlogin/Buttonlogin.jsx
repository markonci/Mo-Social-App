import React from 'react'
import styled from 'styled-components';
import Login from './../../Login/Login';
import { Link } from 'react-router-dom';

export default function Buttonlogin() {
  return (
    <>
       <StyledWrapper className='ms-3 md:ms-0 max-md:flex max-md:gap-2 max-md:text-[20px]  '>
      <Link to="/login"><button className="btn  md:me-4 ">Log in</button></Link>
      <Link to='/register'><button className="btn ms-2 md:ms-0">Sgin up</button></Link>
    </StyledWrapper>
    </>
  )
}
 const StyledWrapper = styled.div`
  .btn {
    color: purple;
    text-transform: uppercase;
    text-decoration: none;
    border: 2px solid purple;
    padding: 10px 10px;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
    position: relative;
    transition: all 1s;
    overflow: hidden;
     z-index: 1;
    
  }

  .btn:hover {
    color: white;
  }

  .btn::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 0%;
    top: 0;
    left: -40px;
    transform: skewX(45deg);
    background-color: purple;
    z-index: -1;
    transition: all 1s;
  }

  .btn:hover::before {
    width: 190%;
  }`;

