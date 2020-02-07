import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <script async src="https://stats.synvinkel.org/tracker.js" data-ackee-server="https://stats.synvinkel.org" data-ackee-domain-id="690464db-91bf-4671-be24-1e2b090d67d8"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument
