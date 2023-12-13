import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { ItemType } from "./ItemCard";
import { useEffect, useRef } from "react";
import getUserHeaders from "../utils/getUserHeaders";
import useDeleteItem from "../hooks/useDeleteItem";
import showToast from "../utils/showToast";

const DeleteMyStoreItem = ({ deletingItem }: { deletingItem: ItemType }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();
  const headers = getUserHeaders();

  const {
    mutateAsync: deleteMyStoreItem,
    isSuccess,
    isError,
    error,
  } = useDeleteItem(deletingItem.id, headers!);

  async function handleDeleteMyStoreItem() {
    await deleteMyStoreItem();
    onClose();
  }

  useEffect(() => {
    if (isError) showToast("Error", error.response?.data as string, "error");
    if (isSuccess)
      showToast("Success", "Successfully deleted item .", "success");
  }, [isError, isSuccess]);

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
                color={"white"}
                backgroundColor={colorMode === "light" ? "#EE4B2B" : "#FF5733"}
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
