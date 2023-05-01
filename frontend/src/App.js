
import './App.css';
import React,{createContext,useState} from "react";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './screens/Profile';
import Home from './screens/Home';
import Createpost from './screens/Createpost.js';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {LoginContext} from "./context/LoginContext";
import Modal from './components/Modal';
import UserProfile from "./components/UserProfile.js";
import MyFollowingPost from "./screens/MyFollowingPost.js";

function App() {
  const [userLogin,setUserLogin] = useState(false);
const[modalOpen,setModalOpen]=useState(false);
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setUserLogin,setModalOpen}}>
      <Navbar login= {userLogin}/> 
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route exact  path='/profile' element={<Profile/>}></Route>
        <Route path='/createPost' element={<Createpost/>}></Route>
        <Route path='/profile/:userid' element={<UserProfile/>}></Route>
        <Route path='/followingpost' element={<MyFollowingPost/>}></Route>
        
      </Routes>
      <ToastContainer theme='dark'/>
      {modalOpen && <Modal setModalOpen={setModalOpen}></Modal> }
      
      </LoginContext.Provider>
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;
