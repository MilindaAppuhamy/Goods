import { Box } from "@chakra-ui/react";
import { ItemType } from "./ItemCard";
import InputField from "./InputField";

export type ItemInputType = {
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
};

const MyStoreItemForm = ({
  type,
  updatingItem,
  input,
  setInput,
}: {
  type: "add" | "update";
  updatingItem?: ItemType;
  input: ItemInputType;
  setInput: React.Dispatch<React.SetStateAction<ItemInputType>>;
}) => {
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <InputField
          value="name"
          label="Name"
          input={input}
          setInput={setInput}
          defaultValue={type === "update" ? updatingItem?.name : ""}
        />
        <InputField
          value="category"
          label="Category"
          input={input}
          setInput={setInput}
          defaultValue={type === "update" ? updatingItem?.category : ""}
        />
        <InputField
          value="image"
          label="Image URL"
          input={input}
          setInput={setInput}
          defaultValue={type === "update" ? updatingItem?.image : ""}
        />
        <InputField
          value="price"
          label="Price (in cents)"
          input={input}
          setInput={setInput}
          defaultValue={type === "update" ? updatingItem?.price : undefined}
        />
        <InputField
          value="description"
          label="Description"
          input={input}
          setInput={setInput}
          defaultValue={type === "update" ? updatingItem?.description : ""}
        />
        <InputField
          value="quantity"
          label="Quantity"
          input={input}
          setInput={setInput}
          defaultValue={type === "update" ? updatingItem?.quantity : undefined}
        />
      </Box>
    </>
  );
};

export default MyStoreItemForm;
