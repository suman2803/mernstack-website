import React ,{useState,useEffect,} from 'react'
import { useNavigate } from 'react-router-dom';

import "../css/Createpost.css";
import { toast } from 'react-toastify';


export default function Createpost() {

  const [body,setBody] = useState('')
  const [image,setImage] = useState('')
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)


  useEffect(() => {

    // saving post to mongodb
    if (url) {

      fetch("/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            notifyA(data.error)
          } else {
            notifyB("Successfully Posted")
            navigate("/")
          }
        })
        .catch(err => console.log(err))
    }

  }, [url])

  const postDetails  = () => {
    console.log(body,image)
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "socioNetwork")
    data.append("cloud_name", "SocioNetwork")
    fetch("https://api.cloudinary.com/v1_1/SocioNetwork/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
    .then(data => setUrl(data.url))
      .catch(err => console.log(err))
     console.log(url)

    // //saving post to mongodb
    // // fetch("http://localhost:5000/")
    //  fetch("/")
  }


    const loadfile = (event) => {
        var output = document.getElementById("output");
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
          URL.revokeObjectURL(output.src); // free memory
        };
      };



  return (
    <div className="createPost">
      {/* //header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id="post-btn" onClick={() => {
          postDetails()
        }}>Share</button>
      </div>
      {/* image preview */}
      <div className="main-div">
      <img
          id="output"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
          alt="this is output"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
             setImage(event.target.files[0])
          }}
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              // src="https://media.istockphoto.com/id/1441865364/photo/beautiful-modern-woman-in-colorful-dress-and-hairstyle.jpg?b=1&s=170667a&w=0&k=20&c=gU0lT9l41D-rrh82YEmIJ_dvt7_-evB72RekokHPwM8="
              alt=""
              src=""
            />
          </div>
          <h5 ></h5>
        </div>
        <textarea  value ={body} onChange={(e) => {
          setBody(e.target.value)
        }}type="text" placeholder="Write a caption...."></textarea>
      </div>
    </div>
  )
}
