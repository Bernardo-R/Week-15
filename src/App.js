import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import "./App.css";

function App() {
  const API = "https://643d8ccb6c30feced81531da.mockapi.io/cars";
  const [students, setStudents] = useState([{}]);
  const [openIndex, setOpenIndex] = useState(-1);

  const [newStudentFn, setNewStudentFn] = useState("");
  const [newStudentLn, setNewStudentLn] = useState("");
  const [newStudentJobTitle, setNewStudentJobTitle] = useState("");

  const [editStudetnFn, setEditStudentFn] = useState([]);
  const [editStudetnLn, setEditStudentLn] = useState([]);
  const [editStudetnJobTitle, setEditStudentJobTitle] = useState([]);

  const getStudetRequest = async () => {
    //getting data from the api
    const response = await fetch(API);
    const responseJson = await response.json();
    setStudents(responseJson);
  };

  useEffect(() => {
    getStudetRequest();
  }, []);

  // adding new student
  const postNewStudent = (e) => {
    e.preventDefault();

    let data = {
      First: newStudentFn,
      Last: newStudentLn,
      Job: newStudentJobTitle,
    };

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      getStudetRequest();
      setNewStudentFn("");
      setNewStudentLn("");
      setNewStudentJobTitle("");
    });
  };

  const EditStudentInfo = (e, studentObj) => {
    e.preventDefault();

    const updateStudentObj = {
      ...studentObj,
      First: editStudetnFn,
      Last: editStudetnLn,
      Job: editStudetnJobTitle,
    };

    fetch(`${API}/${studentObj.id}`, {
      method: "PUT",
      body: JSON.stringify(updateStudentObj),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      getStudetRequest();
      setEditStudentFn("");
      setEditStudentLn("");
      setEditStudentJobTitle("");
    });
  };

  // deleting existing student
  const deleteStudent = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => getStudetRequest());
  };

  return (
    <div className="App container">
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Job Title</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td id="name">
                <span>
                  <img src={student.Image}></img>
                </span>
                {student.First}
              </td>

              <td>{student.Last}</td>
              <td>{student.Job}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="mb-1"
                  onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                  aria-controls={`collapse-form-${index}`}
                  aria-expanded={index === openIndex}
                >
                  Edit
                </Button>
                <Collapse in={index === openIndex}>
                  <div id={`collapse-form-${index}`}>
                    <form>
                      <div class="mb-3">
                        <input
                          onChange={(e) => setEditStudentFn(e.target.value)}
                          type="text"
                          class="form-control"
                          id="updateFname"
                          aria-describedby="emailHelp"
                          placeholder="First Name"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <input
                          onChange={(e) => setEditStudentLn(e.target.value)}
                          type="text"
                          class="form-control"
                          id="updateLname"
                          placeholder="Last Name"
                        />
                      </div>
                      <div class="mb-3">
                        <input
                          onChange={(e) =>
                            setEditStudentJobTitle(e.target.value)
                          }
                          type="text"
                          class="form-control"
                          id="updateJobTitle"
                          placeholder="Job Title"
                        />
                      </div>
                      <Button
                        onClick={(e) => EditStudentInfo(e, student)}
                        variant="outline-info"
                        size="sm"
                      >
                        save
                      </Button>{" "}
                    </form>
                  </div>
                </Collapse>
              </td>
              <td>
                <Button
                  onClick={() => deleteStudent(student.id)}
                  type="button"
                  variant="danger"
                  color="error"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="col-md-6 mb-3">
        <div className="h-100 p-5 text-bg-dark rounded-3">
          <h4>New Student</h4>
          <div>
            <form id="fname">
              <div className="mb-3">
                <label for="fname" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  aria-describedby="emailHelp"
                  placeholder="John"
                  onChange={(e) => setNewStudentFn(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label for="lname" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  placeholder="Smith"
                  onChange={(e) => setNewStudentLn(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label for="JobTitle" className="form-label">
                  Job Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="JobTitle"
                  placeholder="Sofware Developer"
                  onChange={(e) => setNewStudentJobTitle(e.target.value)}
                  required
                />
              </div>
              <Button
                variant="primary"
                onClick={(e) =>
                  postNewStudent(e, {
                    First: newStudentFn,
                    Last: newStudentLn,
                    Job: newStudentJobTitle,
                  })
                }
              >
                Add
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
