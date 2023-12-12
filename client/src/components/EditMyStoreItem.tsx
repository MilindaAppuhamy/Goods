import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import MyStoreItemForm, { ItemInputType } from "./MyStoreItemForm";
import { ItemType } from "./ItemCard";
import { useEffect, useState } from "react";
import getUserHeaders from "../utils/getUserHeaders";
import useUpdateItem from "../hooks/useUpdateItem";
import showToast from "../utils/showToast";

const EditMyStoreItem = ({ updatingItem }: { updatingItem: ItemType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headers = getUserHeaders();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  const [input, setInput] = useState<ItemInputType>({
    name: updatingItem?.name,
    category: updatingItem?.category,
    image: updatingItem?.image,
    price: updatingItem?.price,
    description: updatingItem?.description,
    quantity: updatingItem?.quantity,
  });

  const {
    mutateAsync: updateMyStoreItem,
    isSuccess,
    isError,
    error,
  } = useUpdateItem(updatingItem.id, headers!);

  async function handleEditMyStoreItem() {
    await updateMyStoreItem({ data: { ...input, userId: userId } });
    onClose();
  }

  useEffect(() => {
    if (isError) showToast("Error", error.response?.data as string, "error");
    if (isSuccess)
      showToast("Success", "Successfully updated item.", "success");
  }, [isError, isSuccess]);

  return (
    <>
      <IconButton icon={<MdEdit />} aria-label="update" m={3} onClick={onOpen}>
        Update
      </IconButton>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MyStoreItemForm
              type="update"
              updatingItem={updatingItem}
              input={input}
              setInput={setInput}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              color={"white"}
              backgroundColor={"#5D3FD3"}
              _hover={{ opacity: 0.7 }}
              onClick={handleEditMyStoreItem}
            >
              Update item
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditMyStoreItem;
