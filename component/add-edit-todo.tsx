import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, Alert, AlertIcon, FormControl, FormLabel, Input, Textarea,
    Switch, ModalFooter, ButtonGroup, Button, Text, Slider, SliderFilledTrack, SliderThumb, SliderTrack, useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TaskToDo } from "../model/entities";
import {
    updateTodos, postTodos, deleteTodos,
    addEditTaskAction, toggleModelAction,
    selectToggleModel, selectUpdatingTodo,
    useAppDispatch, useAppSelector
} from "../store"

const useStore = () => {
    const dispatch = useAppDispatch();
    return {
        values: {
            show: useAppSelector(selectToggleModel),
            task: useAppSelector(selectUpdatingTodo)
        },
        action: {
            toggleModel: () => { dispatch(toggleModelAction()); dispatch(addEditTaskAction()); }
        }
    }
}

export const AddEditToDo: React.FC = () => {
    const { values: { show, task }, action: { toggleModel } } = useStore();
    if (!show) return null;
    const dispatch = useAppDispatch();
    const toast = useToast()
    const [summary, setSummary] = useState(task?.summary ?? "");
    const [description, setDescription] = useState(task?.description ?? "");
    const [isDone, setIsDone] = useState(task?.isDone ?? false);
    const [percentage, setpercentage] = useState(task?.percentage ?? 10);
    const [errorMessage, setErrorMessage] = useState("");

    const onModelSubmit = async (event: any) => {
        event.preventDefault();
        setErrorMessage("");
        if (summary.length < 5) {
            setErrorMessage("summary must have atleas 5 characters");
            return;
        }
        if (description.length < 10) {
            setErrorMessage("Description must have atleas 10 characters");
            return;
        }
        const toDo = { ...(task ?? {}), summary, description, isDone, percentage } as TaskToDo
        if (task?.id) {
            dispatch(updateTodos(toDo))
            toast({
                title: `Todo Notes saved successfully!`,
                status: 'success',
                duration: 2000,
            })
        }
        else {
            dispatch(postTodos(toDo));
        }

        onModalClose();
    };

    const onModelDelete = async (event: any) => {
        event.preventDefault();
        if (task?.id) {
            dispatch(deleteTodos(task.id));
            toast({
                title: `Todo Notes has been removed!`,
                status: 'success',
                duration: 2000,
            })
        }

        onModalClose();
    };

    const onModalClose = () => {
        setErrorMessage("");
        setSummary("");
        setDescription("");
        setIsDone(false);
        // onClose();
        toggleModel()
    };

    return (
        <Modal
            isOpen={show}
            onClose={onModalClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={onModelSubmit}>
                    <ModalHeader>{task ? "Update Todo" : "Add Todo"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {errorMessage && (
                            <Alert status="error" borderRadius="lg" mb="6">
                                <AlertIcon />
                                <Text >{errorMessage}</Text>
                            </Alert>
                        )}
                        <FormControl isRequired={true}>
                            <FormLabel>Summary</FormLabel>
                            <Input
                                placeholder="Add your title here"
                                onChange={(event) => setSummary(event.target.value)}
                                value={summary}
                            />
                        </FormControl>

                        <FormControl mt={4} isRequired={true}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Add your description here"
                                onChange={(event) => setDescription(event.target.value)}
                                value={description}
                            />
                        </FormControl>
                        {!!task &&
                            <>
                                <FormControl mt={4}>
                                    <FormLabel>% Completed</FormLabel>
                                    <Slider aria-label='slider-ex-1' value={percentage}
                                        onChange={(val) => setpercentage(val)}
                                        isDisabled={isDone}>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                </FormControl>
                                <FormControl display='flex' alignItems='center' mt={2}>
                                    <FormLabel htmlFor='is-completed' mb='0'>
                                        Is Done?
                                    </FormLabel>
                                    <Switch isChecked={isDone}
                                        id="is-completed"
                                        onChange={(event) => {
                                            setIsDone(event.target.checked);
                                            if (event.target.checked) {
                                                setpercentage(100);
                                            }
                                        }} />
                                </FormControl>
                            </>
                        }

                    </ModalBody>

                    <ModalFooter>
                        <ButtonGroup spacing="3">
                            <Button
                                onClick={onModalClose}
                                colorScheme="gray"
                                type="reset"
                            >
                                Cancel
                            </Button>
                            {!!task && <Button
                                onClick={onModelDelete}
                                colorScheme="orange"
                                type="reset"
                            >
                                Delete
                            </Button>}
                            <Button colorScheme="linkedin" type="submit">
                                Save
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};