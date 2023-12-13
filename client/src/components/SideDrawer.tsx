import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  IconButton,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import UserAccountDetails from "./UserAccountDetails";
import NavLinks from "./NavLinks";

const SideDrawer = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();

  return (
    <>
      <Box position={"fixed"} top={"10px"} right={4} zIndex={30}>
        <IconButton
          aria-label="drawer-button"
          icon={isOpen ? <IoClose /> : <IoMenu />}
          borderRadius={"50%"}
          border={colorMode === "light" ? "" : "1px solid black"}
          colorScheme={"purple"}
          onClick={onOpen}
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          height={"100%"}
          width={"280px"}
          borderTopRightRadius={20}
          borderBottomRightRadius={20}
          backgroundColor={colorMode === "light" ? "white" : "#323232"}
          boxShadow={"2px 2px 10px #787878"}
        >
          <DrawerCloseButton />
          <Heading
            color={colorMode === "light" ? "#5D3FD3" : "#CF9FFF"}
            fontWeight={"bold"}
            fontSize={"32px"}
            fontFamily={"sans-serif"}
            pt={4}
            pb={2}
          >
            Goods .
          </Heading>
          <Box
            height={"1px"}
            width={"90%"}
            backgroundColor={"black"}
            borderRadius={3}
            mt={2}
            mb={3}
          />
          <UserAccountDetails />
          <NavLinks />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
