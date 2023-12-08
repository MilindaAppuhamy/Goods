import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { stagger, useAnimate } from "framer-motion";
import { MouseEvent, useEffect, useState } from "react";
import {
  CiHeart,
  CiLogout,
  CiSettings,
  CiShop,
  CiShoppingBasket,
  CiShoppingTag,
  CiStreamOn,
} from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const NavLinks = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const scope = useMenuAnimation(isOpen);

  function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();
    useEffect(() => {
      animate(
        ".sub_menu",
        isOpen ? { display: "block" } : { display: "none" },
        {
          delay: isOpen ? 0.1 : 0.4,
        }
      );
      animate(
        ".sub_menu_item",
        isOpen
          ? {
              opacity: 1,
              scale: 1,
              transform: "translateX(0px)",
            }
          : {
              opacity: 0,
              scale: 0.3,
              transform: "translateX(-50px)",
            },
        {
          duration: 0.3,
          delay: isOpen
            ? stagger(0.15, { startDelay: 0.15 })
            : stagger(0.1, { startDelay: 0.05 }),
        }
      );
    }, [isOpen]);
    return scope;
  }

  function handleClick(e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) {
    const newPath = e.currentTarget.innerText.toLowerCase();

    if (newPath === "explore" || "wishlist") setIsOpen(true);
    navigate("/goods/" + newPath);
  }

  return (
    <List
      mt={12}
      width={"100%"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      pl={6}
      ref={scope}
    >
      <ListItem
        fontFamily={"sans-serif"}
        fontWeight={"normal"}
        fontSize={"large"}
        onClick={() => setIsOpen(!isOpen)}
        cursor={"pointer"}
        p={2}
        pl={10}
        width={"90%"}
        borderRadius={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        _hover={{
          backgroundColor: "rgb(203, 195, 227, 0.4)",
        }}
        mb={isOpen ? 0 : 5}
        transition={"all 0.3s"}
        transitionDelay={"0.3s"}
      >
        <ListIcon
          width={"32px"}
          height={"32px"}
          as={CiShoppingTag}
          color={"#5D3FD3"}
          mr={4}
        />
        Shop
        <ListIcon
          width={"16px"}
          height={"16px"}
          as={FaChevronDown}
          color={"#5D3FD3"}
          ml={"50px"}
          transform={isOpen ? "rotate(0deg)" : "rotate(90deg)"}
          transition={"all 0.3s"}
        />
      </ListItem>

      <List className="sub_menu" ml={"30px"}>
        <ListItem
          className="sub_menu_item"
          fontFamily={"sans-serif"}
          fontWeight={"normal"}
          fontSize={"large"}
          mt={3}
          mb={3}
          p={2}
          cursor={"pointer"}
          pl={10}
          width={"90%"}
          borderRadius={6}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          _hover={{
            backgroundColor: "rgb(203, 195, 227, 0.4)",
          }}
          onClick={(e) => handleClick(e)}
          backgroundColor={
            pathname.includes("explore") ? "rgb(203, 195, 227, 0.4)" : "white"
          }
        >
          <ListIcon
            width={"32px"}
            height={"32px"}
            as={CiStreamOn}
            color={"#5D3FD3"}
            mr={4}
          />
          Explore
        </ListItem>

        <ListItem
          className="sub_menu_item"
          fontFamily={"sans-serif"}
          fontWeight={"normal"}
          fontSize={"large"}
          mb={5}
          p={2}
          cursor={"pointer"}
          pl={10}
          width={"90%"}
          borderRadius={6}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          _hover={{
            backgroundColor: "rgb(203, 195, 227, 0.4)",
          }}
          onClick={(e) => handleClick(e)}
          backgroundColor={
            pathname.includes("wishlist") ? "rgb(203, 195, 227, 0.4)" : "white"
          }
        >
          <ListIcon
            width={"32px"}
            height={"32px"}
            as={CiHeart}
            color={"#5D3FD3"}
            mr={4}
          />
          Wishlist
        </ListItem>
      </List>

      <ListItem
        fontFamily={"sans-serif"}
        fontWeight={"normal"}
        fontSize={"large"}
        mb={5}
        cursor={"pointer"}
        p={2}
        pl={10}
        width={"90%"}
        borderRadius={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        _hover={{
          backgroundColor: "rgb(203, 195, 227, 0.4)",
        }}
        onClick={(e) => handleClick(e)}
        backgroundColor={
          pathname.includes("basket") ? "rgb(203, 195, 227, 0.4)" : "white"
        }
      >
        <ListIcon
          width={"32px"}
          height={"32px"}
          as={CiShoppingBasket}
          color={"#5D3FD3"}
          mr={4}
        />
        Basket
      </ListItem>

      <ListItem
        fontFamily={"sans-serif"}
        fontWeight={"normal"}
        fontSize={"large"}
        mb={5}
        cursor={"pointer"}
        p={2}
        pl={10}
        width={"90%"}
        borderRadius={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        _hover={{
          backgroundColor: "rgb(203, 195, 227, 0.4)",
        }}
        onClick={(e) => handleClick(e)}
        backgroundColor={
          pathname.includes("my%20store") ? "rgb(203, 195, 227, 0.4)" : "white"
        }
      >
        <ListIcon
          width={"32px"}
          height={"32px"}
          as={CiShop}
          color={"#5D3FD3"}
          mr={4}
        />
        My store
      </ListItem>

      <ListItem
        fontFamily={"sans-serif"}
        fontWeight={"normal"}
        fontSize={"large"}
        mb={5}
        cursor={"pointer"}
        p={2}
        pl={10}
        width={"90%"}
        borderRadius={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        _hover={{
          backgroundColor: "rgb(203, 195, 227, 0.4)",
        }}
        onClick={(e) => handleClick(e)}
        backgroundColor={
          pathname.includes("settings") ? "rgb(203, 195, 227, 0.4)" : "white"
        }
      >
        <ListIcon
          width={"32px"}
          height={"32px"}
          as={CiSettings}
          color={"#5D3FD3"}
          mr={4}
        />
        Settings
      </ListItem>

      <ListItem
        fontFamily={"sans-serif"}
        fontWeight={"normal"}
        fontSize={"large"}
        mb={5}
        cursor={"pointer"}
        p={2}
        pl={10}
        width={"90%"}
        borderRadius={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        _hover={{
          backgroundColor: "rgb(203, 195, 227, 0.4)",
        }}
        onClick={() => {
          localStorage.removeItem("user-token");
          navigate("/");
        }}
      >
        <ListIcon
          width={"32px"}
          height={"32px"}
          as={CiLogout}
          color={"#5D3FD3"}
          mr={4}
        />
        Logout
      </ListItem>
    </List>
  );
};

export default NavLinks;
