import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const AddMyStoreItem = () => {
  function handleAddMyStoreItem() {}

  return (
    <>
      <Button
        mb={5}
        leftIcon={<AddIcon />}
        color={"white"}
        backgroundColor={"#5D3FD3"}
        _hover={{ opacity: 0.7 }}
        onClick={handleAddMyStoreItem}
      >
        Add new Item
      </Button>
    </>
  );
};

export default AddMyStoreItem;
