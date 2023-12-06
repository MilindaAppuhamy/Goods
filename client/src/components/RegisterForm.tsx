import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";
import InputField from "./InputField";
import useUserRegister from "../hooks/useUserRegister";
import showToast from "../utils/showToast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  //useUserLogin Hook
  const {
    mutate: handleRegister,
    isLoading,
    isError,
    isSuccess,
    error,
    data: user,
  } = useUserRegister();

  const navigate = useNavigate();

  function handleSubmit(): void {
    handleRegister(input);
    if (isSuccess) {
      setTimeout(() => {
        navigate("/goods");
      }, 2000);
    }
  }

  function handleSuccess() {
    //toast
    showToast("Success", "Successfully registered.", "success");
    //setting the user-token
    const user_token = {
      token: user?.headers["x-auth-token"],
      expiration: Date.now() + 5 * 60 * 60 * 1000, //expires after 5 hours
    };
    localStorage.setItem("user-token", JSON.stringify(user_token));
    //navigation
    setTimeout(() => {
      navigate("/goods");
    }, 2000);
  }

  //showing toasts
  useEffect(() => {
    if (isError) showToast("Error", error.response?.data as string, "error");
    if (isSuccess) handleSuccess();
  }, [isError, isSuccess]);

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
        isLoading={isLoading}
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
