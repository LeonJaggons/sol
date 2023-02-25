import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PostStep from "./PostStep";
import { Box, Heading, HStack, Icon, Select, VStack } from "native-base";
import SolInput, { SolTextArea } from "../../util/SolInput";
import CategorySelect from "../../util/CategorySelect";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "react-native-vector-icons";
const MainDetailsStep = () => {
    const postDetails = useSelector((state) => state.post.postDetails);
    const [canContinue, setCanContinue] = useState(false);
    const updateCanContinue = () => {
        const reqKeys = ["title", "description", "category", "condition"];
        for (let req of reqKeys) {
            if (!Object.keys(postDetails).includes(req)) return false;
        }
        return true;
    };
    useEffect(() => {
        setCanContinue(updateCanContinue());
    }, [postDetails]);
    return (
        <PostStep title={"Main Details"} canContinue={canContinue} step={1}>
            <MainDetailForm />
        </PostStep>
    );
};

const MainDetailForm = () => {
    const postCategory = useSelector((state) => state.post.postCategory);
    const dispatch = useDispatch();
    const [details, setDetails] = useState({});
    const setDetail = (param, val) => setDetails({ ...details, [param]: val });
    const setTitle = (val) => setDetail("title", val);
    const setDescription = (val) => setDetail("description", val);
    const setCategory = (val) => setDetail("category", val);
    const setCondition = (val) => setDetail("condition", val);

    useEffect(() => {
        dispatch({
            type: "SET",
            attr: "postDetails",
            payload: { ...details },
        });
    }, [details]);

    useEffect(() => {
        setCategory(postCategory);
    }, [postCategory]);

    return (
        <VStack space={6}>
            <VStack space={1}>
                <Heading size={"sm"}>Title</Heading>
                <SolInput
                    fontSize={24}
                    fontWeight={700}
                    onChangeText={setTitle}
                />
            </VStack>
            <VStack space={1}>
                <Heading size={"sm"}>Description</Heading>
                <SolTextArea onChangeText={setDescription} />
            </VStack>
            <VStack space={1}>
                <Heading size={"sm"}>Category</Heading>
                <CategorySelect />
            </VStack>
            <VStack space={1}>
                <Heading size={"sm"}>Condition</Heading>
                <ConditionSelect submit={setCondition} />
            </VStack>
        </VStack>
    );
};

const ConditionSelect = ({ submit }) => {
    return (
        <HStack p={1} alignItems={"center"}>
            <Icon
                as={Ionicons}
                name={"chevron-down"}
                mr={2}
                color={"muted.600"}
            />
            <Select
                onValueChange={submit}
                flex={1}
                fontSize={14}
                fontWeight={400}
                p={"0px"}
                placeholder={"Select condition"}
                color={"black"}
                borderWidth={0}
                dropdownIcon={<Box />}
            >
                <Select.Item label={"New"} value={"NEW"} />
                <Select.Item label={"Refurbished/Renewed"} value={"RENEWED"} />
                <Select.Item label={"Open Box"} value={"OPEN_BOX"} />
                <Select.Item label={"Fair"} value={"FAIR"} />
                <Select.Item label={"Broken/For parts"} value={"BROKEN"} />
            </Select>
        </HStack>
    );
};

export default MainDetailsStep;
