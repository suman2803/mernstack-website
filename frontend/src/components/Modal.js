import React from "react";
import { RiCloseLine } from "react-icons/ri";
import "../css/Modal.css";
import { useNavigate } from "react-router-dom";

export default function Modal({setModalOpen}) {
    const navigate = useNavigate();
  return (
   <div className="darkBg" onClick={() =>{
    setModalOpen(false)
   }}>
     <div className="centered">
        <div className="modal">
      {/* modal header */}
      <div className="modalHeader">
        <h5 className="heading">Confirm</h5>
      </div>
      <button className="closeBtn" onClick={() =>{
    setModalOpen(false)
   }}>
        <RiCloseLine></RiCloseLine>
      </button>
      {/* modal conten */}
      <div className="modalContent">Do you really want to log out ?</div>
      <div className="modalActions">
        <div className="actionsContainer">
          <button onClick={()=>{
            setModalOpen(false)
            localStorage.clear()
            navigate('./signin')}}
            className="logOutBtn">Log Out</button>
         
         
          <button onClick={() =>{
    setModalOpen(false);
    
   }} className="cancelBtn">Cancel</button>
        </div>
      </div>
    </div>
    </div>
   </div>
  );
}
