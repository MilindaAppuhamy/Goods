import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { FiltersType } from "../pages/ExplorePage";

const Filters = ({
  filters,
  setFilters,
}: {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}) => {
  const maxPrice = 99999;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputs, setInputs] = useState({
    category: "",
    minPrice: 0,
    maxPrice: maxPrice,
  });

  function handleChange(
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) {
    setInputs((prev) => {
      let value: number | string | undefined = e.target.value;
      if (e.target.name !== "category") {
        value = Number(value);
        if (isNaN(value)) value = undefined;
        if (
          e.target.name === "minPrice" &&
          (value === undefined || value! <= 0)
        )
          value = 0;
        if (
          e.target.name === "maxPrice" &&
          (value === undefined || value >= maxPrice)
        )
          value = maxPrice;
      }
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  }

  function handleSubmit() {
    setFilters({
      ...filters,
      category: inputs.category,
      minPrice: inputs.minPrice,
      maxPrice: inputs.maxPrice,
    });
    onClose();
  }

  function clearInputs() {
    setInputs({ category: "", minPrice: 0, maxPrice: maxPrice });
    setFilters({ category: "", minPrice: 0, maxPrice: maxPrice });
    onClose();
  }

  return (
    <>
      <Button
        color={"white"}
        backgroundColor={"#5D3FD3"}
        _hover={{ opacity: 0.7 }}
        onClick={onOpen}
      >
        Filter
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              variant={"flushed"}
              placeholder="Category"
              name="category"
              defaultValue={inputs.category}
              onChange={handleChange}
            >
              <option value="technology">Technology</option>
              <option value="clothing">Clothing</option>
              <option value="food">Food</option>
            </Select>

            <Stack mt={5}>
              <Text>Min price</Text>
              <NumberInput min={0} defaultValue={inputs.minPrice}>
                <NumberInputField name="minPrice" onChange={handleChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Stack>

            <Stack mt={5}>
              <Text>Max price</Text>
              <NumberInput
                min={1}
                max={maxPrice}
                defaultValue={inputs.maxPrice}
              >
                <NumberInputField name="maxPrice" onChange={handleChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Stack>
          </ModalBody>

          <ModalFooter display={"flex"} justifyContent={"center"} mt={3}>
            <Button colorScheme="purple" mr={3} onClick={handleSubmit}>
              Apply
            </Button>
            <Button variant="ghost" onClick={() => clearInputs()}>
              clear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Filters;
