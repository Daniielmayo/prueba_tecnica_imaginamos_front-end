import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "./AppBar";
import DrawerComponent from "./Drawer";
import MainComponent from "./MainComponent";

export const DashboardLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      {" "}
      <CssBaseline />{" "}
      <AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} />{" "}
      <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} />{" "}
      <MainComponent> {children} </MainComponent>{" "}
    </Box>
  );
};
