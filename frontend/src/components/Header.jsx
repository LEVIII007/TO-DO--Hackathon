import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useAuth } from "../context/authContext";
import NavLink from "./Navlink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavLink
                bg="#00fffc"
                to="/tasks"
                text="Go To tasks"
                textColor="black"
              />
              <NavLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;