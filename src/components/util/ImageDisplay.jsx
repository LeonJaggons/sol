import React from "react";
import {
    HStack,
    Image,
    VStack,
    Box,
    ScrollView,
    Menu,
    Pressable,
} from "native-base";

export const ImageDisplay = ({ imgs }) => {
    return imgs.length === 0 ? (
        <></>
    ) : (
        <VStack space={1}>
            <Image
                w={"100%"}
                style={{ aspectRatio: 1 }}
                source={{ uri: imgs[0].uri }}
                alt={"Main image"}
                mb={1}
                key={"MAIN_IMG"}
            />
            <Box
                position={"absolute"}
                bottom={4}
                bg={"rgba(0,0,0,.7)"}
                p={2}
                mx={4}
                space={2}
            >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <HStack space={2}>
                        {imgs.map((img, i) => (
                            <SubImage img={img} i={i} key={img.id} />
                        ))}
                    </HStack>
                </ScrollView>
            </Box>
        </VStack>
    );
};

const SubImage = ({ img, i, full }) => {
    return (
        <Menu
            trigger={(triggerProps) => {
                return (
                    <Pressable key={img.id} {...triggerProps}>
                        <Image
                            alt={"Image " + i}
                            source={{ uri: img.uri }}
                            style={{ aspectRatio: 1 }}
                            w={full ? "full" : "60px"}
                        />
                    </Pressable>
                );
            }}
        >
            <Menu.Item>Set as cover</Menu.Item>
            <Menu.Item _text={{ color: "red.500" }}>Remove image</Menu.Item>
        </Menu>
    );
};
