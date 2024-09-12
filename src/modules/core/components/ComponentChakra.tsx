import { ChakraBaseProvider, extendBaseTheme, theme as chakraTheme, } from "@chakra-ui/react";
import { Children } from "../@types/core";

const { Button, Input, FormLabel} = chakraTheme.components;

const theme = extendBaseTheme({
    components: {
      Button, Input, FormLabel
    },
    styles: {
        global:{
            "body": {
            margin: 0,
            padding: 0,
            color: 'rgba(0, 0, 0, 0.87)',
            fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: '1.5rem',
            letterSpacing: '0.00938em',
            backgroundColor: '#fff'
        },
        }
    }
  });

type WhitProvider = {
    whitProvider?: boolean;
}

const ComponentChakra: React.FC<Children & WhitProvider> = ({children, whitProvider= true}) => {

    return (
        <>
            {
            whitProvider ? 
            <ChakraBaseProvider theme={theme}>
                {children}
            </ChakraBaseProvider>
            :
            <>
                {children}
            </>
            }
        </>
    );
};


export default ComponentChakra;