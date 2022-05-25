import { Box, chakra, useRadio } from "@chakra-ui/react"

export const CustomRadio = (props: any) => {
    const { divProps, ...radioProps } = props
    const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
        useRadio(radioProps)

    return (
        <chakra.label {...htmlProps} cursor='pointer'>
            <input {...getInputProps({})} hidden />
            <Box
                {...getCheckboxProps()}
                bg={state.isChecked ? '#b03434' : 'transparent'}
                w={8}
                p={1}
                rounded='full'
            >
                <div style={{ ...divProps }} rounded='full' {...getLabelProps()} />
            </Box>
        </chakra.label>
    )
}