import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";
import InputField from "./InputField";
import useUserLogin from "../hooks/useUserLogin";
import showToast from "../utils/showToast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type LoginInputType = {
  email: string;
  password: string;
};

const LoginForm = ({
  input,
  setInput,
}: {
  input: LoginInputType;
  setInput: React.Dispatch<React.SetStateAction<any>>;
}) => {
  //useUserLogin Hook
  const {
    mutate: handleLogin,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useUserLogin();

  const navigate = useNavigate();

  function handleSubmit(): void {
    handleLogin(input);
  }

  //showing toasts
  useEffect(() => {
    if (isError) showToast("Error", error.response?.data as string, "error");
    if (isSuccess) {
      showToast("Success", "Successfully logged in.", "success");
      setTimeout(() => {
        navigate("/goods");
      }, 2000);
    }
  }, [isError, isSuccess]);

  return (
    <Box
      position={"absolute"}
      left={{ lg: "50%", base: "0%" }}
      top={{ lg: "0%", base: "50%" }}
      width={{ lg: "50%", base: "100%" }}
      height={{ lg: "100%", base: "50%" }}
      pl={10}
      pr={10}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading mb={4}>Login .</Heading>
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
        isLoading={isLoading}
        loadingText="verifying"
        color="#5D3FD3"
        borderColor={"#5D3FD3"}
        variant="outline"
        rightIcon={<ArrowForwardIcon />}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
