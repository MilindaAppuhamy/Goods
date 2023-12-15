import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useGetCheckoutComplete from "../hooks/useGetPaymentResult";
import getUserHeaders from "../utils/getUserHeaders";

const SuccessMessage = ({
  navigate,
  logout,
}: {
  navigate: NavigateFunction;
  logout: () => void;
}) => {
  return (
    <Box
      width={"95%"}
      height={"max-content"}
      p={4}
      maxW={"600px"}
      borderRadius={"lg"}
      backgroundColor={"#AFE1AF"}
    >
      <Heading fontSize={"x-large"} mt={3} color={"black"}>
        Thank you!
      </Heading>
      <Text my={5} color={"black"}>
        Your order has been placed! You will receive an email confirmation
        shortly.
      </Text>
      <ButtonGroup my={4}>
        <Button
          color={"white"}
          backgroundColor={"#5D3FD3"}
          _hover={{ opacity: 0.7 }}
          onClick={() => navigate("/goods/explore")}
        >
          Keep exploring
        </Button>
        <Button
          colorScheme="black"
          variant="outline"
          color={"black"}
          onClick={logout}
        >
          Logout
        </Button>
      </ButtonGroup>
    </Box>
  );
};

const CanceledMessage = ({
  navigate,
  logout,
}: {
  navigate: NavigateFunction;
  logout: () => void;
}) => {
  return (
    <Box
      width={"95%"}
      height={"max-content"}
      p={4}
      maxW={"600px"}
      borderRadius={"lg"}
      backgroundColor={"#FAA0A0"}
    >
      <Heading fontSize={"x-large"} mt={3} color={"black"}>
        Oops!
      </Heading>
      <Text my={5} color={"black"}>
        Your order has been canceled. Continue to shop around and checkout when
        you're ready.
      </Text>
      <ButtonGroup my={4}>
        <Button
          color={"white"}
          backgroundColor={"#5D3FD3"}
          _hover={{ opacity: 0.7 }}
          onClick={() => navigate("/goods/explore")}
        >
          Back to exploring
        </Button>
        <Button
          colorScheme="black"
          variant="outline"
          color={"black"}
          onClick={logout}
        >
          Logout
        </Button>
      </ButtonGroup>
    </Box>
  );
};

const PaymentResultPage = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const query = new URLSearchParams(window.location.search);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  async function completeCheckoutSession() {
    const headers = getUserHeaders();
    const userId = localStorage.getItem("userId");

    //retrieve the stripe session Id from session storage
    const sessionId =
      JSON.parse(sessionStorage.getItem("checkout_session")!)?.sessionId ||
      null;
    //if not available redirects to the explore page
    if (!sessionId) return navigate("/goods/explore");

    //perform the checkout
    await useGetCheckoutComplete(userId!, sessionId, headers!);
  }

  function logout() {
    localStorage.removeItem("user-token");
    localStorage.removeItem("userId");
    navigate("/");
  }

  useEffect(() => {
    function getState() {
      if (query.get("success")) {
        setIsSuccess(true);
        completeCheckoutSession();
      } else if (query.get("canceled")) setIsSuccess(false);
      else {
        logout();
      }
    }
    getState();
  }, []);

  return (
    <Center
      width={"100vw"}
      height={"100vh"}
      backgroundColor={colorMode === "light" ? "whitesmoke" : "#323232"}
      position={"relative"}
      overflow={"scroll"}
    >
      {isSuccess ? (
        <SuccessMessage navigate={navigate} logout={logout} />
      ) : (
        <CanceledMessage navigate={navigate} logout={logout} />
      )}
    </Center>
  );
};

export default PaymentResultPage;
