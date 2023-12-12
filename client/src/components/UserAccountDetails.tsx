import { Box, Image, Skeleton, Text } from "@chakra-ui/react";
import useGetUser from "../hooks/useGetUser";
import getUserHeaders from "../utils/getUserHeaders";
import { Navigate } from "react-router-dom";

const UserAccountDetails = () => {
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
          <Text fontFamily={"sans-serif"} fontSize={"14px"} color={"grey"}>
            {user?.data.email}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Text fontFamily={"sans-serif"} fontSize={"18px"} color={"black"}>
            {user?.data.username}
          </Text>
        </Skeleton>
      </Box>
    </Box>
  );
};

export default UserAccountDetails;
