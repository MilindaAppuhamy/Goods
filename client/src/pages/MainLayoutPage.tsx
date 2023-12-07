import { Box, Button, Grid, GridItem, Heading, Show } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";

const MainLayoutPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid
        gridTemplateAreas={{ lg: `"sideNav main"`, base: `"main"` }}
        gridTemplateRows={"1fr"}
        gridTemplateColumns={{ lg: "280px 1fr", base: "1fr" }}
        height={"100vh"}
        backgroundColor={"#CCCCFF"}
        p={1}
      >
        <Show above="lg">
          <GridItem area={"sideNav"}>
            <SideNav />
          </GridItem>
        </Show>

        <GridItem area={"main"} pl={20}>
          <Box>
            <Heading>Main page</Heading>
            <Button
              onClick={() => {
                localStorage.removeItem("user-token");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default MainLayoutPage;
