import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const SettingsPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box
        width={"98%"}
        minHeight={{ lg: "98%", base: "100%" }}
        backgroundColor={colorMode === "light" ? "white" : "#323232"}
        borderRadius={"lg"}
        m={{ lg: 3, base: 0 }}
        p={4}
      >
        <Heading
          fontSize={"larger"}
          color={colorMode === "light" ? "#5D3FD3" : "#CF9FFF"}
          mb={30}
          textAlign={"left"}
        >
          Settings
        </Heading>

        <Box width={"100%"} fontWeight={"medium"}>
          <Text>Display</Text>
          <>
            <HStack
              width={"100%"}
              p={2}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Text mr={10} fontWeight={"medium"}>
                Switch dark mode
              </Text>
              <Button onClick={toggleColorMode}>
                Toggle {colorMode === "light" ? "Dark" : "Light"}
              </Button>
            </HStack>
            <Divider />
          </>
        </Box>
      </Box>
    </>
  );
};

export default SettingsPage;
