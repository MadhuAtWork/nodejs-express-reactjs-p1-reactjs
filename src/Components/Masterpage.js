import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function MatserPage() {
  const [getData, setGetData] = useState();
  const Navigate = useNavigate();
  const location = useLocation();
  const mainmenuList = location.state;
  const [inputData, setInput] = useState({});
  const [inputEdit, setInputEdit] = useState({});

  const onhandleEvent = (e, field) => {
    setInput((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const onhandleEventedit = (e, field) => {
    setInputEdit((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editdata, setEditdata] = useState();

  const [openedit, setOpenedit] = React.useState(false);
  const handleOpenedit = (data) => () => {
    setEditdata(data);
    setOpenedit(true);
  };
  const handleCloseedit = () => setOpenedit(false);

  function HandlegetData() {
    fetch("http://192.168.0.153:5000/getDbDataApi", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGetData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleClickSave = () => {
    const data = {
      name: inputData.Name,
      city: inputData.City,
      fullname: inputData.fullname,
      phonenumber: inputData.phonenumber,
      state: inputData.State,
      email: inputData.Email,
    };
    fetch("http://192.168.0.153:5000/taskSaveApi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        HandlegetData();
        setInput({});
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClickUpdate = () => {
    const data = {
      name: inputEdit.Name || editdata.name,
      city: inputEdit.City || editdata.city,
      fullname: inputEdit.fullname || editdata.fullname,
      phonenumber: inputEdit.phonenumber || editdata.phonenumber,
      state: inputEdit.State || editdata.state,
      email: inputEdit.Email || editdata.email,
    };
    fetch("http://192.168.0.153:5000/updateMasterUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        HandlegetData();
        setInput({});
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // /updateMasterUser

  useEffect(() => {
    HandlegetData();
  }, []);

  const onClickNavigate = () => {
    Navigate("/index", { state: mainmenuList });
  };

  // searchuser
  const handleSearch = () => {
    const data = {
      name: inputsearch.Name,
      city: inputsearch.City,
    };
    fetch("http://192.168.0.153:5000/searchuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setGetData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [inputsearch, setInputsearch] = useState({});
  const onhandleEventSearch = (e, field) => {
    setInputsearch((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // deleteUser

  const handleDelete = (name) => () => {
    const data = {
      name: name,
    };
    fetch("http://192.168.0.153:5000/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        HandlegetData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid text-white">
          <h2>Master page</h2>
        </div>
      </nav>
      <div>
        <div className="container ">
          <div className="row m-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">User Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => onhandleEventSearch(e, "Name")}
                        value={inputsearch.Name}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => onhandleEventSearch(e, "City")}
                        value={inputsearch.City}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ms-5 mb-1">
        <button type="submit" className="btn btn-primary" onClick={handleOpen}>
          Add
        </button>
      </div>
      <div className="ms-5 me-5">
        <table className="table  table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {getData?.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.name}</td>
                  <td>{value.fullname}</td>
                  <td>{value.email}</td>
                  <td>{value.phonenumber}</td>
                  <td>{value.city}</td>
                  <td>{value.state}</td>
                  <td>
                    <button
                      type="submit"
                      className="btn btn-primary ms-2 me-2"
                      onClick={handleOpenedit(value)}
                    >
                      Edit
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary ms-2 me-2"
                      onClick={handleDelete(value?.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="ms-5 mt-1">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={onClickNavigate}
        >
          Back
        </button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form class="row g-3">
              <div class="col-12">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEvent(e, "Name")}
                  value={inputData.Name}
                />
              </div>
              <div class="col-12">
                <label class="form-label">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEvent(e, "fullname")}
                  value={inputData.fullname}
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEvent(e, "Email")}
                  value={inputData.Email}
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">phonenumber</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEvent(e, "phonenumber")}
                  value={inputData.phonenumber}
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">City</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEvent(e, "City")}
                  value={inputData.City}
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">State</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEvent(e, "State")}
                  value={inputData.State}
                />
              </div>
              <div class="col-12">
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={handleClickSave}
                >
                  Save
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openedit}
          onClose={handleCloseedit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form class="row g-3">
              <div class="col-12">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEventedit(e, "Name")}
                  value={inputEdit.Name}
                  defaultValue={editdata?.name}
                  disabled
                />
              </div>
              <div class="col-12">
                <label class="form-label">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEventedit(e, "fullname")}
                  value={inputEdit.fullname}
                  defaultValue={editdata?.fullname}
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEventedit(e, "Email")}
                  value={inputEdit.Email}
                  defaultValue={editdata?.email}
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">phonenumber</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEventedit(e, "phonenumber")}
                  value={inputEdit.phonenumber}
                  defaultValue={editdata?.phonenumber}
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">City</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEventedit(e, "City")}
                  value={inputEdit.City}
                  defaultValue={editdata?.city}
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">State</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => onhandleEventedit(e, "State")}
                  value={inputEdit.State}
                  defaultValue={editdata?.state}
                />
              </div>
              <div class="col-12">
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={handleClickUpdate}
                >
                  Save
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
