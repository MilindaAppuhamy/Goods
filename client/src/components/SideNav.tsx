import { Box, Heading } from "@chakra-ui/react";
import UserAccountDetails from "./UserAccountDetails";
import NavLinks from "./NavLinks";

const SideNav = () => {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      height={"100%"}
      borderRadius={20}
      backgroundColor={"white"}
      boxShadow={"2px 2px 10px #787878"}
    >
      <Heading
        color={"#5D3FD3"}
        fontWeight={"bold"}
        fontSize={"32px"}
        fontFamily={"sans-serif"}
        pt={4}
        pb={2}
      >
        Goods .
      </Heading>
      <Box
        height={"1px"}
        width={"90%"}
        backgroundColor={"black"}
        borderRadius={3}
        mt={4}
        mb={3}
      />
      <UserAccountDetails />
      <NavLinks />
    </Box>
  );
};

export default SideNav;
