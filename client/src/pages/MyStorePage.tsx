import { Box, Heading, Skeleton } from "@chakra-ui/react";
import AddMyStoreItem from "../components/AddMyStoreItem";
import { ItemType } from "../components/ItemCard";
import MyStoreItem from "../components/myStoreItem";
import useGetUser from "../hooks/useGetUser";
import useGetUserItems from "../hooks/useGetUserItems";
import getUserHeaders from "../utils/getUserHeaders";

const MyStorePage = () => {
  const headers = getUserHeaders();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  //getting the user
  const { data: user, isLoading } = useGetUser(userId!, headers!);
  const username = user?.data.username;

  //getting the user's items
  const { data: myItems } = useGetUserItems(userId!, headers!);

  return (
    <>
      <Box
        width={"98%"}
        minHeight={{ lg: "98%", base: "100%" }}
        backgroundColor={"white"}
        borderRadius={"lg"}
        m={{ lg: 3, base: 0 }}
        p={4}
      >
        <Skeleton isLoaded={!isLoading} width={"max-content"}>
          <Heading
            fontSize={"larger"}
            color={"#5D3FD3"}
            mb={30}
            textAlign={{ lg: "left", base: "center" }}
          >
            {`${username}'s store`}
          </Heading>
        </Skeleton>

        <AddMyStoreItem />

        {myItems?.data.map((item: ItemType) => (
          <MyStoreItem key={item.id} item={item} />
        ))}
      </Box>
    </>
  );
};

export default MyStorePage;
