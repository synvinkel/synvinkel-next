import dynamic from 'next/dynamic'

import Header from '../../../components/Header'
import withLayout from '../../../components/Layout'

const ProceduralShapes = dynamic(import('../../../components/code/designsystems/proceduralshapes'), {
    ssr: false,
})

const Page = () => (
    <div>
        <Header />
        <main>
            <ProceduralShapes />
        </main>
    </div>
)

export default withLayout(Page)