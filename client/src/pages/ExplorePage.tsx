import { Box } from "@chakra-ui/react";
import { useState } from "react";
import ItemCard, { ItemType } from "../components/ItemCard";
import SearchFilters from "../components/SearchFilters";
import useGetItems from "../hooks/useGetItems";

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

  //items data
  const { data: items } = useGetItems();

  return (
    <Box width={"100%"} h={"100%"}>
      <SearchFilters
        setSearchText={setSearchText}
        filters={filters}
        setFilters={setFilters}
        maxPrice={maxPrice}
      />
      <Box
        width={"100%"}
        display={"flex"}
        flexWrap={"wrap"}
        pt={20}
        justifyContent={"space-evenly"}
      >
        {items?.data
          .filter((item: ItemType) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .filter((item: ItemType) => item.price >= filters.minPrice)
          .filter((item: ItemType) => item.price <= filters.maxPrice)
          .filter(
            (item: ItemType) =>
              filters.category === "" || filters.category === item.category
          )
          .map((item: ItemType) => (
            <ItemCard key={item.id} item={item} />
          ))}
      </Box>
    </Box>
  );
};

export default ExplorePage;
