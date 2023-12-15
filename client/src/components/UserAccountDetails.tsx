import { Box, Image, Skeleton, Text, useColorMode } from "@chakra-ui/react";
import useGetUser from "../hooks/useGetUser";
import getUserHeaders from "../utils/getUserHeaders";
import { Navigate } from "react-router-dom";

const UserAccountDetails = () => {
  const { colorMode } = useColorMode();
  const headers = getUserHeaders();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  const { data: user, error, isLoading } = useGetUser(userId!, headers!);

  return error ? (
    <Navigate to={"/"} />
  ) : (
    <Box pt={{ lg: 2, base: 1 }} display={"flex"} alignItems={"center"}>
      <Image
        src="https://img.freepik.com/free-vector/cute-happy-penguin-cartoon-icon-illustration-animal-nature-icon-concept-isolated-flat-cartoon-style_138676-2095.jpg"
        width={"60px"}
        height={"60px"}
        borderRadius={"50%"}
        mr={3}
      />
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Skeleton isLoaded={!isLoading}>
          <Text
            fontFamily={"sans-serif"}
            fontSize={"14px"}
            color={colorMode === "light" ? "grey" : "white"}
          >
            {user?.data.email.length > 22
              ? `${user?.data.email.substring(0, 22)}...`
              : user?.data.email}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Text
            fontFamily={"sans-serif"}
            fontSize={"18px"}
            color={colorMode === "light" ? "black" : "white"}
          >
            {user?.data.username.length > 16
              ? `${user?.data.username.substring(0, 16)}...`
              : user?.data.username}
          </Text>
        </Skeleton>
      </Box>
    </Box>
  );
};

export default UserAccountDetails;
