import React ,{useState} from "react";
import logo from "../images/logo.png";
import { Link ,useNavigate} from "react-router-dom";
import "../css/SignUp.css";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [userName,setUserName] = useState("")
const [password,setPassword] = useState("")

//Toast Functions
const notifyA=(msg) =>{
  toast.error(msg)
}

const notifyB = (msg) =>{
  toast.success(msg);
}

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const postData =() =>{

//checking email
if(!emailRegex.test(email)){
  notifyA("Invalid Email")
  return
}else if(!passRegex.test(password)){
  notifyA("Password must contain atleast 8 characters,including atleast 1 number,1 uppercase,1 lowercase and special characters like # ,?,!")
return
}

   //sending data to server
   fetch("/signup",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name:name,
      userName:userName,
      email:email,
      password:password
    })
   }).then(res=>res.json())
   .then(data=>{
    if(data.error){
      notifyA(data.error)
    }
    else{
      notifyB(data.message)
      navigate("/signin")
    }
    console.log(data)})
}

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img src={logo} alt="" className="signUpLogo" />
          <p className="loginPara">
            Sign up to see photos and videos<br></br>from your friends
          </p>
          <div>
            <input type="email" name="email" value={email} id="email" onChange={(e) =>{
              setEmail(e.target.value)
            }} placeholder="Email" />
          </div>
          <div>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
          </div>

          <div>
            <input
              type="text"
              name="username"
              id="username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
              }}
              placeholder="Username"
            />
          </div>

          <div>
            
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder="Password"
            />
          </div>

          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By signing up, you agree to out Terms, <br /> privacy policy and
            cookies policy.
          </p>
          <input type="submit" id="submit-btn" 
          onClick={() =>{postData()}} value="Sign Up" />
        </div>

        <div className="form2">
          Already have an account ?
          <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
