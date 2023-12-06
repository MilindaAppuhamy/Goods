import { createStandaloneToast } from "@chakra-ui/react";

export default function showToast(
  title: string,
  desc: string,
  status: "success" | "error"
) {
  const { toast } = createStandaloneToast();
  if (toast.isActive("toasty")) return;
  return toast({
    position: "top",
    id: "toasty",
    title: title,
    description: desc,
    status: status,
    duration: 3000,
    isClosable: true,
  });
}
