import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { CartType } from "../pages/BasketPage";

const OrderSummary = ({ userCart }: { userCart: CartType }) => {
  const { colorMode } = useColorMode();

  const total = userCart
    ?.map((cartItem) => cartItem?.item?.price! * cartItem?.count!)
    .reduce((acc, curr) => acc + curr, 0);

  const formattedTotal =
    isNaN(total) || !total ? "£0.00" : `£${(total / 100).toFixed(2)}`;

  return (
    <Box
      gridArea={"summary"}
      ml={{ md: 1, base: 0 }}
      width={"98%"}
      height={"max-content"}
      backgroundColor={colorMode === "light" ? "white" : "#323232"}
      borderRadius={"lg"}
      p={{ md: 3, base: 2 }}
    >
      <Heading
        fontSize={"larger"}
        color={colorMode === "light" ? "#5D3FD3" : "#CF9FFF"}
        mb={30}
      >
        Order summary
      </Heading>
      <Box>
        {userCart?.map((cartItem) => (
          <Container key={cartItem.id}>
            <Flex justifyContent={"space-between"} my={3}>
              <Box width={"60%"}>
                <Text fontWeight={"medium"}>{cartItem.item?.name}</Text>
                <Text
                  fontSize={"medium"}
                  color={colorMode === "light" ? "GrayText" : "#C0C0C0"}
                >
                  x {cartItem.count}
                </Text>
              </Box>
              <Text>{`£${(cartItem.item!?.price / 100).toFixed(2)}`}</Text>
            </Flex>
            <Divider />
          </Container>
        ))}
      </Box>
      <Box
        height={"1px"}
        width={"100%"}
        backgroundColor={colorMode === "light" ? "black" : "white"}
        borderRadius={3}
        mt={4}
        mb={3}
      />
      <Box
        display={"flex"}
        flexDir={"row"}
        justifyContent={"space-around"}
        mt={6}
        mb={3}
      >
        <Text fontWeight={"bold"}>Total:</Text>
        <Text
          fontWeight={"bold"}
          color={colorMode === "light" ? "#5D3FD3" : "#CF9FFF"}
        >
          {formattedTotal}
        </Text>
      </Box>
    </Box>
  );
};

export default OrderSummary;
