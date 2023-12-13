import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import DeleteMyStoreItem from "./DeleteMyStoreItem";
import EditMyStoreItem from "./EditMyStoreItem";
import { ItemType } from "./ItemCard";

const MyStoreItem = ({ item }: { item: ItemType }) => {
  const { colorMode } = useColorMode();
  const formattedPrice = `£${(item.price / 100).toFixed(2)}`;

  return (
    <Card
      variant="outline"
      display={"flex"}
      flexDir={{ md: "row", base: "column" }}
      alignItems={"center"}
      p={2}
      my={4}
    >
      <Box w={"200px"} h={"180px"}>
        <Image
          width={"180px"}
          height={"180px"}
          src={item.image}
          alt={item.name}
          borderRadius={"lg"}
        />
      </Box>

      <Stack
        display={"flex"}
        width={"100%"}
        flexDir={{ md: "row", base: "column" }}
      >
        <CardBody mx={{ lg: 2, base: 0 }}>
          <Heading size="sm">{item.name}</Heading>

          <Box
            borderRadius={"md"}
            backgroundColor={"#5D3FD3"}
            width={"max-content"}
            mt={1}
          >
            <Text px={2} py={1} color={"white"} fontWeight={"medium"}>
              {item.category}
            </Text>
          </Box>

          {item.quantity > 10 ? (
            <Text
              pt={3}
              color={colorMode === "light" ? "green" : "#50C878"}
              fontWeight={"medium"}
            >
              {item.quantity} items left in the stock.
            </Text>
          ) : (
            <Text
              pt={3}
              color={colorMode === "light" ? "red" : "#FF5733"}
              fontWeight={"medium"}
            >
              Only {item.quantity} items left in the stock.
            </Text>
          )}

          <Text pt="2">"{item.description}"</Text>

          <Text
            color={colorMode === "light" ? "#5D3FD3" : "#CF9FFF"}
            fontSize="lg"
            pt={2}
            fontWeight={"bold"}
          >
            {formattedPrice}
          </Text>
        </CardBody>

        <Box
          display={"flex"}
          flexDir={{ md: "column", base: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          px={1}
        >
          <EditMyStoreItem updatingItem={item} />
          <DeleteMyStoreItem deletingItem={item} />
        </Box>
      </Stack>
    </Card>
  );
};

export default MyStoreItem;
