import { IconButton } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";

const EditMyStoreItem = () => {
  function handleEditMyStoreItem() {}

  return (
    <>
      <IconButton
        icon={<MdEdit />}
        aria-label="update"
        m={3}
        onClick={handleEditMyStoreItem}
      >
        Update
      </IconButton>
    </>
  );
};

export default EditMyStoreItem;
