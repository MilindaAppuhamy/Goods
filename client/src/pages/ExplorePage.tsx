import { Box } from "@chakra-ui/react";
import { useState } from "react";
import SearchFilters from "../components/SearchFilters";

export type FiltersType = {
  category: string;
  minPrice: number;
  maxPrice: number;
};

const ExplorePage = () => {
  const maxPrice = 99999;
  const [searchText, setSearchText] = useState<string>("");
  const [filters, setFilters] = useState<FiltersType>({
    category: "",
    minPrice: 0,
    maxPrice: maxPrice,
  });

  console.log(filters, searchText);

  return (
    <Box width={"100%"} h={"100%"}>
      <SearchFilters
        setSearchText={setSearchText}
        filters={filters}
        setFilters={setFilters}
        maxPrice={maxPrice}
      />
    </Box>
  );
};

export default ExplorePage;
