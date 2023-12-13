import { SearchIcon } from "@chakra-ui/icons";
import {
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import Filters from "./Filters";
import { FiltersType } from "../pages/ExplorePage";
import { useRef } from "react";

const SearchFilters = ({
  filters,
  setFilters,
  setSearchText,
  maxPrice,
}: {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: number;
}) => {
  const { colorMode } = useColorMode();
  const searchRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchText(searchRef.current?.value || "");
  }
  return (
    <HStack
      position={"fixed"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      pt={{ lg: 4, base: 1.5 }}
      pb={4}
      pr={{ lg: "280px", base: "60px" }}
      zIndex={5}
    >
      <form onSubmit={handleSubmit} style={{ width: "70%", maxWidth: "400px" }}>
        <InputGroup width={"100%"}>
          <InputLeftElement>
            <SearchIcon
              width={"22px"}
              height={"22px"}
              color={colorMode === "light" ? "#5D3FD3" : "#CF9FFF"}
            />
          </InputLeftElement>
          <Input
            ref={searchRef}
            variant={"filled"}
            backgroundColor={colorMode === "light" ? "white" : "#323232"}
            boxShadow={"2px 2px 6px #787878"}
            borderRadius={10}
            _hover={
              colorMode === "light"
                ? {
                    backgroundColor: "white",
                  }
                : {
                    backgroundColor: "#323232",
                  }
            }
            _focus={
              colorMode === "light"
                ? {
                    backgroundColor: "white",
                    border: "none",
                    boxShadow: "2px 2px 6px #787878",
                  }
                : {
                    backgroundColor: "#323232",
                    border: "none",
                    boxShadow: "2px 2px 6px #787878",
                  }
            }
          />
        </InputGroup>
      </form>
      <Filters filters={filters} setFilters={setFilters} maxPrice={maxPrice} />
    </HStack>
  );
};

export default SearchFilters;
