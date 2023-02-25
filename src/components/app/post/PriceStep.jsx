import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PostStep from "./PostStep";
import { Center, Checkbox, Input, VStack } from "native-base";
import SolInput from "../../util/SolInput";
import { useDispatch, useSelector } from "react-redux";
import { parseInt, update } from "lodash";

const PriceStep = () => {
    const postDetails = useSelector((state) => state.post.postDetails);
    const [canContinue, setCanContinue] = useState(false);

    const updateCanContinue = () => {
        setCanContinue(
            Object.keys(postDetails).includes("price") &&
                postDetails["price"] > 0
        );
    };
    useEffect(() => {
        updateCanContinue();
    }, [postDetails]);
    return (
        <PostStep title={"Price"} canContinue={canContinue} step={1}>
            <PriceForm />
        </PostStep>
    );
};

const PriceForm = () => {
    const postDetails = useSelector((state) => state.post.postDetails);
    const dispatch = useDispatch();
    const [price, setPrice] = useState();

    const handlePriceChange = (e) => {
        const p = parseInt(e);
        setPrice("$" + e);
        dispatch({
            type: "SET",
            attr: "postDetails",
            payload: {
                ...postDetails,
                price: p,
            },
        });
    };
    return (
        <Center flex={1}>
            <VStack w={"full"} space={4}>
                <SolInput
                    fontWeight={800}
                    placeholder={"$0"}
                    justifyContent={"center"}
                    textAlign={"center"}
                    fontSize={32}
                    keyboardType={"number-pad"}
                    value={price}
                    onChangeText={handlePriceChange}
                />
            </VStack>
        </Center>
    );
};

export default PriceStep;
