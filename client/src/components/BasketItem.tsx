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
import useUpdateCart from "../hooks/useUpdateCart";
import getUserHeaders from "../utils/getUserHeaders";
import { useEffect } from "react";
import showToast from "../utils/showToast";

const BasketItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const headers = getUserHeaders();
  const {
    mutateAsync: updateCart,
    isError,
    error,
  } = useUpdateCart(cartItem?.id!, headers!);

  async function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    let action = e.currentTarget.name;
    await updateCart({
      data: { itemId: cartItem.itemId, userId: cartItem.userId },
      query: action,
    });
  }

  useEffect(() => {
    if (isError) showToast("Error", error.response?.data as string, "error");
  }, [isError]);

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
                name="decrement"
                aria-label="decrement"
                icon={<FaMinus />}
                size={"sm"}
                onClick={handleClick}
              />
              <Text py="2" px={2}>
                {cartItem.count}
              </Text>
              <IconButton
                name="increment"
                aria-label="increment"
                icon={<FaPlus />}
                size={"sm"}
                onClick={handleClick}
              />
            </HStack>
          </Flex>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default BasketItem;
