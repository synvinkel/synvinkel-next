import dynamic from 'next/dynamic'

import Header from '../../components/Header'
import withLayout from '../../components/Layout'

// import GeoLines from '../../components/code/geolines'

const GeoLines = dynamic(() => import('../../components/code/geolines'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

const Page = () => (
  <>

    <Header />

    <main>
      <GeoLines />
      <article>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus maxime architecto rem dolorum, reiciendis exercitationem sunt nisi consequatur officiis accusamus, iure itaque et dicta eum quo distinctio eaque optio voluptate quis dignissimos vel porro voluptatibus. Explicabo aspernatur eius molestiae dignissimos aliquam soluta? Nihil dolorem amet beatae expedita distinctio molestias repellendus!
      </article>
    </main>

    <style jsx>{`
 
    `}</style>
  </>
)

export default withLayout(Page, 'The Page')
