import { SearchIcon } from "@chakra-ui/icons";
import {
    Box, Button, Flex, HStack, Input, InputGroup, InputLeftElement, Stack, Text,
    useBreakpointValue, useColorModeValue, useRadioGroup
} from "@chakra-ui/react";
import { searchFilterAction, statusFilterAction, toggleModelAction, useAppDispatch } from "../store";
import { CustomRadio } from "./custom-radio";


export const ToDoHeader: React.FC<{}> = () => {

    const dispatch = useAppDispatch();
    const { getRadioProps } = useRadioGroup({
        defaultValue: 'A',
        onChange: (value: any) => dispatch(statusFilterAction(value))
    })

    return (
        <Box>
            <Flex
                bg={useColorModeValue('#4286ec', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        fontSize={"x-large"}
                        fontWeight={"bold"}
                        _hover={{
                            transform: 'translateY(-2px)',
                        }}
                        color={useColorModeValue('#a8f2f6', 'white')}>
                        Its My Todo
                    </Text>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <InputGroup minWidth={'20rem'}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='blue.300' />}
                        />
                        <Input backgroundColor={"white"} type='tel' placeholder='Search Todos'
                            onChange={(event) => dispatch(searchFilterAction(event.target.value))} />
                    </InputGroup>
                    <HStack>
                        <CustomRadio
                            key={"allTodos"}
                            divProps={{ backgroundColor: "#dcdcdc", borderRadius: "20px", height: "23px" }}
                            {...getRadioProps({ value: "A", isChecked: true })}
                        />
                        <CustomRadio
                            key={"doneTodos"}
                            divProps={{ backgroundColor: "#38e3ab", borderRadius: "20px", height: "23px" }}
                            {...getRadioProps({ value: "D" })}
                        />
                        <CustomRadio
                            key={"unDoneTodos"}
                            divProps={{ backgroundColor: "#1cd7fe", borderRadius: "20px", height: "23px" }}
                            {...getRadioProps({ value: "U" })}
                        />
                    </HStack>
                    <Button
                        px={8}
                        bg={useColorModeValue('#00B5D8', 'gray.900')}
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}
                        onClick={() => dispatch(toggleModelAction())}
                    >
                        Add ToDo
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
}