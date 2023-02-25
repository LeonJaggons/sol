import React from "react";
import { Text, Button, HStack, Icon, IconButton, Box } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "react-native-vector-icons";
const CategorySelect = (props) => {
    const nav = useNavigation();
    const postCategory = useSelector((state) => state.post.postCategory);
    const dispatch = useDispatch();

    // const exploreSelected = useSelector((state) => state.explore.category);
    const handlePress = () => {
        nav.navigate("CATEGORIES");
    };

    const clearCategory = () => {
        dispatch({
            type: "SET",
            attr: "postCategory",
            payload: null,
        });
    };
    return (
        <HStack bg={"muted.200"} p={2}>
            <Button
                flex={1}
                onPress={handlePress}
                borderRadius={0}
                colorScheme={"muted"}
                bg={"transparent"}
                borderColor={"muted.400"}
                borderWidth={0}
                p={0}
                size={"lg"}
                _text={{
                    fontWeight: "semibold",
                    fontSize: 16,
                }}
                variant={"unstyled"}
                display={"flex"}
                flexDirection={"row"}
                flexWrap={"nowrap"}
                justifyContent={"flex-start"}
            >
                <HStack space={2} alignItems={"center"}>
                    <Icon
                        as={Ionicons}
                        name={"chevron-down"}
                        size={"18px"}
                        alignItems={"flex-end"}
                        color={"muted.600"}
                    />
                    <Text
                        color={postCategory ? "black" : "muted.400"}
                        fontSize={16}
                        fontWeight={"medium"}
                    >
                        {
                            postCategory == null
                                ? "Select category..."
                                : postCategory[postCategory.length - 1]
                            //postCategory.join(" > ")
                        }
                    </Text>
                    <Box flex={1} />
                </HStack>
            </Button>
            {postCategory && (
                <IconButton
                    size={"sm"}
                    onPress={clearCategory}
                    icon={
                        <Icon
                            as={Ionicons}
                            name={"close"}
                            size={"18px"}
                            color={"muted.600"}
                        />
                    }
                    variant={"unstyled"}
                    p={1}
                />
            )}
        </HStack>
    );
};

export default CategorySelect;
