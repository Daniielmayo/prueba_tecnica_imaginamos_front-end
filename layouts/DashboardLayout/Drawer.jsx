import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DrawerHeaderComponent from "./DrawerHeader";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import useUserStore from "../../store/UserStore";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerComponent = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const { clearUser } = useUserStore();

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  const handleNavigation = (text) => {
    if (text === "Salas") {
      navigate("/dashboard");
    } else if (text === "Mis Reservas") {
      navigate("/dashboard/my-reservations");
    }
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeaderComponent>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeaderComponent>
      <Divider />
      <List>
        {["Salas", "Mis Reservas"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigation(text)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  mr: open ? 3 : "auto",
                }}
              >
                {index % 2 === 0 ? <MeetingRoomIcon /> : <EventSeatIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "end" : "center",
                px: 2.5,
              }}
              onClick={handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  mr: open ? 3 : "auto",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Salir" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
