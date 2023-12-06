import { Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { LoginInputType } from "./LoginForm";

const LoginDescription = ({
  loginInput,
  setLoginInput,
  setSignupMode,
}: {
  loginInput: LoginInputType;
  setLoginInput: React.Dispatch<React.SetStateAction<any>>;
  setSignupMode: React.Dispatch<React.SetStateAction<any>>;
}) => {
  function clearInputs(): void {
    setLoginInput({ ...loginInput, email: "", password: "" });
    return;
  }
  return (
    <Box
      position={"absolute"}
      top={{ lg: "50%", base: "82.5%" }}
      left={{ lg: "82.5%", base: "50%" }}
      width={{ lg: "25%", base: window.innerWidth / 1.5 }}
      transform={"translate(-50%, -50%)"}
      zIndex={2}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading mb={10} color={"white"} textAlign={"center"}>
        Welcome back!
      </Heading>
      <Text
        color={"white"}
        fontFamily={"sans-serif"}
        textAlign={"center"}
        fontWeight={"bold"}
      >
        Welcome back to Goods! Ready to dive back into your personalized
        shopping and selling experience? Log in to your Goods account to access
        your dashboard, manage your listings, and explore the latest in-demand
        products. Whether you're a seller or a buyer, we ensure a smooth and
        enjoyable experience every time. Join the Goods community and let the
        journey continue!
      </Text>
      <HStack mt={8}>
        <Text color={"white"}>New to Goods?</Text>
        <Button
          size={"sm"}
          borderColor={"white"}
          color={"white"}
          ml={2}
          _hover={{
            backgroundColor: "rgb(255, 255, 255)",
            color: "#5D3FD3",
          }}
          variant="outline"
          onClick={() => {
            setSignupMode(true);
            clearInputs();
          }}
        >
          Register!
        </Button>
      </HStack>
    </Box>
  );
};

export default LoginDescription;
