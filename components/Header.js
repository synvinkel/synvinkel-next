import Head from 'next/head'

const Header = ({title}) => {

    return (
        <Head>
            <title>Synvinkel{title ? ` - ${title}`:''}</title>
            <meta
                charset="utf-8" /><meta
                    name="viewport" content="width=device-width, initial-scale=1"></meta>
        </Head>
    )
}

export default Header