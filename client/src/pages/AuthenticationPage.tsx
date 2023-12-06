import LoginForm, { LoginInputType } from "../components/LoginForm";
import RegisterForm, { RegisterInputType } from "../components/RegisterForm";
import BackdropCircle from "../components/BackdropCircle";
import { Box, Center } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useSize } from "@chakra-ui/react-use-size";

const AuthenticationPage = () => {
  const elementRef = useRef<any>();
  const width = useSize(elementRef)?.width;
  const height = useSize(elementRef)?.height;
  const [signupMode, setSignupMode] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState<LoginInputType>({
    email: "",
    password: "",
  });
  const [registerInput, setRegisterInput] = useState<RegisterInputType>({
    username: "",
    email: "",
    password: "",
  });

  return (
    <Center
      width={"100vw"}
      height={{ lg: "100vh", base: "175vh" }}
      backgroundColor={"whitesmoke"}
      position={"relative"}
      overflow={"scroll"}
    >
      <Box
        ref={elementRef}
        width={{ lg: "80%", base: "90%" }}
        height={{ lg: "80%", base: "95%" }}
        backgroundColor={"white"}
        borderRadius={20}
        boxShadow={"2px 2px 10px #787878"}
        display={"flex"}
        flexDir={{ lg: "row", base: "column" }}
        alignItems={"center"}
        overflow={"hidden"}
        position={"relative"}
      >
        <BackdropCircle
          containerHeight={height}
          containerWidth={width}
          signupMode={signupMode}
          setSignupMode={setSignupMode}
          loginInput={loginInput}
          setLoginInput={setLoginInput}
          registerInput={registerInput}
          setRegisterInput={setRegisterInput}
        />
        <RegisterForm input={registerInput} setInput={setRegisterInput} />
        <LoginForm input={loginInput} setInput={setLoginInput} />
      </Box>
    </Center>
  );
};

export default AuthenticationPage;
