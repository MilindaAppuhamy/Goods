import { Box, Heading, Stack } from "@chakra-ui/react";
import { CartType } from "../pages/BasketPage";
import BasketItem from "./BasketItem";

const Basket = ({ userCart }: { userCart: CartType }) => {
  return (
    <Box
      gridArea={"basket"}
      width={"98%"}
      maxW={"800px"}
      backgroundColor={"white"}
      borderRadius={"lg"}
      p={{ md: 3, base: 2 }}
      mt={{ md: 0, base: 2 }}
    >
      <Heading fontSize={"larger"} color={"#5D3FD3"} mb={30}>
        Basket
      </Heading>
      <Stack width={"100%"} mt={2}>
        {userCart?.map((cartItem) => (
          <BasketItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </Stack>
    </Box>
  );
};

export default Basket;
