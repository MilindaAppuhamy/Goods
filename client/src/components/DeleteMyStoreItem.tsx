import { IconButton } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

const DeleteMyStoreItem = () => {
  function handleDeleteMyStoreItem() {}

  return (
    <>
      <IconButton
        icon={<MdDelete />}
        aria-label="delete"
        m={3}
        onClick={handleDeleteMyStoreItem}
      >
        Delete
      </IconButton>
    </>
  );
};

export default DeleteMyStoreItem;
