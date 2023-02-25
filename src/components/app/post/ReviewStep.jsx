import React from "react";
import PostStep from "./PostStep";
import { Heading, VStack, Text, Tag, Box } from "native-base";
import { useSelector } from "react-redux";
import { ImageDisplay } from "../../util/ImageDisplay";
import moment from "moment";

const ReviewStep = () => {
    return (
        <PostStep title={"Review"} canContinue={true} step={1} final>
            <ReviewForm />
        </PostStep>
    );
};

const ReviewForm = () => {
    const postDetails = useSelector((state) => state.post.postDetails);

    return (
        <VStack>
            <ImageDisplay imgs={postDetails.imgs} />
            <VStack p={2} space={1}>
                <Tag
                    colorScheme={"muted"}
                    variant={"outline"}
                    bg={"black"}
                    _text={{ color: "white", fontSize: 14 }}
                >
                    {postDetails.category[postDetails.category.length - 1]}
                </Tag>
                <Heading>${postDetails.price}</Heading>
                <Heading size={"lg"}>{postDetails.title}</Heading>
                <Text fontWeight={500}>
                    Published on {moment().format("MMMM D, yyyy")}
                </Text>
                <Text fontWeight={500}>
                    {postDetails.location.city}, {postDetails.location.state}
                </Text>
                <Text>{postDetails.description}</Text>
            </VStack>
        </VStack>
    );
};

export default ReviewStep;
