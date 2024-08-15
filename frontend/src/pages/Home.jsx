import { Box, useMediaQuery, useTheme } from "@mui/material";
import Header from "../components/Header";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <h1>Fuck you all tasks</h1>
        <Header />
      </Box>
    </Box>
  );
};

export default Home;