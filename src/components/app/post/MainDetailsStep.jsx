import React, { useEffect, useState } from "react";
import PostStep from "./PostStep";
import {
    Text,
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    ScrollView,
    Select,
    Spinner,
    VStack,
    Center,
    Tag,
} from "native-base";
import SolInput, { SolTextArea } from "../../util/SolInput";
import CategorySelect from "../../util/CategorySelect";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "react-native-vector-icons";
import { find } from "lodash";
const cities = require("../../util/ZipCities.json");
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <MainDetailForm />
            </ScrollView>
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
    const setLocation = (val) => setDetail("location", val);
    const postDetails = useSelector((state) => state.post.postDetails);

    useEffect(() => {
        dispatch({
            type: "SET",
            attr: "postDetails",
            payload: { ...postDetails, ...details },
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
                    fontSize={32}
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
            <VStack space={1}>
                <Heading size={"sm"}>Zipcode</Heading>
                <ZipCodeInput submit={setLocation} />
            </VStack>
        </VStack>
    );
};

const ConditionSelect = ({ submit }) => {
    return (
        <HStack alignItems={"center"} bg={"muted.200"} p={2}>
            <Icon
                as={Ionicons}
                name={"chevron-down"}
                mr={2}
                color={"muted.600"}
                size={"18px"}
            />
            <Select
                onValueChange={submit}
                flex={1}
                fontSize={16}
                fontWeight={"medium"}
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

const ZipCodeInput = ({ submit }) => {
    const [currZip, setCurrZip] = useState();
    const [city, setCity] = useState();
    const [loading, setLoading] = useState(false);

    const updateCity = () => {
        setLoading(true);
        const foundCity = find(
            cities,
            (o) => o.zip_code.toString() === currZip
        );

        setCity(foundCity);
        if (foundCity) submit(foundCity);

        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        updateCity();
    }, [currZip]);
    return (
        <HStack space={1} alignItems={"center"}>
            <SolInput
                flex={1}
                keyboardType={"number-pad"}
                onChangeText={setCurrZip}
            />
            <Tag
                pt={1}
                flex={1}
                h={"full"}
                colorScheme={"muted"}
                justifyContent={"flex-start"}
                bg={"muted.200"}
            >
                {loading ? (
                    <Center flex={1}>
                        <Spinner colorScheme={"muted"} color={"muted.400"} />
                    </Center>
                ) : city ? (
                    <Text fontWeight={500} fontSize={16}>
                        {city.city}, {city.state}
                    </Text>
                ) : (
                    <Text fontWeight={500} fontSize={16} color={"muted.400"}>
                        No city found
                    </Text>
                )}
            </Tag>
        </HStack>
    );
};

const LocationButton = () => {
    const [loading, setLoading] = useState(false);

    const getLocation = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    return (
        <Button
            onPress={getLocation}
            borderRadius={0}
            bg={"muted.200"}
            color={"black"}
            borderColor={"black"}
            colorScheme={"muted"}
            borderWidth={0}
            _text={{ fontWeight: "medium", color: "black" }}
            _pressed={{ bg: "muted.200" }}
            leftIcon={<Icon as={Ionicons} name={"locate"} color={"black"} />}
            isLoadingText={"Loading"}
            isLoading={loading}
        >
            Add location
        </Button>
    );
};

export default MainDetailsStep;
