import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateContact() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fNameMsg, setFNameMsg] = useState("");
  const [lNameMsg, setLNameMsg] = useState("");
  const [ageMsg, setAgeMsg] = useState("");
  const [relMsg, setRelMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [cityMsg, setCityMsg] = useState("");
  const [countryMsg, setCountryMsg] = useState("");
  const [isValid, setIsValid] = useState(false);
  console.log(location.state);
  const [addObj, setAddObj] = useState({
    ...location.state
  });
  const [msg, setMsg] = useState("");
  const submitHandler = () => {
    setFNameMsg("");
    setLNameMsg("");
    setAgeMsg("");
    setRelMsg("");
    setPhoneMsg("");
    setEmailMsg("");
    setCityMsg("");
    setCountryMsg("");

    console.log(addObj);
    let nameRegex = /^[a-zA-Z]+$/;
    let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (addObj.firstName.trim().length === 0) {
      setFNameMsg(() => "Please enter First name");
      setIsValid(false);
    }
    if (addObj.phone.trim().length === 0) {
      setPhoneMsg("Please enter Phone number");
      setIsValid(false);
    }
    if (addObj.phone.trim().length > 20) {
      setPhoneMsg(() => "Phone number cannot be more than 20 digits");
      setIsValid(false);
    }
    if (addObj.email.trim().length === 0) {
      setEmailMsg("Please enter Email");
      setIsValid(false);
    }
    if (addObj.city.trim().length === 0) {
      setCityMsg("Please enter City");
      setIsValid(false);
    }
    if (!nameRegex.test(addObj.city) && addObj.city.trim().length !== 0) {
      setCityMsg("City name cannot contain numbers or special characters");
      setIsValid(false);
    }
    if (
      !nameRegex.test(addObj.firstName) &&
      addObj.firstName.trim().length !== 0
    ) {
      setFNameMsg("Name should not contain numbers or special characters");
      setIsValid(false);
    }
    if (
      !nameRegex.test(addObj.lastName) &&
      addObj.lastName.trim().length !== 0
    ) {
      setLNameMsg("Name cannot contain numbers or special characters");
      setIsValid(false);
    }
    if (addObj.age > 100) {
      setAgeMsg("Enter valid age");
      setIsValid(false);
    }
    if (addObj.relation.length === 0) {
      setRelMsg("Please select relation");
      setIsValid(false);
    }
    if (addObj.country.length === 0) {
      setCountryMsg("Please select Country");
      setIsValid(false);
    }
    if (!emailRegex.test(addObj.email)) {
      setEmailMsg("Email should be in the format of  xyz@xyz.xyz ");
      setIsValid(false);
    }
    if (
      fNameMsg === "" &&
      lNameMsg === "" &&
      ageMsg === "" &&
      relMsg === "" &&
      phoneMsg === "" &&
      emailMsg === "" &&
      cityMsg === "" &&
      countryMsg === ""
    ) {
      setIsValid(true);
    }
    console.log(addObj);
    if (isValid) {
      fetch(`http://localhost:8080/addressBook/${location.state.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ ...addObj }),
      }).then((response) => {
        response.json().then((json) => {
          console.log(json);
          if (json.message === "Contact updated successfully") {
            alert(json.message);
            navigate("/");
          } else {
            setMsg(json.message);
          }
        });
      });
    }
  };

  return (
    <div>
      <Typography
        sx={{
          fontSize: "40px",
          marginLeft: "820px",
          fontWeight: "600",
          marginTop: "30px",
        }}
      >
        UPDATE PAGE
      </Typography>
      <Grid
        container
        mx={61}
        my={10}
        spacing={2}
        width={900}
        sx={{ marginTop: "30px" }}
      >
        <Grid item xs={6}>
          <TextField
            required
            label="First name"
            fullWidth
            type="text"
            value={addObj.firstName}
            onChange={(e) => {
              setAddObj({ ...addObj, firstName: e.target.value });
              console.log(addObj);
            }}
          />
          <Typography sx={{ color: "red", marginLeft: "5px" }}>
            {fNameMsg}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last name"
            fullWidth
            type="text"
            value={addObj.lastName}
            onChange={(e) => {
              setAddObj({ ...addObj, lastName: e.target.value });
              console.log(addObj);
            }}
          />
          <Typography sx={{ color: "red", marginLeft: "5px" }}>
            {lNameMsg}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Age"
            type="number"
            fullWidth
            value={addObj.age}
            onChange={(e) => {
              setAddObj({ ...addObj, age: e.target.value });
              console.log(addObj);
            }}
          />
          <Typography sx={{ color: "red", marginLeft: "5px" }}>
            {ageMsg}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <TextField
              select
              label="Relation"
              type="text"
              fullWidth
              value={addObj.relation}
              onChange={(e) => {
                setAddObj({ ...addObj, relation: e.target.value });
                console.log(addObj);
              }}
            >
              <MenuItem value="Friend">Friend</MenuItem>
              <MenuItem value="Collegue">Collegue</MenuItem>
              <MenuItem value="Relative">Friend</MenuItem>
            </TextField>
          </Box>
          <Typography sx={{ color: "red", marginLeft: "5px" }}>
            {relMsg}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="Phone"
            type="number"
            fullWidth
            value={addObj.phone}
            onChange={(e) => {
              setAddObj({ ...addObj, phone: e.target.value });
              console.log(addObj);
            }}
          />
          <Typography sx={{ color: "red", marginLeft: "5px" }}>
            {phoneMsg}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="Email"
            type="text"
            fullWidth
            value={addObj.email}
            onChange={(e) => {
              setAddObj({ ...addObj, email: e.target.value });
              console.log(addObj);
            }}
          />
          <Typography sx={{ color: "red", marginLeft: "5px" }}>
            {emailMsg}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Street"
            type="text"
            fullWidth
            value={addObj.street}
            onChange={(e) => {
              setAddObj({ ...addObj, street: e.target.value });
              console.log(addObj);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="City"
            type="text"
            fullWidth
            value={addObj.city}
            onChange={(e) => {
              setAddObj({ ...addObj, city: e.target.value });
              console.log(addObj);
            }}
          />
          <Typography sx={{ color: "red", marginLeft: "5px" }}>
            {cityMsg}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <TextField
              required
              select
              label="Country"
              type="text"
              fullWidth
              value={addObj.country}
              onChange={(e) => {
                setAddObj({ ...addObj, country: e.target.value });
              }}
            >
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
            </TextField>
          </Box>
          <Typography sx={{ color: "red", marginLeft: "5px" }}>
            {countryMsg}
          </Typography>
        </Grid>
      </Grid>
      <Typography
        variant="h5"
        sx={{
          fontSize: "25px",
          marginLeft: "515px",
          marginTop: "-20px",
          marginBottom: "30px",
          fontWeight: "600",
          color: "red",
        }}
      >
        {msg}
      </Typography>
      <Button
        type="submit"
        variant="contained"
        sx={{
          marginLeft: "830px",
          width: "280px",
          height: "50px",
          fontSize: "25px",
          fontWeight: "600",
        }}
        onClick={()=>{setIsValid(()=>true)
          submitHandler()}}
      >
        Save
      </Button>
    </div>
  );
}

export default UpdateContact;
