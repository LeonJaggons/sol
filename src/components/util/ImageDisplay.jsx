import React, { useEffect, useState } from "react";
import {
    HStack,
    Image,
    VStack,
    Box,
    ScrollView,
    Menu,
    Pressable,
} from "native-base";
import { ImageBackground } from "react-native";

export const ImageDisplay = ({ imgs, isViewer }) => {
    const [currImg, setCurrImg] = useState();
    useEffect(() => {
        imgs && imgs.length > 0 && setCurrImg(imgs[0].uri);
    }, [imgs]);
    return imgs.length === 0 ? (
        <></>
    ) : (
        <VStack space={1} w={"full"} h={"350px"}>
            <Image
                w={null}
                flex={1}
                resizeMode={"cover"}
                source={{ uri: currImg }}
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
                alignSelf={"center"}
                borderRadius={5}
            >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <HStack space={2}>
                        {imgs.map((img, i) => (
                            <SubImage
                                setImg={setCurrImg}
                                img={img}
                                i={i}
                                key={"IMG-" + i}
                                readOnly={isViewer}
                            />
                        ))}
                    </HStack>
                </ScrollView>
            </Box>
        </VStack>
    );
};

const CoreImage = ({ img, full }) => {
    return (
        <Image
            alt={img.uri}
            source={{ uri: img.uri }}
            style={{ aspectRatio: 1 }}
            w={full ? "full" : "50px"}
            borderRadius={5}
        />
    );
};
const SubImage = ({ img, i, full, readOnly, setImg }) => {
    const handlePress = () => {
        setImg(img.uri);
    };
    return readOnly ? (
        <Pressable onPress={handlePress} _pressed={{ opacity: 0.5 }}>
            <CoreImage img={img} full={full} />
        </Pressable>
    ) : (
        <Menu
            trigger={(triggerProps) => {
                return (
                    <Pressable key={img.id} {...triggerProps}>
                        <CoreImage img={img} full={full} />
                    </Pressable>
                );
            }}
        >
            <Menu.Item>Set as cover</Menu.Item>
            <Menu.Item _text={{ color: "red.500" }}>Remove image</Menu.Item>
        </Menu>
    );
};
