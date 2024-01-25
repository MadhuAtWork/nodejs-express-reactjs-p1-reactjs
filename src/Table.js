import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MyTable(props) {
  const [open, setOpen] = React.useState(false);
  const [editdata, setEditdata] = React.useState();
  const [inputData, setInput] = useState(editdata);
  const [getdata, setGetData] = useState(props.getData);

  useEffect(() => {
    setGetData(props.getData);
  }, [props.getData]);

  console.log(inputData);
  const handleEdit = (data) => () => {
    setEditdata(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const handleUpadteData = (e) => {
    e.preventDefault();
    const data = {
      name: inputData?.name || editdata.name,
      age: inputData?.age || editdata.age,
      gender: inputData?.gender || editdata.gender,
      // _id: editdata._id,
    };

    fetch(`http://192.168.0.153:5000/updateUser/${editdata._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        HandlegetData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onhandleEvent = (e, field) => {
    setInput((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleDelete = (data) => (e) => {
    e.preventDefault();

    fetch(`http://192.168.0.153:5000/deleteUser/${data._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        HandlegetData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getdata?.map((item) => (
            <tr key={item.id} style={{ margin: "20px", textAlign: "center" }}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>
                <Button onClick={handleEdit(item)}>Edit</Button>
                <Button onClick={handleDelete(item)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modalinputDiv">
              <label>Name</label>
              <input
                type="text"
                defaultValue={editdata?.name}
                value={inputData?.name}
                onChange={(e) => onhandleEvent(e, "name")}
              />
            </div>
            <div className="modalinputDiv">
              <label>Age</label>
              <input
                type="text"
                defaultValue={editdata?.age}
                value={inputData?.age}
                onChange={(e) => onhandleEvent(e, "age")}
              />
            </div>
            <div className="modalinputDiv">
              <label>Gender</label>
              <input
                type="text"
                defaultValue={editdata?.gender}
                value={inputData?.gender}
                onChange={(e) => onhandleEvent(e, "gender")}
              />
            </div>
            <div className="modalinputDiv">
              <Button onClick={handleUpadteData}>Update</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default MyTable;
