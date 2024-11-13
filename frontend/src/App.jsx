import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './Components/Signup/Signup';
import { NotificationProvider } from '../src/Components/CreatePage/NotificationContext';
import Customer from './Customer';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import CreatePage from './Components/CreatePage/CreatePage';
import User_Homepage from './Components/User_Dashboard/User_Homepage/User_Homepage';
import ForgetPass from './Components/Login/Forgetpass';
import Authenticated from './Components/Login/Authenticated';
import KaligonjHome from './Components/Home/KaligonjHome';
import KaligonjFact from './Components/CreatePage/KaligonjFact';
import SSCML from './Components/Home/SSCML';
import SSCMLCreate from './Components/CreatePage/SSCMLCreate';
import SSCIL from './Components/Home/SSCIL.jsx';
import SSCILCreate from './Components/CreatePage/SSCILCreate';
import User_Homepage_SCBLFO from './Components/User_Dashboard/User_Homepage/User_Homepage_SCBLFO.jsx';
import User_Homepage_SSCIL from './Components/User_Dashboard/User_Homepage/User_Homepage_SSCIL.jsx';
import User_Homepage_SSCML from './Components/User_Dashboard/User_Homepage/User_Homepage_SSCML.jsx';
import Chittagong from './Components/Home/Chittagong.jsx';
import ChittagongCreate from './Components/CreatePage/ChittagongCreate.jsx';
import User_Homepage_Chittagong from './Components/User_Dashboard/User_Homepage/User_Homepage_Chittagong.jsx';


const USER_TYPES = {
  PUBLIC: 'Public User',
  NORMAL_USER: 'Normal User',
  ADMIN_USER: 'Admin User'
};

const CURRENT_USER_TYPE = USER_TYPES.ADMIN_USER;
function App() {

  const [message, setMessage] = useState('');

  const sendMessage = (message) => {
    setMessage(message);
  };

  const isLoggedIn = localStorage.getItem('id');
  // Callback function to update the message

 
  return (<>
    {/*/userhome/:id <div>Logged in as {CURRENT_USER_TYPE}</div> */}
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          <Route path='/' element={<PublicElement><Login /></PublicElement>}></Route>
          <Route path='/signup' element={<PublicElement><SignUp /></PublicElement>}></Route>
          <Route path='/forgetpassword' element={<PublicElement><ForgetPass /></PublicElement>}></Route>
          <Route path='/authenticated/:id' element={<PublicElement><Authenticated /></PublicElement>}></Route>
          <Route
              path='/'
              element={
                isLoggedIn ? (
                  <Navigate to='/home' />
                ) : (
                  <PublicElement>
                    <Login />
                  </PublicElement>
                )
              }
            >

</Route>
            <Route
              path='/home'
              element={
                isLoggedIn ? (
                  < Adminlement>
                    <Home />
                  </ Adminlement>
                ) : (
                  <Navigate to='/' />
                )
              }
            ></Route>
            <Route
            path='/SCBLFO'
            element={
              isLoggedIn ? (
                < Adminlement>
                  <KaligonjHome />
                </ Adminlement>
              ) : (
                <Navigate to='/' />
              )
            }
          ></Route>
          <Route
            path='/Labanchora'
            element={
              isLoggedIn ? (
                < Adminlement>
                  <SSCML />
                </ Adminlement>
              ) : (
                <Navigate to='/' />
              )
            }
          ></Route>
          <Route
            path='/shikolbaha'
            element={
              isLoggedIn ? (
                < Adminlement>
                  <SSCIL />
                </ Adminlement>
              ) : (
                <Navigate to='/' />
              )
            }
          ></Route>
          <Route
            path='/chittagong'
            element={
              isLoggedIn ? (
                < Adminlement>
                  <Chittagong />
                </ Adminlement>
              ) : (
                <Navigate to='/' />
              )
            }
          ></Route>
            <Route
              path='/create'
              element={
                isLoggedIn ? (
                  < Adminlement>
                    <CreatePage />
                  </ Adminlement>
                ) : (
                  <Navigate to='/' />
                )
              }
            ></Route>
            <Route
            path='/SCBLFO_SEND'
            element={
              isLoggedIn ? (
                < Adminlement>
                  <KaligonjFact />
                </ Adminlement>
              ) : (
                <Navigate to='/' />
              )
            }
          ></Route>
          <Route
            path='/Labanchora_SEND'
            element={
              isLoggedIn ? (
                < Adminlement>
                  <SSCMLCreate />
                </ Adminlement>
              ) : (
                <Navigate to='/' />
              )
            }
          ></Route>
          <Route
            path='/Shikolbaha_SEND'
            element={
              isLoggedIn ? (
                < Adminlement>
                  <SSCILCreate />
                </ Adminlement>
              ) : (
                <Navigate to='/' />
              )
            }
          ></Route>
          <Route
            path='/Chittagong_SEND'
            element={
              isLoggedIn ? (
                < Adminlement>
                  <ChittagongCreate />
                </ Adminlement>
              ) : (
                <Navigate to='/' />
              )
            }
          ></Route>
            <Route
              path='/userhome'
              element={
                isLoggedIn ? (
                  <UserElement>
                    <User_Homepage />
                  </UserElement>
                ) : (
                  <Navigate to='/' />
                )
              }
            ></Route>
            <Route
              path='/userhomeSSCIL'
              element={
                isLoggedIn ? (
                  <UserElement>
                    <User_Homepage_SSCIL />
                  </UserElement>
                ) : (
                  <Navigate to='/' />
                )
              }
            ></Route>
            <Route
              path='/userhomeSCBLFO'
              element={
                isLoggedIn ? (
                  <UserElement>
                    <User_Homepage_SCBLFO />
                  </UserElement>
                ) : (
                  <Navigate to='/' />
                )
              }
            ></Route>
            <Route
              path='/userhomeSSCML'
              element={
                isLoggedIn ? (
                  <UserElement>
                    <User_Homepage_SSCML />
                  </UserElement>
                ) : (
                  <Navigate to='/' />
                )
              }
            ></Route>
             <Route
            path='/userhomeCtg'
            element={
              isLoggedIn ? (
                <UserElement>
                  <User_Homepage_Chittagong />
                </UserElement>
              ) : (
                <Navigate to='/' />
              )
            }
          ></Route>
            <Route path='/customer' element={<Customer />} />
            <Route path='*' element={<div>Page not found</div>} />
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  </>
  )
}
function PublicElement({ children }) {
  return <>{children}</>
}
function UserElement({ children }) {
  if (CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER || CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
    return <>{children}</>
  }
  else {
    return <div>You don't have access to use this</div>

  }
}
function Adminlement({ children }) {
  if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
    return <>{children}</>
  }
  else {
    return <div>You don't have access to use this</div>

  }
}

export default App