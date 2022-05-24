import {
    Box, Divider, Heading, Slider, SliderFilledTrack, SliderThumb, SliderTrack,
    Tag, TagLabel, TagRightIcon, Text, Icon
} from "@chakra-ui/react";
import React from 'react';
import { TaskToDo } from "../model/entities";

type ToDoCardProps = { todo: TaskToDo, updateMe: (task: TaskToDo) => void }
export const ToDoCard: React.FC<ToDoCardProps> = ({ todo, updateMe }) => {
    return (
        <Box
            position="relative"
            maxW="full"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={'2xl'}
            overflow="hidden"
            p="4"
            backgroundColor={todo.isDone ? "#7ddebe" : "#67c6da"}
        >
            <Heading size="md" mt="3" onClick={() => updateMe(todo)}>{todo.summary}
            </Heading>
            <Tag size={"lg"} position="absolute"
                top="3"
                right="2" key={"lg"} mt={2} colorScheme='inherit'>
                <TagLabel>{todo.percentage ?? 0} %</TagLabel>
            </Tag>
            <Divider my="4" borderColor={"#0f363e"} />
            <Text noOfLines={[1, 2, 3, 4]} color="gray.800" style={{ whiteSpace: "pre-line" }}>
                {todo.description}
            </Text>
        </Box>
    );
};