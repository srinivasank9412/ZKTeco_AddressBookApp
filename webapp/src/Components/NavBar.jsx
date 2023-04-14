import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import ContactsSharpIcon from "@mui/icons-material/ContactsSharp";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ borderColor: "blue" }}>
          <IconButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ContactsSharpIcon sx={{ fontSize: "50px", color: "white" }} />
          </IconButton>
          <Typography
            component="div"
            sx={{
              fontSize: "30px",
              fontWeight: "600",
              paddingLeft: "20px",
              flexGrow: 1,
            }}
          >
            ADDRESS BOOK APP
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              sx={{ fontSize: "22px", fontWeight: "600", color: "white" }}
              color="primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
            <Button
              sx={{ fontSize: "22px", fontWeight: "600", color: "white" }}
              onClick={() => {
                navigate("/add");
              }}
            >
              Add Contact
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
