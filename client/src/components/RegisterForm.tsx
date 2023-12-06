import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";
import InputField from "./InputField";

export type RegisterInputType = {
  username: string;
  email: string;
  password: string;
};

const RegisterForm = ({
  input,
  setInput,
}: {
  input: RegisterInputType;
  setInput: React.Dispatch<React.SetStateAction<any>>;
}) => {
  function handleSubmit(): void {}

  return (
    <Box
      position={"absolute"}
      width={{ lg: "50%", base: "100%" }}
      height={{ lg: "100%", base: "50%" }}
      pl={10}
      pr={10}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading mb={4}>Register .</Heading>
      <InputField
        value="username"
        input={input}
        label={"Username"}
        setInput={setInput}
      />
      <InputField
        value="email"
        input={input}
        label={"Email"}
        setInput={setInput}
      />
      <InputField
        value="password"
        input={input}
        label={"Password"}
        setInput={setInput}
      />
      <Button
        width={"90%"}
        mt={5}
        maxW={"300px"}
        isLoading={false}
        loadingText="verifying"
        color="#5D3FD3"
        borderColor={"#5D3FD3"}
        variant="outline"
        rightIcon={<ArrowForwardIcon />}
        onClick={handleSubmit}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
