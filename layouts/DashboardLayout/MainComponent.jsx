import Box from "@mui/material/Box";
import DrawerHeaderComponent from "./DrawerHeader";

const MainComponent = ({ children }) => (
  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <DrawerHeaderComponent />
    {children}
  </Box>
);

export default MainComponent;
