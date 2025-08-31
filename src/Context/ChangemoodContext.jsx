import { createContext, useState } from "react";

export let ChangemoodContext = createContext();
// let x=createContext();

export default function ChangemoodContextprovider({children}) {
    // console.log(children);
    

  const [mood, setmood] = useState("dark");

  function changemood() {
    if (mood == "dark") setmood("light");
    else {
    setmood("dark");
    }
  }
  return <ChangemoodContext.Provider value={{mood,changemood}}>
        {children}
        
  </ChangemoodContext.Provider>;
}
