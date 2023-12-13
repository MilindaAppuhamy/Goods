import { Box, Heading, Stack, useColorMode } from "@chakra-ui/react";
import { CartType } from "../pages/BasketPage";
import BasketItem from "./BasketItem";

const Basket = ({ userCart }: { userCart: CartType }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      gridArea={"basket"}
      width={"98%"}
      maxW={"800px"}
      backgroundColor={colorMode === "light" ? "white" : "#323232"}
      borderRadius={"lg"}
      p={{ md: 3, base: 2 }}
      mt={{ md: 0, base: 2 }}
    >
      <Heading
        fontSize={"larger"}
        color={colorMode === "light" ? "#5D3FD3" : "#CF9FFF"}
        mb={30}
      >
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
