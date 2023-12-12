import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import MyStoreItemForm, { ItemInputType } from "./MyStoreItemForm";
import { useState } from "react";

const AddMyStoreItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState<ItemInputType>({
    name: "",
    category: "",
    image: "",
    price: 0,
    description: "",
    quantity: 0,
  });

  function handleAddMyStoreItem() {
    onClose();
  }

  return (
    <>
      <Button
        mb={5}
        leftIcon={<AddIcon />}
        color={"white"}
        backgroundColor={"#5D3FD3"}
        _hover={{ opacity: 0.7 }}
        onClick={onOpen}
      >
        Add new Item
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MyStoreItemForm type="add" input={input} setInput={setInput} />
          </ModalBody>

          <ModalFooter>
            <Button
              color={"white"}
              backgroundColor={"#5D3FD3"}
              _hover={{ opacity: 0.7 }}
              onClick={handleAddMyStoreItem}
            >
              Add item
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMyStoreItem;
