import React from 'react'

import withLayout from '../../components/Layout'

const Page = () => (
  <>


    <div className='hero'>
      <h1 className='title'>Page!</h1>
      <p className='description'>
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>


    </div>

    <style jsx>{`
 
    `}</style>
  </>
)

export default withLayout(Page, 'The Page')
