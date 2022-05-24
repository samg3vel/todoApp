import { ColorModeScript } from '@chakra-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'
import theme from '../lib/chakra/theme'

const Document = () => (
    <Html lang="en">
        <Head />
        <body>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Main />
            <NextScript />
        </body>
    </Html>
)

export default Document