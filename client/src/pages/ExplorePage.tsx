import { Box, chakra, shouldForwardProp } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { useState } from "react";
import ItemCard, { ItemType } from "../components/ItemCard";
import SearchFilters from "../components/SearchFilters";
import useGetItems from "../hooks/useGetItems";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

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
          .map((item: ItemType, i: number) => (
            <ChakraBox
              key={`${item.id}-${searchText}-${filters.category}-${filters.maxPrice}-${filters.minPrice}`}
              m={"8px"}
              initial={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.25, delay: i * 0.2 } as any}
            >
              <ItemCard item={item} />
            </ChakraBox>
          ))}
      </Box>
    </Box>
  );
};

export default ExplorePage;
