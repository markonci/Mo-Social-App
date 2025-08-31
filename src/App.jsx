import { useContext, useState } from "react";

import "./App.css";
import Home from "./components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import Register from "./components/Register/Register";
import ChangemoodContextprovider, {
  ChangemoodContext,
} from "./Context/ChangemoodContext";
import toast, { Toaster } from "react-hot-toast";
import UserContextprovider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import AllPostcontextprovider from "./Context/PostsContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';
import Postdetalis from "./components/Postdetalis/Postdetalis";
import ProfileUser from "./components/myprofile/Profile-user/Profile-user";
// hna waghateny moshkla any kan byktm al maktba aly bygeb mnha 8alt fa ktbtha yadui

const query = new QueryClient()

const x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    // errorElement:<Notfound/>,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfileUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "postdetalis/:id",
        // al : m3nah b2olo ay 7aga tega b3d post detalis wadin 3la alpost detalis  w id mmkn asmeha ay asm
        element: (
          <ProtectedRoute>
            <Postdetalis />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
      // b7ot gwa al protectd al 7agat bs aly 3az a7meha
    ],
  },
]);

// start handle mood and router------
function Content() {
  let { mood } = useContext(ChangemoodContext);
  // console.log(y);

  return (
    <div
      className={`${
        mood === "dark" ? "dark" : "light"
      } selection:bg-amber-400  selection:text-white`}
    >
      {/* <RouterProvider router={x} /> */}
      {/* ممكن اكتبها كدة او كدة  */}
      <RouterProvider router={x}></RouterProvider>
      <Toaster />
    </div>
  );
}
// end handle mood and router------

function App() {
  return (
    <>
      <UserContextprovider>
        {/* shayel al token local storage */}
        {/* <AllPostcontextprovider> */}
        {/* shayel funcation call api  */}
        <ChangemoodContextprovider>
          <QueryClientProvider client={query}>

          <Content />
        <ReactQueryDevtools/>
          </QueryClientProvider>
          {/* shayel al app kolo */}
        </ChangemoodContextprovider>
        {/* </AllPostcontextprovider> */}
      </UserContextprovider>

      {/* هنا في الاب كنت محتاج استخدم وضع الدارك كله علي الابلكلشين  فا  كنت عامل علي الي جوة الاب بروفيدر كونت تيكست  بس الاب 
         كمبونت مش من ضمن البروفيدركونت تيكست  فا كان بيديني ايرور اندفيند لانه 
         كان بيشوف الاول بيلاقي اني الكومبنت بتاع الاب مش معملو بروفيدر فا كان بيطلع ال حرف الواي باندفيند
       
           فا كان الحل عملت فانكشن فيها الروتر الي مراقب كل الابلكشين وجيت نديت الفانكشن دي جوة الاب وكان محاوطها  البروفيدر  كونت تيكست  */}
    </>
  );
}

export default App;

// function App() {

//   let y=useContext(ChangemoodContext)
//   console.log(y);
//   return (
//     <>
//     <ChangemoodContextprovider>

//     <div className={mood=='dark'?'dark' :'light'}>
//     <RouterProvider router={x}>
//      </RouterProvider>
//     </div>
//     </ChangemoodContextprovider>

//     </>
//   )
// }

// export default App
