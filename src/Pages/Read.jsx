import React from "react";
import { Link, useLocation } from "react-router-dom";

function Read() {
  const location = useLocation();
  const details = location.state;
  console.log('Details:',details);

  return (
    <div className="container mt-4">
      {/* <h1 style={{fontFamily: "pacifico"}} className="text-center">Read Student Details</h1> */}
      {details ? (
        <div  style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",backgroundColor:'lightgreen',padding:''}} className="card w-25 m-auto mt-5">
          <div className="card-body">
          <h5
          
          className="card-text"><span className="fw-bolder">Full Name</span>: {details.stdName}</h5>
            <p className="card-title"><span className="fw-bolder">Reg Number</span>: {details.regNumber}</p>
            
            <p className="card-text"><span className="fw-bolder">Gender</span>: {details.stdGender}</p>
            <p className="card-text"><span className="fw-bolder">Batch</span>: {details.stdBatch}</p>
            <Link to={'/'} className="btn btn-success w-100">Home</Link>
          </div>
        </div>
      ) : (
        <p>No details available.</p>
      )}
    </div>
  );
}

export default Read;