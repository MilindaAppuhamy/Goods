import { SimpleGrid } from "@chakra-ui/react";
import Basket from "../components/Basket";
import { ItemType } from "../components/ItemCard";
import OrderSummary from "../components/OrderSummary";
import useGetCart from "../hooks/useGetCart";
import getUserHeaders from "../utils/getUserHeaders";

export type CartItemType = {
  id?: number;
  itemId: number;
  count?: number;
  userId?: number | string;
  item?: ItemType;
};

export type CartType = CartItemType[];

const BasketPage = () => {
  const headers = getUserHeaders();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  const { data } = useGetCart(userId!, headers!);
  const userCart: CartType = data?.data;

  return (
    <SimpleGrid
      gridTemplateAreas={{
        md: `"basket summary"`,
        base: `"summary" 
              "basket"`,
      }}
      gridTemplateRows={{ md: "1fr", base: "auto" }}
      gridTemplateColumns={{ md: "65% 35%", base: "1fr" }}
      justifyItems={{ md: "center", base: "unset" }}
      m={{ md: 2, base: 0 }}
    >
      <Basket userCart={userCart} />
      <OrderSummary userCart={userCart} />
    </SimpleGrid>
  );
};

export default BasketPage;
