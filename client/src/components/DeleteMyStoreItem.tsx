import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { ItemType } from "./ItemCard";
import { useRef } from "react";

const DeleteMyStoreItem = ({ deletingItem }: { deletingItem: ItemType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  function handleDeleteMyStoreItem() {
    console.log(deletingItem);
    onClose();
  }

  return (
    <>
      <IconButton
        icon={<MdDelete />}
        aria-label="delete"
        m={3}
        onClick={onOpen}
      >
        Delete
      </IconButton>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete item: {deletingItem?.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteMyStoreItem}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteMyStoreItem;
