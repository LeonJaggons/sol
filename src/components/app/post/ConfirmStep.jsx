import React, { useState } from "react";
import PostStep from "./PostStep";
import { Text, Box, Center, Heading, Spinner, VStack } from "native-base";

const ConfirmStep = () => {
    const canContinue = false;
    return (
        <PostStep
            title={"Confirmation"}
            canContinue={canContinue}
            step={1}
            final
            noBack
            done
        >
            <ConfirmScreen />
        </PostStep>
    );
};

const ConfirmScreen = () => {
    const [posted, setPosted] = useState(false);

    const LoadingScreen = () => {
        return (
            <Center flex={1}>
                <Spinner size={"lg"} color={"green.900"} />
            </Center>
        );
    };

    const Confirm = () => {
        return (
            <VStack maxW={"90%"}>
                <VStack borderRadius={10} overflow={"hidden"}>
                    <Box bg={"green.200"} p={6}>
                        <Heading mb={2} textAlign={"center"}>
                            Success!
                        </Heading>
                        <Text textAlign={"center"}>
                            Your item has been successfully published! Your on
                            your way to another sale
                        </Text>
                    </Box>
                    <Box bg={"green.100"}>
                        <Center p={2}>
                            <Text>Do somehting else</Text>
                        </Center>
                    </Box>
                </VStack>
            </VStack>
        );
    };
    return (
        <Center flex={1}>
            <Confirm />
        </Center>
    );
};

export default ConfirmStep;
