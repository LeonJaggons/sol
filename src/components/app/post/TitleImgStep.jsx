import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import PostStep from "./PostStep";
import {
    Text,
    Button,
    HStack,
    Icon,
    Image,
    Pressable,
    Progress,
    VStack,
    Menu,
    Box,
    ScrollView,
} from "native-base";
import { Ionicons } from "react-native-vector-icons";
import { v4 } from "uuid";

import * as ImagePicker from "expo-image-picker";

const TitleImgStep = () => {
    const [imgCount, setImgCount] = useState(0);
    const [canContinue, setCanContinue] = useState(false);
    useEffect(() => {
        setCanContinue(imgCount >= 1);
    }, [imgCount]);
    return (
        <PostStep title={"Post Images"} canContinue={canContinue} step={1}>
            <ImageAdder updateCount={setImgCount} />
        </PostStep>
    );
};

const ImageAdder = ({ updateCount }) => {
    const [imgs, setImgs] = useState([]);
    const [hasImgs, setHasImgs] = useState(false);

    const addImage = (uri) => {
        setImgs([...imgs, { uri: uri, id: v4() }]);
    };

    useEffect(() => {
        updateCount(imgs.length);
    }, [imgs]);
    return (
        <VStack space={4}>
            <ImageDisplay imgs={imgs} add={addImage} />
            <VStack space={2}>
                <LibImageButton add={addImage} />
                <CamImageButton add={addImage} />
            </VStack>
            <ImageProgress imgCount={imgs.length} />
        </VStack>
    );
};

const ImageProgress = ({ imgCount }) => {
    return (
        <VStack alignItems={"center"} w={"full"} space={1}>
            <Progress
                _filledTrack={{
                    bg: imgCount < 6 ? "black" : "red.500",
                }}
                value={imgCount}
                max={6}
                w={"full"}
            />
            <Text
                fontWeight={"bold"}
                color={imgCount < 6 ? "muted.400" : "red.500"}
                fontSize={12}
            >
                {imgCount}/6
            </Text>
        </VStack>
    );
};

const ImageDisplay = ({ imgs, add }) => {
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
            {imgs.length <= 1 ? (
                <></>
            ) : (
                <Box
                    position={"absolute"}
                    bottom={4}
                    bg={"rgba(0,0,0,.7)"}
                    p={2}
                    mx={4}
                    space={2}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <HStack space={2}>
                            {imgs.map((img, i) => (
                                <SubImage img={img} i={i} key={img.id} />
                            ))}
                        </HStack>
                    </ScrollView>
                </Box>
            )}
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

const LibImageButton = ({ add }) => {
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.75,
        });
        if (!result.canceled) {
            const uriResult = result.assets[0].uri;
            add(uriResult);
        }
    };
    return (
        <Button
            onPress={selectImage}
            borderRadius={0}
            bg={"transparent"}
            borderColor={"black"}
            borderWidth={1}
            _text={{ fontWeight: "medium", color: "black" }}
            _pressed={{ bg: "muted.200" }}
            leftIcon={<Icon as={Ionicons} name={"image"} color={"black"} />}
        >
            Select photo from library
        </Button>
    );
};

const CamImageButton = ({ add }) => {
    return (
        <Button
            borderRadius={0}
            bg={"transparent"}
            borderColor={"black"}
            borderWidth={1}
            _text={{ fontWeight: "medium", color: "black" }}
            leftIcon={<Icon as={Ionicons} name={"camera"} color={"black"} />}
        >
            Take a new photo
        </Button>
    );
};

export default TitleImgStep;
