import { Box, Button, chakra, Flex, HStack, Stack, Text, useBreakpointValue, useColorModeValue, useRadio, useRadioGroup, useToast } from "@chakra-ui/react";

function CustomRadio(props: any) {
    const { divProps, ...radioProps } = props
    const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
        useRadio(radioProps)

    return (
        <chakra.label {...htmlProps} cursor='pointer'>
            <input {...getInputProps({})} hidden />
            <Box
                {...getCheckboxProps()}
                bg={state.isChecked ? 'whiteAlpha.900' : 'transparent'}
                w={8}
                p={1}
                rounded='full'
            >
                <div style={{ ...divProps }} rounded='full' {...getLabelProps()} />
            </Box>
        </chakra.label>
    )
}

const ToDoHeader = (props: any) => {
    const { onOpen, isOpen, filter } = props;
    const handleChange = (value: any) => {
        filter && filter(value);
    }

    const { value, getRadioProps, getRootProps } = useRadioGroup({
        defaultValue: 'Kevin',
        onChange: handleChange,
    })

    return (
        <Box>
            <Flex
                bg={useColorModeValue('#b9f5fd', 'gray.800')}
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
                        color={useColorModeValue('#1b5c5f', 'white')}>
                        Its My Todo
                    </Text>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <HStack>
                        <CustomRadio
                            key={"allTodos"}
                            divProps={{ backgroundColor: "#dcdcdc", borderRadius: "20px", height: "23px" }}
                            {...getRadioProps({ value: "A", isChecked: true })}
                        />
                        <CustomRadio
                            key={"doneTodos"}
                            divProps={{ backgroundColor: "#7ddebe", borderRadius: "20px", height: "23px" }}
                            {...getRadioProps({ value: "D" })}
                        />
                        <CustomRadio
                            key={"unDoneTodos"}
                            divProps={{ backgroundColor: "#67c6da", borderRadius: "20px", height: "23px" }}
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
                        onClick={onOpen}
                    >
                        Add ToDo
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
}

export default ToDoHeader;