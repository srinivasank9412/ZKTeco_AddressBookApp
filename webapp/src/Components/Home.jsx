import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";

function Home() {
  let [contactData, setContactData] = useState([]);
  let [searchData, setSearchData] = useState("");
  const navigate = useNavigate();

  const loadContacts = () => {
    fetch("http://localhost:8080/addressBook/", {
      method: "GET",
    }).then((response) => {
      response.json().then((json) => {
        console.log(json.data);
        // const ascData = [...json.data].sort((a, b) =>
        //   a.firstName > b.firstName ? 1 : -1
        // );
        // console.log(ascData);
        setContactData([...json.data]);
        console.log(contactData);
      });
    });
  };
  useEffect(() => {
    loadContacts();
  }, []);

  const searchHandler = () => {
    console.log(searchData);
    const filterdData=contactData.filter((check)=>{if(check.firstName.toLowerCase().includes(searchData) || check.lastName.toLowerCase().includes(searchData)){return true}})
    console.log(filterdData);
    setContactData(filterdData)
  };

  const seeContactBtnHandler = (e) => {
    console.log("see contact");
    console.log(e);
    navigate("/about", { state: e });
  };
  const tableCellStyle = {
    fontSize: "25px",
    fontWeight: "550",
  };
  const deleteBthHandler = (id) => {
    console.log("delete");
    fetch(`http://localhost:8080/addressBook/${id}`, {
      method: "DELETE",
    }).then((response) => {
      response.json().then((json) => {
        console.log(json);
        alert(json.message);
        window.location.reload();
      });
    });
  };
  return (
    <div>
      <Stack direction="row" spacing={3} sx={{marginTop:'50px'}}>
        <TextField
          type="text"
          sx={{ marginLeft: "600px", width: "500px" }}
          placeholder="Enter name"
          onChange={(e)=>{setSearchData(e.target.value)}}
        ></TextField>
        <Button
          variant="contained"
          onClick={(e) => {
            console.log(e.target.value);
            searchHandler(e);
          }}
        >
          Search
        </Button>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{ width: "1500px", margin: "auto", marginTop: "30px" }}
      >
        <Table aria-label="address-tbl" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle}>Id</TableCell>
              <TableCell sx={tableCellStyle}>First name</TableCell>
              <TableCell sx={tableCellStyle}>Last name</TableCell>
              <TableCell sx={tableCellStyle}>Mobile</TableCell>
              <TableCell sx={tableCellStyle} align="center">
                Email
              </TableCell>
              <TableCell sx={tableCellStyle} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactData.map((address) => {
              return (
                <TableRow key={address.id}>
                  <TableCell sx={{ fontSize: "18px", color: "olive" }}>
                    {address.id}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px", color: "olive" }}>
                    {address.firstName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px", color: "olive" }}>
                    {address.lastName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px", color: "olive" }}>
                    {address.phone}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "18px", color: "olive" }}
                  >
                    {address.email}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => seeContactBtnHandler(address)}
                      variant="contained"
                      sx={{ width: "100px", marginRight: "10px" }}
                    >
                      view{" "}
                    </Button>
                    <Button
                      onClick={() => {
                        deleteBthHandler(address.id);
                      }}
                      variant="contained"
                      color="error"
                      sx={{ width: "100px" }}
                    >
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
