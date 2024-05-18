import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllDetailsAPI, removeDetailsAPI } from "../Services/allAPI";

function Home() {
  const [allDetails, setAllDetails] = useState([]);
  const [deleteResponse, setDeleteResponse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllDetails();
  }, [deleteResponse]);

  const getAllDetails = async () => {
    try {
      const result = await getAllDetailsAPI();
      if (result.status >= 200 && result.status < 300) {
        setAllDetails(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (stdID) => {
    try {
      const result = await removeDetailsAPI(stdID);
      console.log("Delete Response:", result.data);
      setDeleteResponse(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (details) => {
    navigate("/create", { state: { details } });
  };

  return (
    <div className="Home">
      <h1 style={{ fontFamily: "pacifico" }} className="text-center mt-4">
        Student Details
      </h1>
      <div className="w-75 m-auto mt-4 d-flex justify-content-end">
        <Link to="/create" className="btn btn-success shadow hover">
          Add Details
        </Link>
      </div>
      <div>
        <Table striped bordered className="w-75 m-auto mt-5 table">
          <thead>
            <tr>
              <th>Reg Number</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Batch</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allDetails?.length > 0 ? (
              allDetails?.map((details) => (
                <tr key={details.id}>
                  <td>{details?.regNumber}</td>
                  <td>{details?.stdName}</td>
                  <td>{details?.stdGender}</td>
                  <td>{details?.stdBatch}</td>
                  <td className="d-flex justify-content-around">
                    <Link
                      to={`/read/${details.id}`}
                      state={details}
                      className=" btn s-btn"
                    >
                      <i className="fa-brands fa-readme"></i>
                    </Link>
                    <Button
                      onClick={() => handleEdit(details)}
                      className="btn s-btn"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Link
                      onClick={() => handleRemove(details.id)}
                      className="btn  s-btn"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center fw-bolder text-danger">
                  Nothing to display
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Home;
