import "./index.css";
import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import theme from "./theme";

//create the client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ChakraProvider>
  // </React.StrictMode>
);
