import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usePostPayment from "../hooks/usePostPayment";
import { CartType } from "../pages/BasketPage";
import getUserHeaders from "../utils/getUserHeaders";
import showToast from "../utils/showToast";

export type CheckoutItem = {
  id: number | string;
  name: string;
  image: string;
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
  const [responseError, setResponseError] = useState("");
  const headers = getUserHeaders();

  async function handlePayment() {
    setResponseError("");

    const checkoutItems = userCart?.map((cartItem) => {
      return {
        id: cartItem.item!?.id,
        name: cartItem.item!?.name,
        image: cartItem.item!?.image,
        priceInCents: cartItem.item!?.price,
        quantity: cartItem.count!,
      };
    });

    const { data, error } = await usePostPayment(checkoutItems, headers!);

    if (error) {
      setResponseError(error.data);
    } else {
      sessionStorage.setItem(
        "checkout_session",
        JSON.stringify({ sessionId: data?.data.session_id! })
      );
      window.location = data?.data.url;
    }
  }

  useEffect(() => {
    if (responseError) {
      showToast("Error", responseError as string, "error");
    }
    return;
  }, [responseError]);

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
