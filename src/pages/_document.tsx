import { Html, Head, Main, NextScript } from 'next/document'
import { ThemeProvider } from 'src/pages/components/themeprovider'
export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className='min-h-screen min-w-full'>
                <ThemeProvider>
                <Main />
                <NextScript />
                </ThemeProvider>
            </body>
        </Html>
    )
}