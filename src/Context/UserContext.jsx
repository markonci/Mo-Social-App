import { createContext, useEffect, useState } from "react";

export let UserContext=createContext()

export default function UserContextprovider({children}){
// console.log(children);

    // const [userLogin, setuserLogin] = useState(null)
    const [userLogin, setuserLogin] = useState(localStorage.getItem('userToken'))

    // hna hro7 yshof f localstorage fe 7aga msh 3l2ay 7ywali null

    // aw 
    // useEffect(()=>{
    //     if(localStorage.getItem('userToken')){
    //         setuserLogin(localStorage.getItem('userToken'))
    //     }
        
    // },[])
    

    return <UserContext.Provider value={{userLogin, setuserLogin }}>
        {children}
    </UserContext.Provider>
}