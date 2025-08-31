// import { createContext, useContext } from "react";
// import { UserContext } from "./UserContext";
// import axios from "axios";
// import { APi_BASEURL } from "../lib/Api";

//     export let AllPostcontext= createContext()

//     export default function AllPostcontextprovider({children}) {

//  let{userLogin}=  useContext(UserContext)

// function getposts() {
//    return axios.get(`${APi_BASEURL}/posts?limit=50`,{
//     // // 3mlna return l axios 3lshan res lw rg3t htshel kolo w htn2a mwgoda fa htb2a 
//     // // undfined al2fdl alreturn al fn kolha  al awal fn get posts kan mn no3 void 
//     // y3any m b returnsh 7aga  anma dlw2at b2a mn no3 promis w hnk 7tania await 3lshan 
//     // de fn btklm api(video 6 week4 session 2)(alawal kan brtrun al then w catch bto3 axios msh al fn kolha)
//         headers: {
//       token:userLogin,
//     } 
//       // hna ana atdlo userLogin aly f context kont mmkn aktb kda localStorage.getItem('userToken')
//       // bs  userLogin dy brdo shalha nfs alqema w lw almost5dm 3ml refresh hyb2a m3aya 
//       // localStorage.getItem('userToken') by defult w mt5azen fe alocal f msh h7hsel t2aser
//   }
//   )
//   .then((res)=> res.data.posts  )
//   // hna arrow fn btreturn fa msh m7tag aktb return

//   .catch((err)=>{
//       return err.message;
      
//   })
// }


//         return <AllPostcontext.Provider value={{getposts}}>
//             {children}
//         </AllPostcontext.Provider>
//     }