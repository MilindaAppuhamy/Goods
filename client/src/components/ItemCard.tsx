import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import useAddToCart from "../hooks/useAddToCart";
import getUserHeaders from "../utils/getUserHeaders";
import useGetUser from "../hooks/useGetUser";
import showToast from "../utils/showToast";

export type ItemType = {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
};

const ItemCard = ({ item }: { item: ItemType }) => {
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const formattedPrice = `£${(item.price / 100).toFixed(2)}`;

  const headers = getUserHeaders();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  const { data: user } = useGetUser(userId!, headers!);

  const {
    mutateAsync: AddToCart,
    isSuccess,
    isError,
    error,
  } = useAddToCart(headers!);

  async function handleAddToCart() {
    await AddToCart({
      itemId: item.id,
      userId: user?.data.id,
    });
  }

  useEffect(() => {
    if (isError) showToast("Error", error.response?.data as string, "error");
    if (isSuccess)
      showToast("Success", "Successfully added to cart.", "success");
  }, [isError, isSuccess]);

  function handleAddToWishList() {
    setWishlisted(!wishlisted);
    console.log("Added to wishlist:", item.name);
  }

  return (
    <Card w={"320px"} m={"8px"}>
      <CardBody>
        <Center>
          <Image
            src={item.image}
            alt={item.name}
            borderRadius="lg"
            width={"200px"}
            height={"200px"}
          />
        </Center>
        <Stack mt="6" spacing="3">
          <Heading size="md">{item.name}</Heading>
          <Text>{item.description}</Text>
          <Text color="#5D3FD3" fontSize="2xl">
            {formattedPrice}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup
          spacing="2"
          width={"100%"}
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
        >
          <Button
            color={"white"}
            backgroundColor={"#5D3FD3"}
            _hover={{ opacity: 0.7 }}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
          <IconButton
            variant="outline"
            color="#5D3FD3"
            border={"1px solid #5D3FD3"}
            aria-label="Add to wishlist"
            onClick={handleAddToWishList}
            icon={wishlisted ? <GoHeartFill /> : <GoHeart />}
          />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
