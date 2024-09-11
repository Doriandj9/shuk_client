import { ChakraBaseProvider, extendBaseTheme, theme as chakraTheme, } from "@chakra-ui/react";
import { Children } from "../@types/core";

const { Button, Input, FormLabel} = chakraTheme.components;

const theme = extendBaseTheme({
    components: {
      Button, Input, FormLabel
    },
  });

const ComponentChakra: React.FC<Children> = ({children}) => {

    return (
        <>
            <ChakraBaseProvider theme={theme}>
                {children}
            </ChakraBaseProvider>
        </>
    );
};


export default ComponentChakra;