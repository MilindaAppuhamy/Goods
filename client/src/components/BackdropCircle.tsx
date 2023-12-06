import { Box } from "@chakra-ui/react";
import SignupDescription from "./SignupDescription";
import LoginDescription from "./LoginDescription";
import { LoginInputType } from "./LoginForm";
import { RegisterInputType } from "./RegisterForm";

const BackdropCircle = ({
  containerWidth,
  containerHeight,
  signupMode,
  setSignupMode,
  loginInput,
  setLoginInput,
  registerInput,
  setRegisterInput,
}: {
  containerWidth: number | undefined;
  containerHeight: number | undefined;
  signupMode: boolean;
  setSignupMode: React.Dispatch<React.SetStateAction<any>>;
  loginInput: LoginInputType;
  setLoginInput: React.Dispatch<React.SetStateAction<any>>;
  registerInput: RegisterInputType;
  setRegisterInput: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <Box
      position="absolute"
      top={{
        lg: "50%",
        base: signupMode
          ? `${containerHeight! * 1.25}`
          : `${-containerHeight! / 4}`,
      }}
      left={{
        lg: signupMode
          ? `${containerWidth! * 1.25}`
          : `${-containerWidth! / 4}`,
        base: "50%",
      }}
      width={{ lg: "150%", base: "3000px" }}
      height={{ lg: "3000px", base: "150%" }}
      borderRadius="50%"
      backgroundColor="#5D3FD3"
      transform={"translate(-50%, -50%)"}
      zIndex={1}
      transition={"1.0s ease-in-out"}
    >
      {signupMode ? (
        <SignupDescription
          setSignupMode={setSignupMode}
          registerInput={registerInput}
          setRegisterInput={setRegisterInput}
        />
      ) : (
        <LoginDescription
          setSignupMode={setSignupMode}
          loginInput={loginInput}
          setLoginInput={setLoginInput}
        />
      )}
    </Box>
  );
};

export default BackdropCircle;
