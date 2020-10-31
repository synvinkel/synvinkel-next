import dynamic from 'next/dynamic'

import Header from '../../components/Header'
import withLayout from '../../components/Layout'
import Md from '../../components/Md'

const GeoLines = dynamic(() => import('../../components/code/geolines'), {
    loading: () => <p>Loading...</p>,
    ssr: false
})

const Page = () => (
    <>

        <Header />

        {/* <main> */}
            <iframe src="https://tsdthingy.github.io/" />
        {/* </main> */}

        <style jsx>{`

    iframe {
        border: none;
        width: 100%;
        height: 70vh;
    }

    `}</style>
    </>
)

export default withLayout(Page, 'The Page')
