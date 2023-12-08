import { SearchIcon } from "@chakra-ui/icons";
import { HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Filters from "./Filters";
import { FiltersType } from "../pages/ExplorePage";
import { useRef } from "react";

const SearchFilters = ({
  filters,
  setFilters,
  setSearchText,
}: {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const searchRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchText(searchRef.current?.value || "");
  }
  return (
    <HStack
      width={"100%"}
      display={"flex"}
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      pt={4}
    >
      <form onSubmit={handleSubmit} style={{ width: "80%", maxWidth: "400px" }}>
        <InputGroup width={"100%"}>
          <InputLeftElement>
            <SearchIcon width={"22px"} height={"22px"} color={"#5D3FD3"} />
          </InputLeftElement>
          <Input
            ref={searchRef}
            variant={"filled"}
            backgroundColor={"white"}
            borderRadius={10}
            _focus={{
              backgroundColor: "white",
              border: "none",
            }}
          />
        </InputGroup>
      </form>
      <Filters filters={filters} setFilters={setFilters} />
    </HStack>
  );
};

export default SearchFilters;
