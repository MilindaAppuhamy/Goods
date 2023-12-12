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
import { useEffect, useState } from "react";
import useAddItem from "../hooks/useAddItem";
import getUserHeaders from "../utils/getUserHeaders";
import showToast from "../utils/showToast";

const AddMyStoreItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headers = getUserHeaders();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  const {
    mutateAsync: addMyStoreItem,
    isSuccess,
    isError,
    error,
  } = useAddItem(headers!);

  const [input, setInput] = useState<ItemInputType>({
    name: "",
    category: "",
    image: "",
    price: 0,
    description: "",
    quantity: 0,
  });

  async function handleAddMyStoreItem() {
    await addMyStoreItem({ ...input, userId: userId });
    onClose();
  }

  useEffect(() => {
    if (isError) showToast("Error", error.response?.data as string, "error");
    if (isSuccess)
      showToast("Success", "Successfully added item to your store.", "success");
  }, [isError, isSuccess]);

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
