import { Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { RegisterInputType } from "./RegisterForm";

const SignupDescription = ({
  registerInput,
  setRegisterInput,
  setSignupMode,
}: {
  registerInput: RegisterInputType;
  setRegisterInput: React.Dispatch<React.SetStateAction<any>>;
  setSignupMode: React.Dispatch<React.SetStateAction<any>>;
}) => {
  function clearInputs(): void {
    setRegisterInput({
      ...registerInput,
      username: "",
      email: "",
      password: "",
    });
    return;
  }
  return (
    <Box
      position={"absolute"}
      top={{ lg: "50%", base: "17.5%" }}
      left={{ lg: "17.5%", base: "50%" }}
      width={{ lg: "25%", base: window.innerWidth / 1.5 }}
      transform={"translate(-50%, -50%)"}
      zIndex={2}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading mb={10} color={"white"} textAlign={"center"}>
        Welcome to Goods!
      </Heading>
      <Text
        color={"white"}
        fontFamily={"sans-serif"}
        textAlign={"center"}
        fontWeight={"bold"}
      >
        Welcome to Goods! Unlock a world of possibilities by creating your Goods
        account. Join our thriving community of buyers and sellers, and embark
        on a seamless journey to discover, buy, and sell unique items. Register
        today to enjoy being part of a diverse marketplace. Turn your passion
        into profit or find treasures that speak to you - Goods is where your
        e-commerce adventure begins!
      </Text>
      <HStack mt={8}>
        <Text color={"white"}>Already with us?</Text>
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
            setSignupMode(false);
            clearInputs();
          }}
        >
          Login!
        </Button>
      </HStack>
    </Box>
  );
};

export default SignupDescription;
