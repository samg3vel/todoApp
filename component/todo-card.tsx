import {
    Box, Flex, Spacer, Stat, StatLabel, Text
} from "@chakra-ui/react";
import React, { forwardRef, Ref } from 'react';
import { TaskToDo } from "../model/entities";
import { updateTodoModel, useAppDispatch } from "../store";

export const ToDoCard = forwardRef<Ref<HTMLDivElement>, { todo: TaskToDo }>(({ todo }, ref) => {
    const dispatch = useAppDispatch();
    return (
        <Box
            ref={ref}
            position="relative"
            maxW="full"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={'2xl'}
            overflow="hidden"
            p="4"
            backgroundColor={todo.isDone ? "#42d2a3" : "#4dbcd8"}
            color={"saddlebrown"}
            transition={"transform 1s"}
            _hover={{
                transform: 'scale(1)'
            }}
        >
            <Flex
                cursor={"pointer"}
                alignItems='center' gap='2'
                borderBottom={"1px solid #0f363e"}
                pb={"0.5rem"}
                onClick={() => dispatch(updateTodoModel(todo))}>
                <Box p='0.1rem 0rem 0.1rem 0.5rem' fontSize={"lg"} fontWeight={"bold"}>
                    {todo.summary}
                </Box>
                <Spacer />
                <Box p='0.1rem 0.5rem 0.1rem 0rem'>
                    <Stat>
                        <StatLabel fontSize={"lg"} fontWeight={"bold"}>{todo.percentage ?? 0} %</StatLabel>
                    </Stat>
                </Box>
            </Flex>
            <Text mt={"0.5rem"} noOfLines={[1, 2, 3, 4]} color="gray.800" style={{ whiteSpace: "pre-line", color: "#f0f0f0" }}>
                {todo.description}
            </Text>
        </Box>
    );
});