import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartItemType } from "../pages/BasketPage";

const BasketItem = ({ cartItem }: { cartItem: CartItemType }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant="outline"
      display={"flex"}
      flexDir={"row"}
      alignItems={"center"}
      px={1}
    >
      <Box width={"100px"}>
        <Image
          w={"90px"}
          h={"90px"}
          borderRadius={"lg"}
          src={cartItem.item?.image}
          alt={cartItem.item?.name}
        />
      </Box>

      <Stack width={"100%"}>
        <CardBody width={"100%"}>
          <Flex
            flexDir={"row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            py={1}
          >
            <Box width={"55%"}>
              <Heading fontSize={"medium"}>{cartItem.item?.name}</Heading>
              <Text py="1">{`£${(cartItem.item!?.price / 100).toFixed(
                2
              )}`}</Text>
            </Box>
            <HStack>
              <IconButton
                aria-label="decrement"
                icon={<FaMinus />}
                size={"sm"}
              />
              <Text py="2" px={2}>
                {cartItem.count}
              </Text>
              <IconButton
                aria-label="increment"
                icon={<FaPlus />}
                size={"sm"}
              />
            </HStack>
          </Flex>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default BasketItem;
