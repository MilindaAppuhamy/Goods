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
import { useState } from "react";

const EditMyStoreItem = ({ updatingItem }: { updatingItem: ItemType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState<ItemInputType>({
    name: updatingItem?.name,
    category: updatingItem?.category,
    image: updatingItem?.image,
    price: updatingItem?.price,
    description: updatingItem?.description,
    quantity: updatingItem?.quantity,
  });

  function handleEditMyStoreItem() {
    onClose();
  }

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
