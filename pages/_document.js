import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    {/* eslint-disable */}
                    <link href="https://fonts.cdnfonts.com/css/inter?styles=29139,29135,29137,29140,29128,29130" rel="stylesheet"></link>
                    <script src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/scripts/prism/prism.js`} data-manual></script>
                    {/* eslint-enable */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
