import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../App.css";
import { addDetailsAPI, updateDetailsAPI } from "../Services/allAPI";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Create() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [stdDetails, setStdDetails] = useState({
    regNumber: "",
    stdName: "",
    stdGender: "",
    stdBatch: "",
  });

  useEffect(() => {
    if (location.state && location.state.details) {
      setIsEditMode(true);
      setStdDetails(location.state.details);
    }
  }, [location.state]);

  const handleUpload = async () => {
    const { regNumber, stdName, stdGender, stdBatch } = stdDetails;
    if (regNumber && stdName && stdGender && stdBatch) {
      try {
        let result;
        if (isEditMode) {
          result = await updateDetailsAPI(stdDetails.id, stdDetails);
        } else {
          result = await addDetailsAPI(stdDetails);
        }
        if (result.status >= 200 && result.status < 300) {
          console.log("Before toast.success");
          toast.success("Uploaded Successfully")
          navigate("/");
        } else {
          alert(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warning("Please fill the form completely.");
    }
  };

  const handleChange = (e) => {
    setStdDetails({ ...stdDetails, [e.target.name]: e.target.value });
  };

  const handleGenderSelect = (eventKey) => {
    setStdDetails({ ...stdDetails, stdGender: eventKey });
  };

  const handleBatchSelect = (eventKey) => {
    setStdDetails({ ...stdDetails, stdBatch: eventKey });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="form">
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "400px", height: "300px" }}>
            <div className="row">
              <input
                name="regNumber"
                onChange={handleChange}
                className="input-box form-control"
                type="text"
                placeholder="Registration Number"
                value={stdDetails.regNumber}
              />
              <input
                name="stdName"
                onChange={handleChange}
                className="input-box form-control"
                type="text"
                placeholder="Full Name"
                value={stdDetails.stdName}
              />
            </div>
            <div className="d-flex justify-content-between w-100 mt-2">
              <Dropdown className="dropdown" onSelect={handleGenderSelect}> 
                <Dropdown.Toggle variant="secondary">
                  {stdDetails.stdGender || "Gender"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                  <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                  <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="dropdown" onSelect={handleBatchSelect}>
                <Dropdown.Toggle variant="secondary">
                  {stdDetails.stdBatch || "Batch"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Science">Science</Dropdown.Item>
                  <Dropdown.Item eventKey="Commerce">Commerce</Dropdown.Item>
                  <Dropdown.Item eventKey="Humanities">
                    Humanities
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <button
              onClick={handleUpload}
              className="btn btn-success w-100 mt-3"
            >
              {isEditMode ? "Update" : "Upload"}
            </button>
            <Link to={"/"} className="btn  btn-primary w-100 mt-3">
              Home
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000}position="top-center"/>
    </div>
  );
}

export default Create;
