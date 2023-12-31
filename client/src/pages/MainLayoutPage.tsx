import { Grid, GridItem, Show, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import SideDrawer from "../components/SideDrawer";

const MainLayoutPage = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Grid
        gridTemplateAreas={{ lg: `"sideNav main"`, base: `"main"` }}
        gridTemplateRows={"1fr"}
        gridTemplateColumns={{ lg: "280px 1fr", base: "1fr" }}
        minHeight={"100vh"}
        backgroundColor={colorMode === "light" ? "#CCCCFF" : "#CF9FFF"}
        p={1}
      >
        <Show above="lg">
          <GridItem area={"sideNav"}>
            <SideNav />
          </GridItem>
        </Show>

        <GridItem area={"main"} pl={1}>
          <Outlet />
          <Show below="lg">
            <SideDrawer />
          </Show>
        </GridItem>
      </Grid>
    </>
  );
};

export default MainLayoutPage;
