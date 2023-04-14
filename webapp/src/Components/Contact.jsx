import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  const cDetails = {
    ...location.state,
  };
  const updateBthHandler = () => {
    navigate("/update", { state: location.state });
  };
  const deleteBthHandler = () => {
    console.log("delete");
    fetch(`http://localhost:8080/addressBook/${location.state.id}`, {
      method: "DELETE",
    }).then((response) => {
      response.json().then((json) => {
        console.log(json);
        alert(json.message);
        navigate("/");
      });
    });
  };
  return (
    <div>
      <Box width="900px" sx={{ margin: "auto", marginTop: "50px" }}>
        <Card
          sx={{
            paddingLeft: "50px",
            paddingBottom: "30px",
            paddingTop: "20px",
          }}
        >
          <CardContent>
            <Typography variant="h3">
              {cDetails.firstName} {cDetails.lastName}
            </Typography>
            <Stack
              direction="row"
              spacing={28}
              sx={{ marginTop: "50px", marginBottom: "20px" }}
            >
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: "600", fontSize: "28px" }}>
                  General details
                </Typography>
                <Stack direction="row">
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px" }}
                  >
                    Age:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px", color: "olive" }}
                  >
                    {cDetails.age}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px" }}
                  >
                    Relation:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px", color: "olive" }}
                  >
                    {cDetails.relation}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px" }}
                  >
                    Phone:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px", color: "olive" }}
                  >
                    {cDetails.phone}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px" }}
                  >
                    Email:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px", color: "olive" }}
                  >
                    {cDetails.email}
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "600", fontSize: "28px" }}
                >
                  Address
                </Typography>
                <Typography variant="h5"></Typography>
                <Typography variant="h5"></Typography>
                <Typography variant="h5"></Typography>
                <Stack direction="row">
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px" }}
                  >
                    Street:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px", color: "olive" }}
                  >
                    {cDetails.street}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px" }}
                  >
                    City:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px", color: "olive" }}
                  >
                    {cDetails.city}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px" }}
                  >
                    Country:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "550", fontSize: "24px", color: "olive" }}
                  >
                    {cDetails.country}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
          <CardActions>
            <Stack direction="row" spacing={10} sx={{ marginLeft: "90px" }}>
              <Button
                variant="contained"
                color="warning"
                sx={{ width: "250px", fontSize: "21px", fontWeight: "600" }}
                onClick={updateBthHandler}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "250px", fontSize: "21px", fontWeight: "600" }}
                onClick={deleteBthHandler}
              >
                Delete
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}

export default Contact;
