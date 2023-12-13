import { Box, Button } from "@chakra-ui/react";
import usePostPayment from "../hooks/usePostPayment";
import getUserHeaders from "../utils/getUserHeaders";
import { CartType } from "../pages/BasketPage";
import { useEffect, useState } from "react";
import showToast from "../utils/showToast";

export type CheckoutItem = {
  id: number | string;
  name: string;
  priceInCents: number;
  quantity: number;
};

const Payment = ({
  userCart,
  total,
}: {
  userCart: CartType;
  total: string;
}) => {
  const [error, setError] = useState("");
  const headers = getUserHeaders();

  async function handlePayment() {
    setError("");
    const checkoutItems = userCart?.map((cartItem) => {
      return {
        id: cartItem.item!?.id,
        name: cartItem.item!?.name,
        priceInCents: cartItem.item!?.price,
        quantity: cartItem.count!,
      };
    });
    const { data, error } = await usePostPayment(checkoutItems, headers!);

    if (error) {
      setError(error.data);
    } else {
      window.location = data?.data.url;
    }
  }

  useEffect(() => {
    if (error) showToast("Error", error as string, "error");
    return;
  }, [error]);

  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"}>
      <Button
        width={"100%"}
        color={"white"}
        backgroundColor={"#5D3FD3"}
        _hover={{ opacity: 0.7 }}
        onClick={handlePayment}
        isDisabled={total === "£0.00"}
        _disabled={{
          opacity: 0.5,
        }}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default Payment;
