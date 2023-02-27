import React, { useState } from "react";
import {
    Box,
    Heading,
    Button,
    VStack,
    ScrollView,
    HStack,
    Icon,
} from "native-base";
import BackButton from "./BackButton";
import { find } from "lodash";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { v4 } from "uuid";
const categories = require("./ProductCategories.json");

const CategoriesPanel = () => {
    const [cats, setCats] = useState(categories);
    const [selectedCat, setSelectedCat] = useState([]);
    const dispatch = useDispatch();
    const nav = useNavigation();
    const submit = (cat) => {
        dispatch({
            type: "SET",
            attr: "postCategory",
            payload: cat,
        });
        nav.goBack();
    };
    const handleSelect = (cat) => {
        const hasNextCat =
            Object.keys(cat).includes("subCategories") &&
            cat["subCategories"].length > 0;
        const newSelected = [...selectedCat, cat.name];
        setSelectedCat(newSelected);
        if (hasNextCat) {
            const newCat = cat["subCategories"];
            setCats(newCat);
        } else {
            submit(newSelected);
        }
    };
    return (
        <Box safeArea p={2} bg={"white"}>
            <HStack alignItems={"center"} justifyContent={"space-between"}>
                <BackButton></BackButton>
                <Heading size={"md"}>Select a category</Heading>
                <Box opacity={0}>
                    <BackButton></BackButton>
                </Box>
            </HStack>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack space={1}>
                    {cats.map((cat, i) => (
                        <CategoryLine
                            key={v4()}
                            cat={cat}
                            press={handleSelect}
                        />
                    ))}
                </VStack>
            </ScrollView>
        </Box>
    );
};

const CategoryLine = ({ cat, press }) => {
    const handlePress = () => {
        press(cat);
    };
    return (
        <Button
            onPress={handlePress}
            justifyContent={"flex-start"}
            variant={"ghost"}
            colorScheme={"muted"}
            _text={{ fontWeight: 500, color: "muted.900", fontSize: 15 }}
            leftIcon={
                cat.icon && (
                    <Icon
                        as={MaterialCommunityIcons}
                        name={cat.icon}
                        mr={1}
                        size={"md"}
                        color={"black"}
                    />
                )
            }
        >
            {cat.name}
        </Button>
    );
};

export default CategoriesPanel;
